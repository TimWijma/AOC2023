import fs from 'fs';

export const readFile = (day: number): string[] => {
    return fs.readFileSync(`/home/main/Documents/Programming/AOC2023/src/day${day}/input.txt`, 'utf-8').split('\n');
}