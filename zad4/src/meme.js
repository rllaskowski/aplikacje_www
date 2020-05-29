"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestMeme = exports.getMostExpensive = exports.getMeme = void 0;
class Meme {
    constructor(id, name, price, url) {
        this.id = id;
        this.name = name;
        this.priceHistory = [price];
        this.url = url;
    }
    changePrice(newPrice) {
        this.priceHistory = [newPrice, ...this.priceHistory];
    }
}
const memes = [
    new Meme(10, 'Gold', 1000, 'https://i.redd.it/h7rplf9jt8y21.png'),
    new Meme(9, 'Platinum', 1100, 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'),
    new Meme(8, 'Elite', 1200, 'https://i.imgflip.com/30zz5g.jpg'),
    new Meme(1, 'Samochód', 1300, '/memes/car.png'),
    new Meme(2, 'Mitoza', 1200, '/memes/cell.png'),
];
const getMostExpensive = () => {
    const sorted = [...memes];
    sorted.sort((a, b) => {
        return b.priceHistory[0] - a.priceHistory[0];
    });
    sorted.slice(0, 3);
    return sorted;
};
exports.getMostExpensive = getMostExpensive;
const getMeme = (memeId) => {
    return memes.find(meme => {
        return meme.id === memeId;
    });
};
exports.getMeme = getMeme;
const bestMeme = new Meme(123, "Dyskretna", 111111, "/memes/md.png");
const getBestMeme = () => {
    return bestMeme;
};
exports.getBestMeme = getBestMeme;
