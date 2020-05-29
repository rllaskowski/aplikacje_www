"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meme_1 = require("./meme");
const express = require("express");
const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.get('/', (req, res) => {
    const mostExpensive = meme_1.getMostExpensive();
    res.render('index', {
        title: 'Memowy bazar',
        message: 'Oto nasze najdroższe memy',
        memes: mostExpensive,
        bestMeme: meme_1.getBestMeme()
    });
});
app.get('/meme/:memeId', (req, res) => {
    const meme = meme_1.getMeme(parseInt(req.params.memeId));
    if (!meme) {
        return res.status(404).send();
    }
    res.render('meme', { meme: meme });
});
app.post('/meme/:memeId', (req, res) => {
    const meme = meme_1.getMeme(parseInt(req.params.memeId));
    if (!meme) {
        return res.status(404).send();
    }
    const price = req.body.price;
    if (price) {
        meme.changePrice(price);
    }
    res.render('meme', { meme: meme });
});
app.listen(8000, () => console.log("Serwer działa na porcie 8000"));
