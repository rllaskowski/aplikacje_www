let submitButton = document.querySelector("button[type=submit]") as HTMLInputElement;

let flightLengthP = document.querySelector("p[class=flight-length]") as HTMLParagraphElement;

const flightLengthText = (flightLength: number) => `Oczekiwana długosc czas lotu: ${flightLength}`;

flightLengthP.innerText = flightLengthText(123);

let regulationsP = document.createElement("p") as HTMLParagraphElement;

regulationsP.innerText = "Prosimy o zapoznanie sie z regulaminem strony przed dokonaniem rezerwacji lotu";

// Tworze paragraf nie na koncu body, tylko na koncu main, zeby nie zepsuc ukladu strony
document.querySelector("main").appendChild(regulationsP);

let passengerList = document.querySelectorAll(".passengers-list li");
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


const wait = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const changeColors = (element: HTMLElement) => {
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "aliceblue"];

    let waitProm = wait(1000);

    for (const color of colors) {
        waitProm = waitProm.then(() => {
            element.style.backgroundColor = color;
            return wait(1000);
        })
    }

}

let header = document.querySelector("header");

changeColors(header);

const showImage = () => {
    fetch("https://api.github.com/repos/Microsoft/TypeScript/commits")
        .then(response => response.json())
        .then(resJson => {
            const imgUrl = resJson[0].committer.avatar_url;

            let img = document.createElement("img");

            img.src = imgUrl;
            img.style.width = "50%";

            document.querySelector("main").appendChild(img);
        })
}

showImage();

let grid = document.querySelector(".main-container") as HTMLElement;

const colors = ["aliceblue", "white"];
let click = 0;

const delayedList = document.querySelector(".delayed-flights-list") as HTMLElement;
const reservationForm =  document.querySelector(".reservation-form") as HTMLElement;

let body = document.querySelector("body");


export const fib = (i: number) => {
    if (i <= 2) {
        return 1;
    } 

    return fib(i-1) + fib(i-2);
}

let i = 1;

grid.onclick = (evt) => {
    console.log(fib(i*10));
    i += 1;

    const target = evt.target as HTMLElement;

    if (delayedList.contains(target) || reservationForm.contains(target)) {
        body.style.backgroundColor = colors[click%2];
        click += 1;
    } 
}

submitButton.disabled = true;

let dateInput = document.querySelector("input[type=date]") as HTMLInputElement;
let nameInput = document.querySelector("input[class=name]") as HTMLInputElement;
let form = document.querySelector("form");

let goodName = false;
let goodDate = false;

dateInput.onchange = () => {
    let date = new Date(dateInput.value);
    
    if (date >= new Date()) {
        goodDate = true;
    }

    if (goodName && goodDate) {
        submitButton.disabled = false;
    }
}

nameInput.onchange = () => {
    console.log(nameInput.value.split(" ").length , "asdas");
    if (nameInput.value.split(" ").length > 1) {
        goodName = true;
    }

    if (goodName && goodDate) {
        submitButton.disabled = false;
    }
}

submitButton.onclick = () => {
   
}



