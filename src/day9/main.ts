import { readFile, printResult } from "../../helpers";

const input = readFile();

class Sequence {
    values: number[];
    nextValue: number = -1;
    previousValue: number = -1;
    sequences: Sequence[] = [];

    constructor(values: number[]) {
        this.values = values;
    }
}

const part1 = () => {
    let sequences: Sequence[] = createSequences();

    let sum = 0;
    for (const sequence of sequences) {
        let sequenceList = sequence.sequences;

        for (let i = sequenceList.length - 2; i >= 0; i--) {
            let newSequence = sequenceList[i];   
            let lastValueCurrent = newSequence.values[newSequence.values.length - 1];
            let previousNextValue = sequenceList[i + 1].nextValue;
            newSequence.nextValue = lastValueCurrent + previousNextValue
        }
        sequence.nextValue = sequence.values[sequence.values.length - 1] + sequence.sequences[0].nextValue;

        sum += sequence.nextValue;
    }

    return sum;
}

const part2 = () => {
    let sequences: Sequence[] = createSequences();

    let sum = 0;
    for (const sequence of sequences) {
        let sequenceList = sequence.sequences;

        for (let i = sequenceList.length - 2; i >= 0; i--) {
            let newSequence = sequenceList[i];   
            let firstValueCurrent = newSequence.values[0];
            let previousPreviousValue = sequenceList[i + 1].previousValue;
            newSequence.previousValue = firstValueCurrent - previousPreviousValue
        }
        sequence.previousValue = sequence.values[0] - sequence.sequences[0].previousValue;

        sum += sequence.previousValue;
    }

    return sum;
}

const createSequences = (): Sequence[] => {
    let sequences: Sequence[] = []

    for(const sequence of input) {
        sequences.push(new Sequence(sequence.split(" ").map((n) => parseInt(n))))
    }

    for (const sequence of sequences) {
        let currentSequence = sequence;
        while(!currentSequence.values.every((n) => n === 0)) {
            let newValues: number[] = []

            for (let i = 0; i < currentSequence.values.length - 1; i++) {
                let newValue = currentSequence.values[i + 1] - currentSequence.values[i];
                newValues.push(newValue);
            }

            let newSequence = new Sequence(newValues);
            sequence.sequences.push(newSequence);
            currentSequence = newSequence;
        }
        // Set next and previous value of sequence of all 0's to 0
        sequence.sequences[sequence.sequences.length - 1].nextValue = 0;
        sequence.sequences[sequence.sequences.length - 1].previousValue = 0;
    }

    return sequences;
}

printResult(part1, part2)