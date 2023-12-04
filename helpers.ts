import fs from "fs";

export const readFile = (day: number): string[] => {
    return fs
        .readFileSync(
            `/home/main/Documents/Programming/AOC2023/src/day${day}/input.txt`,
            "utf-8"
        )
        .split("\n");
};

export const printResult = (
    part1: Function = () => {
        return "Not implemented";
    },
    part2: Function = () => {
        return "Not implemented";
    }
) => {
    console.log("Part 1: ", part1());
    console.log("Part 2: ", part2());
};
