import { dbClient } from './src/dbClient';
import * as bcrypt from "bcrypt";
import { Meme } from "./src/meme";


const memeList: Meme[] = [
    { name: 'Gold', score: 1000, url: 'https://i.redd.it/h7rplf9jt8y21.png'},
    {name: 'Platinum', score: 1100, url: 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'},
    {name:'Elite', score:1200, url:'https://i.imgflip.com/30zz5g.jpg'},
    {name: 'Samochód', score: 1300, url: '/memes/car.png'},
    {name: 'Mitoza', score: 1200, url: '/memes/cell.png'},
];

type User = {username: string, password: string};

const userList: User[] = [
    {
        username: "user",
        password: "pass"
    },
    {
        username: "user2",
        password: "pass"
    },
    
]

const CREATE_MEME_TABLE = `
    CREATE TABLE meme(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        score INTEGER NOT NULL,
        url VARCHAR NOT NULL
    );
`;

const CREATE_USER_TABLE = `
    CREATE TABLE user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR UNIQUE NOT NULL,
        tokens INTEGER NOT NULL,
        visited INTEGER,
        passw VARCHAR NOT NULL        
    );
`;

const CREATE_HISTORY_TABLE = `
    CREATE TABLE history (
        id INTEGER AUTO INCREMENT PRIMARY KEY,
        meme_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        score INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES USER(id),
        FOREIGN KEY (meme_id) REFERENCES MEME(id)
    );
`;

const insertUser = async (db: dbClient, user: User) => {
    const hash = await bcrypt.hash(user.password, 10);

    return db.run(`INSERT INTO user (username, passw, tokens) VALUES (?, ?, 0);`, [
        user.username, 
        hash
    ]);
}

const insertMeme = async (db: dbClient, meme: Meme) => {
    return db.run(`INSERT INTO meme (score, url, name) VALUES (?, ?, ?);`, [
        meme.score,
        meme.url,
        meme.name
    ]);
}



const initDB = async () => {
    const db = new dbClient('meme.db');    

    try {
        await db.run(CREATE_USER_TABLE, []);
        await db.run(CREATE_MEME_TABLE, []);
        await db.run(CREATE_HISTORY_TABLE, []);
        
        for (const user of userList) {
            await insertUser(db, user);
        }
        for (const meme of memeList) {
            await insertMeme(db, meme);
        }
    } catch (err) {
        console.log(err);
    }

    db.close();
}


initDB();