import { readFile, printResult } from "../../helpers";

const input = readFile();

const part1 = () => {
    const times = input[0].replace(/Time:\s*/, "").replaceAll(/\s+/g, " ").split(" ").map((n) => parseInt(n))
    const distances = input[1].replace(/Distance:\s*/, "").replaceAll(/\s+/g, " ").split(" ").map((n) => parseInt(n))    

    let results: number[] = []
    for(let i = 0; i < times.length; i++) {
        results.push(calculateWins(times[i], distances[i]))
    }

    return results.reduce((a, b) => a * b, 1);
}

const part2 = () => {
    const time = parseInt(input[0].replace(/Time:\s*/, "").replaceAll(/\s+/g, ""))
    const distance = parseInt(input[1].replace(/Distance:\s*/, "").replaceAll(/\s+/g, ""))
    
    return calculateWins(time, distance)
}

const calculateWins = (time: number, distance: number): number => {
    let wins = 0;
    for (let j = 0; j <= time; j++) {
        let result = (time - j) * j;
        
        if (result > distance) {
            wins++;
        }
    }
    
    return wins;
}

printResult(part1, part2)