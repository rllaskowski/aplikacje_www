const fib = (n: number): number => {
    if (n <= 2) {
        return 1;
    }

    return fib(n-1)+fib(n-2);
}


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

const setEvents = () => {
    const submitButton = document.querySelector("button[type=submit]") as HTMLInputElement;
    const grid = document.querySelector(".main-container") as HTMLElement;
    const dateInput = document.querySelector("input[type=date]") as HTMLInputElement;
    const nameInput = document.querySelector("input[class=name]") as HTMLInputElement;
    const delayedList = document.querySelector(".delayed-flights-list") as HTMLElement;
    const reservationForm =  document.querySelector(".reservation-form") as HTMLElement;
    const body = document.querySelector("body") as HTMLElement;

    const backgroundColors = ["aliceblue", "red"];

    let gridClicked = 1;
    let click = 0;

    let goodName = false;
    let goodDate = false;

    submitButton.disabled = true;

    grid.onclick = (evt) => {
        console.log(fib(gridClicked*10));
        gridClicked += 1;

        const target = evt.target as HTMLElement;

        if (delayedList.contains(target) || reservationForm.contains(target)) {
            body.style.backgroundColor = backgroundColors[click%2];
            click += 1;
        }
    }

    dateInput.onchange = () => {
        const date = new Date(dateInput.value);

        if (date >= new Date()) {
            goodDate = true;
        }

        if (goodName && goodDate) {
            submitButton.disabled = false;
        }
    }

    nameInput.onchange = () => {
        if (nameInput.value.split(" ").length > 1) {
            goodName = true;
        }

        if (goodName && goodDate) {
            submitButton.disabled = false;
        }
    }
}

const showImage = () => {
    fetch("https://api.github.com/repos/Microsoft/TypeScript/commits")
        .then(response => response.json())
        .then(resJson => {
            const imgUrl = resJson[0].committer.avatar_url;

            const img = document.createElement("img");

            img.src = imgUrl;
            img.style.width = "50%";

            document.querySelector("main")?.appendChild(img);
        })
}

const main = () => {
    const flightLengthP = document.querySelector("p[class=flight-length]") as HTMLParagraphElement;
    const passengerList = document.querySelectorAll(".passengers-list li") as NodeListOf<HTMLElement>;
    const header = document.querySelector("header") as HTMLElement;
    const mainContainer = document.querySelector("main") as HTMLElement;
    const regulationsP = document.createElement("p") as HTMLParagraphElement;

    setEvents();
    showImage();
    changeColors(header);

    setTimeout(() => {
        console.log("Uplynely juz 2 sekundy!");
    }, 2000);

    const flightLengthText = (flightLength: number) => `Oczekiwana długosc czas lotu: ${flightLength}`;

    flightLengthP.innerText = flightLengthText(123);
    regulationsP.innerText = "Prosimy o zapoznanie sie z regulaminem strony przed dokonaniem rezerwacji lotu";

    mainContainer.appendChild(regulationsP);

    let maxLexId = "";

    passengerList.forEach(passenger => {
        const passengerId = passenger.getAttribute("data-passenger-id");
        if (passengerId && passengerId > maxLexId) {
            maxLexId = passengerId;
        }
    });

    console.log(maxLexId);
}

main();

export {
    fib
}