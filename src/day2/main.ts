import { readFile, printResult } from "../../helpers";

const input = readFile(2);

const part1 = () => {
    let sum = 0;

    loop1: for (let i = 0; i < input.length; i++) {
        const game = input[i];
        let sets = game.replace(/Game [0-9]*: /g, "").split("; ");

        for (let set of sets) {
            let result: { [key: string]: number } = {
                red: 0,
                green: 0,
                blue: 0,
            };

            let colors = set.split(", ");
            for (let color of colors) {
                let split = color.split(" ");

                result[split[1]] = parseInt(split[0]);
            }

            if (result.red > 12 || result.green > 13 || result.blue > 14) {
                continue loop1;
            }
        }
        sum += i + 1;
    }

    return sum;
};

const part2 = () => {
    let sum = 0;

    loop1: for (let i = 0; i < input.length; i++) {
        const game = input[i];
        let sets = game.replace(/Game [0-9]*: /g, "").split("; ");

        let result: { [key: string]: number } = {
            red: 0,
            green: 0,
            blue: 0,
        };
        for (let set of sets) {

            let colors = set.split(", ");
            for (let color of colors) {
                let split = color.split(" ");

                let colorName = split[1]
                let amount = parseInt(split[0])
                if (amount > result[colorName]) {
                    result[colorName] = amount    
                }
            }
        }
        
        sum += result.red * result.green * result.blue
    }

    return sum;
};

printResult(part1, part2)