import { readFile, printResult } from "../../helpers";

const input = readFile(4);

const part1 = () => {
    let sum = 0;

    for (let card of input) {
        let wins = numberOfWins(card);
        if (wins > 0) sum += Math.pow(2, wins - 1);
    }

    return sum;
};

const part2 = () => {
    let sum = 0;

    let result: number[] = [];
    let cards: number[] = [];

    for (let card of input) {
        let wins = numberOfWins(card);
        result.push(wins);
        cards.push(1);
    }

    result.forEach((wins, index) => {
        for (let i = 1; i <= wins; i++) {
            cards[index + i] += cards[index];
        }
    });

    cards.forEach((n) => (sum += n));

    return sum;
};

const numberOfWins = (card: string): number => {
    card = card.replace(/Card\s\d:\s/g, "");
    let split = card.split(" | ");
    let winning = split[0].split(" ").filter((n) => n !== "");
    let numbers = split[1].split(" ").filter((n) => n !== "");

    let wins = 0;
    for (let winningNumber of winning) {
        if (numbers.includes(winningNumber)) {
            wins++;
        }
    }
    return wins;
};

printResult(undefined, part2);
