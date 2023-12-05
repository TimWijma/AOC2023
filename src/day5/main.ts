import { log } from "console";
import { readFile, printResult } from "../../helpers";

const input = readFile(5);

const seeds = input[0]
    .replace("seeds: ", "")
    .split(" ")
    .map((seed) => parseInt(seed));

const maps: number[][][] = [];

for (let i = 2; i < input.length; i++) {
    const row = input[i];

    let currentMap = maps.length;
    if (row.includes("map")) {
        maps.push([]);
    } else if (row.match(/\d/)) {
        maps[currentMap - 1].push(row.split(" ").map((n) => parseInt(n)));
    }
}

const part1 = () => {
    let lowest = Infinity;

    // loops go brr
    seeds.forEach((seed) => {
        let currentNum = seed;
        for (let map of maps) {
            for (let entry of map) {
                let destination = entry[0];
                let source = entry[1];
                let range = entry[2];
                if (currentNum >= source && currentNum < source + range) {
                    currentNum = currentNum - (source - destination);
                    break;
                }
            }
        }
        lowest = Math.min(lowest, currentNum);
    });

    return lowest;
};

const part2 = () => {
    let lowest = Infinity;

    let ranges: number[][] = [];

    for (let i = 0; i < seeds.length / 2; i++) {
        let seedIndex = seeds[i * 2];
        let seedRange = seeds[i * 2 + 1];

        ranges.push([seedIndex, seedIndex + seedRange]);
    }

    // Really really inefficient
    for (const range of ranges) {
        for (let i = range[0]; i < range[1]; i++) {
            let currentNum = i;
            for (let map of maps) {
                for (let entry of map) {
                    let destination = entry[0];
                    let source = entry[1];
                    let range = entry[2];
                    if (currentNum >= source && currentNum < source + range) {
                        currentNum = currentNum - (source - destination);
                        break;
                    }
                }
            }
            lowest = Math.min(lowest, currentNum);
        }
    }

    return lowest;
};

printResult(part1, part2);