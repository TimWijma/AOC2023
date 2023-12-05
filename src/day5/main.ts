import { readFile, printResult } from "../../helpers";

class Entry {
    destination: number;
    source: number;
    range: number;

    constructor(destination: number, source: number, range: number) {
        this.destination = destination;
        this.source = source;
        this.range = range;
    }
}

const input = readFile();

const seeds = input[0]
    .replace("seeds: ", "")
    .split(" ")
    .map((seed) => parseInt(seed));

const maps: Entry[][] = [];

for (let i = 2; i < input.length; i++) {
    const row = input[i];

    let currentMap = maps.length;
    if (row.includes("map")) {
        maps.push([]);
    } else if (row.match(/\d/)) {
        let split = row.split(" ").map((n) => parseInt(n));
        maps[currentMap - 1].push(new Entry(split[0], split[1], split[2]));
    }
}

const part1 = () => {
    let lowest = Infinity;

    // loops go brr
    seeds.forEach((seed) => {
        let currentNum = seed;
        for (let map of maps) {
            for (let entry of map) {
                if (
                    currentNum >= entry.source &&
                    currentNum < entry.source + entry.range
                ) {
                    currentNum =
                        currentNum - (entry.source - entry.destination);
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
                    if (
                        currentNum >= entry.source &&
                        currentNum < entry.source + entry.range
                    ) {
                        currentNum =
                            currentNum - (entry.source - entry.destination);
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