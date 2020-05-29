import{ getMeme, getMostExpensive, getBestMeme } from "./meme";
const express = require("express");

const app = express();

app.set('view engine', 'pug');
app.use(express.urlencoded({
    extended: true
})); 
app.use(express.static('public'));

app.get('/', (req, res) => {
    const mostExpensive = getMostExpensive();
    res.render('index', { 
        title: 'Memowy bazar', 
        message: 'Oto nasze najdroższe memy', 
        memes: mostExpensive,
        bestMeme: getBestMeme()
    });
});


app.get('/meme/:memeId', (req, res) => {
    const meme = getMeme(parseInt(req.params.memeId));

    if (!meme) {
        return res.status(404).send();
    }
   
    res.render('meme', { meme: meme })
 });

 app.post('/meme/:memeId', (req, res) => {
    const meme = getMeme(parseInt(req.params.memeId));

    if (!meme) {
        return res.status(404).send();
    }
    const price = req.body.price;
    
    if (price) {
        meme.changePrice(price);
    }
    
    res.render('meme', { meme: meme })
 });

app.listen(8000, () => console.log("Serwer działa na porcie 8000"));