import { readFile, printResult } from "../../helpers";

const input = readFile(3);

const field: string[][] = [];
input.forEach((line) => {
    field.push(line.split(""));
});

const part1 = () => {
    let sum = 0;

    for (let y = 0; y < field.length; y++) {
        let digit = "";
        let isConnected = false;
        for (let x = 0; x < field[y].length; x++) {
            const cell = field[y][x];
            if (cell.charCodeAt(0) >= 48 && cell.charCodeAt(0) <= 57) {
                digit += cell;
                if (checkNeighbours(x, y).length > 0) {
                    isConnected = true;
                }
            } else {
                if (isConnected) {
                    sum += parseInt(digit) || 0;
                    isConnected = false;
                }
                digit = "";
            }
            if (x == field[y].length - 1 && isConnected) {
                // If digit is all the way on the right
                sum += parseInt(digit) || 0;
            }
        }
    }
    return sum;
};

const part2 = () => {
    let sum = 0;

    let gears: { [key: string]: number[] } = {};

    for (let y = 0; y < field.length; y++) {
        let digit = "";
        let neighbours: string[] = [];
        let isConnected = false;
        for (let x = 0; x < field[y].length; x++) {
            const cell = field[y][x];
            if (cell.charCodeAt(0) >= 48 && cell.charCodeAt(0) <= 57) {
                digit += cell;
                let newNeighbours = checkNeighbours(x, y, true);
                newNeighbours.forEach((neighbour) => {
                    if (!neighbours.includes(neighbour)) {
                        neighbours.push(neighbour);
                    }
                });
                if (neighbours.length > 0) {
                    isConnected = true;
                    neighbours.forEach((neighbour) => {
                        if (!(neighbour in gears)) {
                            gears[neighbour] = [];
                        }
                    });
                }
            } else {
                if (isConnected) {
                    neighbours.forEach((neighbour) => {
                        gears[neighbour] = [
                            ...gears[neighbour],
                            parseInt(digit),
                        ];
                    });
                    isConnected = false;
                    neighbours = [];
                }
                digit = "";
            }
            if (x == field[y].length - 1 && isConnected) {
                // If digit is all the way on the right
                neighbours.forEach((neighbour) => {
                    gears[neighbour] = [...gears[neighbour], parseInt(digit)];
                });
            }
        }
    }
    // Remove duplicates
    Object.keys(gears).forEach((key) => {
        let value = gears[key];

        if (value.length === 2) {
            sum += value[0] * value[1];
        }
    });

    return sum;
};

const checkNeighbours = (
    cellX: number,
    cellY: number,
    part2: boolean = false
): string[] => {
    let neighbours = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let neighbourX = cellX + j;
            let neighbourY = cellY + i;

            // If out of bounds of the same cell
            if (
                neighbourX < 0 ||
                neighbourY < 0 ||
                neighbourX >= field[cellY].length ||
                neighbourY >= field.length ||
                (i == 0 && j == 0)
            ) {
                continue;
            }

            let neighbour = field[neighbourY][neighbourX];

            // Continue if it is a digit or a "."
            if (part2) {
                if (neighbour === "*") {
                    neighbours.push(`${neighbourX}${neighbourY}`);
                } else {
                    continue;
                }
            } else {
                if (
                    (neighbour.charCodeAt(0) >= 48 &&
                        neighbour.charCodeAt(0) <= 57) ||
                    neighbour.charCodeAt(0) == 46
                ) {
                    continue;
                } else {
                    neighbours.push(`${neighbourX}${neighbourY}`);
                }
            }
        }
    }
    return neighbours;
};

printResult(part1, part2);
