import fs from "fs";

export const readFile = (): string[] => {
    return fs
        .readFileSync(
            `./input.txt`,
            "utf-8"
        )
        .trimEnd()
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
    console.time("Execution time")
    console.log("Part 1: ", part1());
    console.timeEnd("Execution time")
    console.time("Execution time")
    console.log("Part 2: ", part2());
    console.timeEnd("Execution time")
};