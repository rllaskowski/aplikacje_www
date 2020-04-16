var jsonString = "{\n    \"piloci\": [\n        \"Pirx\",\n        \"Exupery\",\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotniska\": {\n        \"WAW\": [\"Warszawa\", [3690, 2800]],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
var dataStructure = JSON.parse(jsonString);
var sprawdzDaneLiniiLotniczej = function (dane) {
    if (!dane || typeof dane !== "object") {
        return false;
    }
    if (!Array.isArray(dane.piloci)) {
        return false;
    }
    for (var _i = 0, _a = dane.piloci; _i < _a.length; _i++) {
        var entry = _a[_i];
        if (typeof entry !== "string") {
            return false;
        }
    }
    console.log(typeof dane.lotniska);
    if (!dane.lotniska || Array.isArray(dane.lotniska)) {
        return false;
    }
    console.log(dane.lotniska);
    for (var _b = 0, _c = Object.keys(dane.lotniska); _b < _c.length; _b++) {
        var key = _c[_b];
        var value = dane.lotniska[key];
        if (!value || !Array.isArray(value) || value.length !== 2) {
            return false;
        }
        if (typeof value[0] !== "string" || !Array.isArray(value[1])) {
            return false;
        }
        for (var _d = 0, _e = value[1]; _d < _e.length; _d++) {
            var entry = _e[_d];
            if (typeof entry !== "number") {
                return false;
            }
        }
    }
    return true;
};
if (sprawdzDaneLiniiLotniczej(dataStructure)) {
    console.log("TAK!");
}
else {
    console.log(":(");
}
