import { dbClient } from "./dbClient";

const db = new dbClient("meme.db");

interface Meme {
    id?: number;
    score: number;
    name: string;
    url: string;
}


const getMostExpensive = () => {
    return db.all("SELECT * FROM meme order by score desc", []);
}


const getMeme = async (memeId: number): Promise<Meme> => {
    return db.all("SELECT * FROM meme WHERE id=?", [memeId])
    .then(data => data[0] as Meme);
};


const getMemeHistory = (memeId: number) => {
    return db.all("SELECT score FROM history WHERE meme_id=? ORDER BY id desc;", [memeId])
    .then(data => data as {score: number}[])
};

const changePrice = async (meme: Meme, newPrice: number, userId: number) => {
    await db.run("INSERT INTO history (user_id, meme_id, score) VALUES(?, ?, ?);", [
        userId,
        meme.id,
        meme.score
    ]);

    await db.run("UPDATE meme SET score=? WHERE id=?;", [
        newPrice,
        meme.id
    ]);
}

export {
    Meme,
    getMeme,
    getMostExpensive,
    changePrice,
    getMemeHistory
}