import { readFile, printResult } from "../../helpers";

class Galaxy {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const input = readFile();

let galaxies: Map<number, Galaxy> = new Map();
let expandX: number[] = [];
let expandY: number[] = [];

for (let y = 0; y < input.length; y++) {
    if (input[y].split("").every((n) => n === ".")) {
        expandY.push(y);
    }
}

for (let x = 0; x < input[0].length; x++) {
    let allEmpty = true;
    for (let y = 0; y < input.length; y++) {
        if (input[y][x] === "#") {
            galaxies.set(galaxies.size + 1, new Galaxy(x, y));
            allEmpty = false;
        }
    }

    if (allEmpty) expandX.push(x);
}

const part1 = () => {
    let sum = 0;
    for (let i = 1; i < galaxies.size + 1; i++) {
        for (let j = i + 1; j < galaxies.size + 1; j++) {
            sum += calculateDistance(i, j, 2);
        }
    }

    return sum;
};

const part2 = () => {
    let sum = 0;
    for (let i = 1; i < galaxies.size + 1; i++) {
        for (let j = i + 1; j < galaxies.size + 1; j++) {
            sum += calculateDistance(i, j, 1000000);
        }
    }

    return sum;
};

const calculateDistance = (one: number, two: number, expansionRate: number) => {
    let gOne = galaxies.get(one);
    let gTwo = galaxies.get(two);

    let expansions = 0;

    for (const num of expandX) {
        if (num >= Math.min(gOne!.x, gTwo!.x) && num <= Math.max(gOne!.x, gTwo!.x))
            expansions += expansionRate - 1;
    }
    for (const num of expandY) {
        if (num >= Math.min(gOne!.y, gTwo!.y) && num <= Math.max(gOne!.y, gTwo!.y))
            expansions += expansionRate - 1;
    }

    return Math.abs(gOne!.x - gTwo!.x) + Math.abs(gOne!.y - gTwo!.y) + expansions;
};

printResult(part1, part2);
