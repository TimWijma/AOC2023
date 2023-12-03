import { readFile } from "../../helpers";

const input = readFile(2);

const part1 = () => {
    let sum = 0;

    loop1: for (let i = 0; i < input.length; i++) {
        const game = input[i];
        let sets = game.replace(/Game [0-9]*: /g, "").split("; ");
        console.log("-------------");

        for (let set of sets) {
            let result: { [key: string]: number } = {
                green: 0,
                red: 0,
                blue: 0,
            };

            let colors = set.split(", ");
            for (let color of colors) {
                let split = color.split(" ");

                result[split[1]] += parseInt(split[0]);
            }

            if (result.red > 12 || result.green > 13 || result.blue > 14) {
                continue loop1;
            }
        }
        sum += i + 1;
    }

    console.log("Part 1:", sum);
};

const part2 = () => {
    let sum = 0;

    loop1: for (let i = 0; i < input.length; i++) {
        const game = input[i];
        let sets = game.replace(/Game [0-9]*: /g, "").split("; ");
        console.log("-------------");

        for (let set of sets) {
            let result: { [key: string]: number } = {
                green: 0,
                red: 0,
                blue: 0,
            };

            let colors = set.split(", ");
            for (let color of colors) {
                let split = color.split(" ");

                result[split[1]] += parseInt(split[0]);
            }

            if (result.red > 12 || result.green > 13 || result.blue > 14) {
                continue loop1;
            }
        }
        sum += i + 1;
    }

    console.log("Part 2:", sum);
};