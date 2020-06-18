require("dotenv").config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

import { dbClient } from './src/db/dbClient';

import IQuestion from './src/app/models/IQuestion';
import ISolution from './src/app/models/ISolution';
import IQuiz from './src/app/models/IQuiz';

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

const secret = process.env.TOKEN_SECRET;
const db = new dbClient('quiz.db');

const auth = () => {
    return (req, res, next) => {
        const token = req.body.token;

        if (token) {
            try {
                const user = jwt.verify(token, secret);
                req.user = user;

                const options = {
                    maxAge: 1000*60*15,
                    httpOnly: false,
                    signed: false
                }
    
                const newToken = jwt.sign({id: user.id}, secret, { 
                    expiresIn: 60*15
                });
    
                res.cookie('user_session', newToken, options);
            } catch (err) {
                console.log(err);
            }
        }
        next();
    }
}

app.use("/api", auth());

app.post("/api/quiz/", async (req, res) => {
    if (!req.user && !process.env.DEBUG) {
        return res.status(401).send();
    }
   
    const quizId = req.body.id as number;
    if (!quizId) {
        return res.status(404).send();
    }
    
    let quiz: IQuiz = null;
    const now = new Date();

    try {
        const data = await db.all("SELECT id, content FROM question WHERE quiz_id=?;", [
            quizId
        ]);
        const questionList = data as IQuestion[]; 

        if (questionList.length > 0) {
            quiz = {
                id: quizId,
                questionList: questionList
            }            
        } else {
            return res.status(404).send();
        }  
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }

    db.run("INSERT OR REPLACE INTO result(user_id, quiz_id, start_time) VALUES(?, ?, ?)", [
        req.user.id,
        quizId,
        now
    ]).then(() => {
        res.send(quiz);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    });
   
});

app.post("/api/quiz-all", (req, res) => {
    if (!req.user && !process.env.DEBUG) {
        return res.status(401).send();
    }

    const quizId = req.body.id as number;
    if (!quizId) {
        return res.status(404).send();
    }

    db.all("SELECT id, content, penalty, answer FROM question WHERE quiz_id=?;", [
        quizId
    ]).then(data => {
        const questionList = data as IQuestion[]; 

        if (questionList.length > 0) {
            res.send({
                id: req.body.id,
                questionList: questionList
            });
        } else {
            res.status(404).send();
        }
    })
    .catch(err => {
        console.log(err);

        res.status(500).send();
    });
});


app.post("/api/quiz-list", (req, res) => {
    if (!req.user && !process.env.DEBUG) {
        return res.status(401).send();
    }

    db.all("SELECT id, name, question_num AS questionNum FROM quiz;", [])
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);

            res.status(500).send();
        });
});

app.post("/api/login", (req, res) => {
    if (req.user) {
        return res.status(200).send();
    }

    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        return res.status(401);
    }

    db.all("SELECT id, username, passw FROM user WHERE username=?;", [username])
        .then(data => {
            const user: {id, username, passw} = data[0];

            if (user && user.passw === password) {
                const options = {
                    maxAge: 1000*60*15,
                    httpOnly: false,
                    signed: false
                }

                const token = jwt.sign({ id: user.id }, secret, { 
                    expiresIn: 60*15
                });

                return res.cookie('user_session', token, options).send();
            } else {
                res.status(401).send();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send();
        })

});


app.post("/api/password-change", (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const password = req.body.password;

    if (!password) {
        return res.status(401).send();
    }

    db.run("UPDATE user SET passw=? WHERE id=?;", [password, req.user.id])
        .then(() => {
            res.status(200).send();
        });
});

app.post("/api/send-solution", async (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }

    if (!req.body.solution) {
        return res.status(404).send();
    }

    const solution = JSON.parse(req.body.solution) as ISolution;
    if (!solution.quizId || !solution.answers) {
        return res.status(404).send();
    }
    
    let startTime;
    const now = new Date().getTime();

    try {
        const data = await db.all("SELECT start_time FROM result WHERE quiz_id=? AND user_id=?" , [
            solution.quizId,
            req.user.id
        ]);

        if (!data[0]) {
            return res.status(404).send();
        }
        
        startTime = data[0].start_time;
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }

    let questionList: IQuestion[];

    try {
        const data = await db.all("SELECT id, answer, penalty FROM question WHERE quiz_id=?" , [
            solution.quizId,
        ]);
        questionList = data as IQuestion[];
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }

    const duration = Math.floor((now-startTime)/1000);
    const answers = {};
    const questionDict:{[id: number]: IQuestion} = {};
    let score = duration;

    questionList.forEach(question => {
        questionDict[question.id] = question;
    })

    Object.keys(solution.answers).forEach(key => {
        answers[key] = solution.answers[key].content;
        if (answers[key] !== questionDict[key].content) {
            score += questionDict[key].penalty;
        }
    });

    db.run("UPDATE result SET score=?, answers_json=? WHERE quiz_id=? AND user_id=?;", [
        score,
        JSON.stringify(answers),
        solution.quizId,
        req.user.id
    ]).then(() => {
        res.status(200).send();
    });

    res.status(200).send();
});

app.post("/api/best-scores", (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const quizId = req.body.quizId;
    if (!quizId) {
        return res.status.send(404);
    }

    db.all("SELECT score FROM result WHERE quiz_id=?", [
        quizId
    ]).then(data => {
        res.send(data);
    });
});

app.post("/api/get-result", (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const quizId = req.body.quizId;
    if (!quizId) {
        return res.status(404).send();
    }

    db.all("SELECT score, answers_json, start_time FROM result WHERE user_id=? AND quiz_id=?", [
        req.user.id,
        quizId
    ]).then(data => {
        const result = data[0];
       
        if (!result) {
            return res.status(404).send();
        }

        const answersJson = result.answers_json;
        const answers = answersJson? JSON.parse(answersJson) : null;  
       
        res.send({
            answers: answers,
            score: result.score,
        });
    });
});


app.listen(process.env.PORT || 3000, () => console.log(`Aplikacja działa na porcie ${process.env.PORT}`));
