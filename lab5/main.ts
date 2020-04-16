let jsonString: string = `{
    "piloci": [
        "Pirx",
        "Exupery",
        "Idzikowski",
        "Główczewski"
    ],
    "lotniska": {
        "WAW": ["Warszawa", [3690, 2800]],
        "NRT": ["Narita", [4000, 2500]],
        "BQH": ["Biggin Hill", [1802, 792]],
        "LBG": ["Paris-Le Bourget", [2665, 3000, 1845]]
    }
}`;

interface IPilot {
    nazwisko: string;
}

interface ILotnisko {
    miasto: string;
    liczby: number[]
}

interface ILiniaLotnicza {
    piloci: string[];
    lotniska: {[id: string]: [string, number[]]};
}

let dataStructure: ILiniaLotnicza = JSON.parse(jsonString);


const sprawdzDaneLiniiLotniczej = (dane: any): dane is ILiniaLotnicza => {
    if (!dane || typeof dane !== "object") {
        return false;
    }

    if (!Array.isArray(dane.piloci)) {
        return false;
    }

    for (const entry of dane.piloci) {
        if (typeof entry !== "string") {
            return false;
        }
    }

    if (!dane.lotniska || Array.isArray(dane.lotniska)) {
        return false;
    }

    for (const key of Object.keys(dane.lotniska)) {
        const value = dane.lotniska[key];

        if (!value || !Array.isArray(value) || value.length !== 2) {
            return false;
        }

        if (typeof value[0] !== "string" || !Array.isArray(value[1])) {
            return false;
        }

        for (const entry of value[1]) {
            if (typeof entry !== "number") {
                return false;
            }
        }
    }

    return true;
}


if (sprawdzDaneLiniiLotniczej(dataStructure)) {
    console.log("TAK!");
} else {
    console.log(":(");
}