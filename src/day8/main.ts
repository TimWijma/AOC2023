import { readFile, printResult } from "../../helpers";

const input = readFile();

const directions = input[0].split("");
const nodes = new Map<string, string[]>();

for (let i = 2; i < input.length; i++) {
    let node = input[i].substring(0, 3);
    let left = input[i].substring(7, 10);
    let right = input[i].substring(12, 15);

    nodes.set(node, [left, right]);
}

const part1 = () => {
    let currentNode = nodes.get("AAA");

    let steps = 0;
    let directionIndex = 0;
    while (true) {
        if (currentNode == undefined) break;

        steps++;

        let direction = directions[directionIndex] === "L" ? 0 : 1;

        if (currentNode[direction] === "ZZZ") break;

        currentNode = nodes.get(currentNode[direction]);

        directionIndex = (directionIndex + 1) % directions.length;
    }

    return steps;
};

const part2 = () => {
    let Anodes: (string[] | undefined)[] = [];
    for (const [key, value] of nodes) {
        if (key.charAt(2) === "A") {
            Anodes.push(value);
        }
    }
    let steps: number[] = Array(Anodes.length).fill(0);

    for (let i = 0; i < Anodes.length; i++) {
        let node = Anodes[i];
        let directionIndex = 0;
        while (true) {
            if (node == undefined) break;

            steps[i]++;

            let direction = directions[directionIndex] === "L" ? 0 : 1;

            if (node[direction].endsWith("Z")) break;

            node = nodes.get(node[direction]);

            directionIndex = (directionIndex + 1) % directions.length;
        }
    }

    const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;
    const lcm = (a: number, b: number): number => a * b / gcd(a, b);

    return steps.reduce(lcm);
};

printResult(part1, part2);
