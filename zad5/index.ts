import{ getMeme, getMemeHistory, getMostExpensive, changePrice} from "./src/meme";
const express = require("express");
require("dotenv").config();

const csrf = require("csurf");
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

import { dbClient } from "./src/dbClient";

const db = new dbClient("meme.db");

const app = express();

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'pug');
app.use(express.urlencoded({
    extended: true
})); 
app.use(express.static('public'));
app.use(csrf({ cookie: true }));


const secret = process.env.TOKEN_SECRET;

const auth = () => {
    return async (req, res, next) => {
        const token = req.cookies.user_session;

        if (token) {
            try {
                const user = jwt.verify(token, secret);
               
                const userData = await db.all("SELECT * FROM user WHERE id=?;", [
                    user.id
                ]);
        
                if (!userData[0]) {
                    return next();
                }

                if (userData[0].passw !== user.password || user.tokens != userData[0].tokens) {
                    return next();
                }

                req.user = user;
                req.visited = userData[0].visited;

            } catch (err) {
                console.log(err);
            }
        }
        next();
    }
}

app.use("/", auth());

app.get("/logout", async (req, res) => {
    if (req.user) {
        await db.run("UPDATE user SET tokens=tokens+1 WHERE id=?;", [req.user.id]);
    }

    res.redirect("/");
});

app.post("/login", async (req, res) => {
    if (req.user) {
        return res.redirect("/");
    }

    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        return res.redirect("/login");
    }

    try {
        const data = await db.all("SELECT id, username, passw, tokens FROM user WHERE username=?;", [
            username
        ]);
        const user: {id, username, passw} = data[0];
            
        if (user) {
            const goodPassw = await bcrypt.compare(password, user.passw);

            if (!goodPassw) {
                return res.redirect("/login");
            }

            const options = {
                maxAge: 1000*60*15,
                httpOnly: false,
                signed: false
            }

            const token = jwt.sign({ id: user.id, password: user.passw, tokens: data[0].tokens }, secret, { 
                expiresIn: 60*15
            });

            await db.run("UPDATE user SET visited=1 WHERE id=?;", [user.id]);

            return res.cookie('user_session', token, options).redirect("/");
        } else {
            return res.redirect("/login");
        }
    } catch (err) {
        console.log(err);

        return res.redirect("/login");
    } 
});

app.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect("/");
    }

    res.render('login', { 
        csrfToken: req.csrfToken()
    });
});


app.get('/', async (req, res) => {
    const mostExpensive = await getMostExpensive();
    if (req.user) {
        await db.run("UPDATE user SET visited=visited+1 WHERE id=?;", [req.user.id]);
    }

    res.render('index', { 
        title: 'Memowy bazar', 
        message: 'Oto nasze najdroższe memy', 
        memes: mostExpensive,
        logined: req.user? true : false,
        visited: req.user? req.visited : null
    });
});


app.get('/meme/:memeId', async (req, res) => {
    if (req.user) {
        await db.run("UPDATE user SET visited=visited+1 WHERE id=?;", [req.user.id]);
    }

    const meme = await getMeme(parseInt(req.params.memeId));
    const history = await getMemeHistory(parseInt(req.params.memeId));

    const scoreHistory = [meme.score, ...history.map(score => score.score)];

    if (!meme) {
        return res.status(404).send();
    }
   
    res.render('meme', { 
        meme: meme,
        logined: req.user? true : false,
        visited: req.user? req.visited : null,
        history: scoreHistory,
        csrfToken: req.csrfToken()
    })
 });

 app.post('/meme/:memeId', async (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const memeId = parseInt(req.params.memeId);
    const meme = await getMeme(memeId);
   
    if (!meme) {
        return res.status(404).send();
    }
    const price = req.body.price;
    
    if (price) {
        await changePrice(meme, price, req.user.id);
    }
    
    res.redirect(`/meme/${req.params.memeId}`)
 });

 

 const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Serwer działa na porcie ${port}`));