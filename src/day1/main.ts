import { readFile, printResult } from "../../helpers";

const input = readFile();

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

    let digits: string[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

    input.forEach((entry) => {
        digits.forEach((digit) => {
            entry = entry.replaceAll(digit, digit + digit[digit.length - 1])
        })

        const result = entry.match(
            /[0-9]|one|two|three|four|five|six|seven|eight|nine/g
        );
        if (result) {
            let first = result[0];
            let last = result[result.length - 1];

            if (digits.includes(first)) {
                first = (digits.indexOf(first)).toString();
            }
            if (digits.includes(last)) {
                last = (digits.indexOf(last)).toString();
            }

            sum += parseInt(`${first}${last}`);
        }
    });
    return sum;
};

printResult(part1, part2);