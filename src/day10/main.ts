import { readFile, printResult } from "../../helpers";

const input = readFile();

const grid: string[][] = [];

for (const row of input) {
    grid.push(row.split(""));
}

class AllowedTile {
    name: string;
    allowed: { [key: string]: string[] } = {
        up: [],
        right: [],
        down: [],
        left: [],
    };

    constructor(
        name: string,
        up: string[],
        right: string[],
        down: string[],
        left: string[]
    ) {
        this.name = name;
        this.allowed = {
            up: up,
            right: right,
            down: down,
            left: left,
        };
    }
}

class Tile {
    x: number;
    y: number;
    value: string;

    constructor(x: number, y: number, value: string) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
}

const tiles: Map<string, AllowedTile> = new Map();
tiles.set(
    "|",
    new AllowedTile("|", ["|", "7", "F", "S"], [], ["|", "L", "J", "S"], [])
);
tiles.set(
    "-",
    new AllowedTile("-", [], ["-", "J", "7", "S"], [], ["-", "F", "L", "S"])
);
tiles.set(
    "L",
    new AllowedTile("L", ["|", "7", "F", "S"], ["-", "7", "J", "S"], [], [])
);
tiles.set(
    "J",
    new AllowedTile("J", ["|", "7", "F", "S"], [], [], ["-", "F", "L", "S"])
);
tiles.set(
    "7",
    new AllowedTile("7", [], [], ["|", "L", "J", "S"], ["-", "F", "L", "S"])
);
tiles.set(
    "F",
    new AllowedTile("F", [], ["-", "J", "7", "S"], ["|", "L", "J", "S"], [])
);
tiles.set(
    "S",
    new AllowedTile(
        "S",
        ["|", "7", "F"],
        ["-", "7", "J"],
        ["|", "L", "J"],
        ["-", "F", "L"]
    )
);

let path: Map<string, Tile> = new Map();

const part1 = () => {
    let startingTile: Tile = new Tile(-1, -1, "S");
    yLoop: for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "S") {
                startingTile = new Tile(x, y, "S");
                break yLoop;
            }
        }
    }

    let currentTile = startingTile;
    let previousTile = null;
    while (currentTile.x !== startingTile.x || currentTile.y !== startingTile.y || previousTile == null) {
        path.set(`${currentTile.x},${currentTile.y}`, currentTile);

        let newTile = calculateNextTile(currentTile, previousTile ?? currentTile);
        previousTile = currentTile;
        currentTile = newTile;
    }

    path.set(`${startingTile.x},${startingTile.y}`, new Tile(startingTile.x, startingTile.y, "J"));

    return path.size / 2;
};

const part2 = () => {
    let count = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (path.has(`${x},${y}`)) continue

            let countSides = 0;
            let tempX = x;
            while (tempX >= 0) {
                let result = calculateInLoop(tempX, y)
                countSides += result.inLoop === true ? 1: 0;
                tempX = result.newX;
            }

            if (countSides % 2 === 1) {
                count += 1;
            }
        }
    }

    return count;
};

const calculateInLoop = (x: number, y: number): {inLoop: boolean, newX: number} => {
    if (!path.has(`${x},${y}`)) return {inLoop: false, newX: x - 1};

    let pathValue = path.get(`${x},${y}`)!.value 
    if (pathValue === "|") {
        return {inLoop: true, newX: x - 1}
    } else {
        let tempX = x;
        if (pathValue === "J") {
            while (tempX >= 0) {
                tempX -= 1
                if (path.has(`${tempX},${y}`)) {
                    if (path.get(`${tempX},${y}`)!.value === "-") continue
                    else if (path.get(`${tempX},${y}`)!.value === "F") return {inLoop: true, newX: tempX - 1}
                    else return {inLoop: false, newX: tempX - 1}
                } else {
                    return {inLoop: false, newX: x - 1}
                }
            }
        } else if (pathValue === "7") {
            while (tempX >= 0) {
                tempX -= 1
                if (path.has(`${tempX},${y}`)) {
                    if (path.get(`${tempX},${y}`)!.value === "-") continue
                    else if (path.get(`${tempX},${y}`)!.value === "L") return {inLoop: true, newX: tempX - 1}
                    else return {inLoop: false, newX: tempX - 1}
                } else {
                    return {inLoop: false, newX: x - 1}
                }
            }
        }
        return {inLoop: false, newX: x - 1};
    }
};

const calculateNextTile = (currentTile: Tile, previousTile: Tile): Tile => {
    let x = currentTile.x;
    let y = currentTile.y;
    if (y > 0 && previousTile.y !== y - 1) {
        if (calculateValid(currentTile, "up", grid[y - 1][x])) {
            return new Tile(x, y - 1, grid[y - 1][x]);
        }
    }
    if (x < grid[0].length - 1 && previousTile.x !== x + 1) {
        if (calculateValid(currentTile, "right", grid[y][x + 1])) {
            return new Tile(x + 1, y, grid[y][x + 1]);
        }
    }
    if (y < grid.length - 1 && previousTile.y !== y + 1) {
        if (calculateValid(currentTile, "down", grid[y + 1][x])) {
            return new Tile(x, y + 1, grid[y + 1][x]);
        }
    }
    if (x > 0 && previousTile.x !== x - 1) {
        if (calculateValid(currentTile, "left", grid[y][x - 1])) {
            return new Tile(x - 1, y, grid[y][x - 1]);
        }
    }

    return currentTile;
};

const calculateValid = (
    currentTile: Tile,
    direction: string,
    nextTile: string
): boolean => {
    return (
        tiles.get(currentTile.value)?.allowed[direction].includes(nextTile) ||
        false
    );
};

printResult(part1, part2);