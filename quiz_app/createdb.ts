import { dbClient } from './src/db/dbClient';
import { quizList } from './src/constants/sampleData';
import IQuiz from './src/app/models/IQuiz';

const CREATE_QUIZ_TABLE = `
    CREATE TABLE quiz(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        question_num INT NOT NULL
    );
`;

const CREATE_USER_TABLE = `
    CREATE TABLE user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR UNIQUE NOT NULL,
        passw VARCHAR NOT NULL        
    );
`;

const CREATE_QUESTION_TABLE = `
    CREATE TABLE question(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER NOT NULL,
        content VARCHAR NOT NULL,
        answer INT NOT NULL,
        penalty INT NOT NULL,
        FOREIGN KEY(quiz_id) REFERENCES quiz(id)       
    );
`;

const CREATE_RESULT_TABLE = `
    CREATE TABLE result(
        user_id INTEGER NOT NULL,
        quiz_id INTEGER NOT NULL,
        score INT,
        start_time DATE NOT NULL,
        answers_json VARCHAR,
        FOREIGN KEY(quiz_id) REFERENCES quiz(id),
        FOREIGN KEY(user_id) REFERENCES user(id),
        UNIQUE(quiz_id, user_id)
    );
`;

const insertUser = (db: dbClient, username: string, password: string) => {
    return db.run(`INSERT INTO user (username, passw) VALUES (?, ?);`, [username, password]);
}

const insertQuiz = async (db: dbClient, quiz: IQuiz) => {
    await db.run(`INSERT INTO quiz (id, name, description, question_num) VALUES (?, ?, ?, ?);`, [
        quiz.id,
        quiz.name,
        quiz.description,
        quiz.questionList.length
    ]);

    quiz.questionList.forEach(question => {
        db.run(`INSERT INTO question (quiz_id, content, answer, penalty) VALUES (?, ?, ?, ?);`, [
            quiz.id,
            question.content,
            question.answer,
            question.penalty
        ])
    })
}

const initDB = async () => {
    const db = new dbClient('quiz.db');    

    try {
        await db.run(CREATE_QUIZ_TABLE, []);
        await db.run(CREATE_USER_TABLE, []);
        await db.run(CREATE_QUESTION_TABLE, []);
        await db.run(CREATE_RESULT_TABLE, []);
        
        await insertUser(db, "user1", "user1");
        await insertUser(db, "user2", "user2");

        quizList.forEach((quiz) => {
            insertQuiz(db, quiz);
        })
        
    } catch (err) {
        console.log(err);
    }

    db.close();
}


initDB();
