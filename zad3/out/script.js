"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submitButton = document.querySelector("button[type=submit]");
const flightLengthP = document.querySelector("p[class=flight-length]");
const flightLengthText = (flightLength) => `Oczekiwana długosc czas lotu: ${flightLength}`;
flightLengthP.innerText = flightLengthText(123);
const regulationsP = document.createElement("p");
regulationsP.innerText = "Prosimy o zapoznanie sie z regulaminem strony przed dokonaniem rezerwacji lotu";
// Tworze paragraf nie na koncu body, tylko na koncu main, zeby nie zepsuc ukladu strony
document.querySelector("main").appendChild(regulationsP);
const passengerList = document.querySelectorAll(".passengers-list li");
let maxLexId = "";
passengerList.forEach(passenger => {
    const passengerId = passenger.getAttribute("data-passenger-id");
    if (passengerId > maxLexId) {
        maxLexId = passengerId;
    }
});
console.log(maxLexId);
setTimeout(() => {
    console.log("Uplynely juz 2 sekundy!");
}, 2000);
const wait = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};
const changeColors = (element) => {
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "aliceblue"];
    let waitProm = wait(1000);
    for (const color of colors) {
        waitProm = waitProm.then(() => {
            element.style.backgroundColor = color;
            return wait(1000);
        });
    }
};
const header = document.querySelector("header");
changeColors(header);
const showImage = () => {
    fetch("https://api.github.com/repos/Microsoft/TypeScript/commits")
        .then(response => response.json())
        .then(resJson => {
        const imgUrl = resJson[0].committer.avatar_url;
        const img = document.createElement("img");
        img.src = imgUrl;
        img.style.width = "50%";
        document.querySelector("main").appendChild(img);
    });
};
showImage();
const grid = document.querySelector(".main-container");
let click = 0;
const delayedList = document.querySelector(".delayed-flights-list");
const reservationForm = document.querySelector(".reservation-form");
const body = document.querySelector("body");
exports.fib = (n) => {
    if (n <= 2) {
        return 1;
    }
    return exports.fib(n - 1) + exports.fib(n - 2);
};
let gridClicked = 1;
const backgroundColors = ["aliceblue", "red"];
grid.onclick = (evt) => {
    console.log(exports.fib(gridClicked * 10));
    gridClicked += 1;
    const target = evt.target;
    if (delayedList.contains(target) || reservationForm.contains(target)) {
        body.style.backgroundColor = backgroundColors[click % 2];
        click += 1;
    }
};
submitButton.disabled = true;
const dateInput = document.querySelector("input[type=date]");
const nameInput = document.querySelector("input[class=name]");
const form = document.querySelector("form");
let goodName = false;
let goodDate = false;
dateInput.onchange = () => {
    const date = new Date(dateInput.value);
    if (date >= new Date()) {
        goodDate = true;
    }
    if (goodName && goodDate) {
        submitButton.disabled = false;
    }
};
nameInput.onchange = () => {
    if (nameInput.value.split(" ").length > 1) {
        goodName = true;
    }
    if (goodName && goodDate) {
        submitButton.disabled = false;
    }
};
//# sourceMappingURL=script.js.map