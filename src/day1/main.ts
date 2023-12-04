import { readFile, printResult } from "../../helpers";

const input = readFile(1);

const part1 = () => {
    let sum = 0;
    input.forEach((entry) => {
        const result = entry.match(/[0-9]/g);
        if (result) {
            sum += parseInt(`${result[0]}${result[result.length - 1]}`);
        }
    });

    return sum;
};

const part2 = () => {
    let sum = 0;

    let digits: { [key: string]: string } = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };

    input.forEach((entry) => {
        Object.keys(digits).forEach((key) => {
            entry = entry.replaceAll(key, key + key[key.length - 1]);
        });

        const result = entry.match(
            /[0-9]|zero|one|two|three|four|five|six|seven|eight|nine/g
        );
        if (result) {
            let first = result[0];
            let last = result[result.length - 1];

            if (Object.keys(digits).includes(first)) {
                first = digits[first];
            }
            if (Object.keys(digits).includes(last)) {
                last = digits[last];
            }

            sum += parseInt(`${first}${last}`);
        }
    });
    return sum;
};

printResult(part1, part2);