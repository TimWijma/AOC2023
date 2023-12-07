import { readFile, printResult } from "../../helpers";

enum Type {
    HighCard,
    OnePair,
    TwoPair,
    ThreeKind,
    FullHouse,
    FourKind,
    FiveKind,
}

class Hand {
    hand: string;
    bid: number;
    type: Type = Type.HighCard;

    constructor(hand: string, bid: number, type: Type = Type.HighCard) {
        this.hand = hand;
        this.bid = bid;
        this.type = type;
    }
}

const input = readFile();

let hands = input.map((h) => {
    const [hand, bid] = h.split(" ");
    return new Hand(hand, parseInt(bid));
});

const part1 = () => {
    const cards = ["2","3","4","5","6","7","8","9","T","J", "Q","K","A"];
    return calculateSum(1, cards);
};

const part2 = () => {
    const cards = ["J","2","3","4","5","6","7","8","9","T","Q","K","A"];
    return calculateSum(2, cards);
};

const calculateType = (hand: Hand, part: number): Hand => {
    const characters: { [key: string]: number } = {};

    for (const char of hand.hand) {
        characters[char] = (characters[char] ?? 0) + 1;
    }

    if (part === 2) {
        let mostCommon = "";
        for (const [key, value] of Object.entries(characters)) {
            if (key === "J") continue;
            if (mostCommon) {
                if (value > characters[mostCommon]) {
                    mostCommon = key;
                }
            } else {
                mostCommon = key;
            }
        }
        characters[mostCommon] += characters["J"] | 0;
        delete characters["J"];
    }

    let keys = Object.keys(characters);
    let type = Type.HighCard;
    switch (keys.length) {
        case 1:
            type = Type.FiveKind;
            break;
        case 2:
            if (characters[keys[0]] === 4 || characters[keys[1]] === 4) {
                type = Type.FourKind;
                break;
            }
            type = Type.FullHouse;
            break;
        case 3:
            if (
                characters[keys[0]] === 3 ||
                characters[keys[1]] === 3 ||
                characters[keys[2]] === 3
            ) {
                type = Type.ThreeKind;
                break;
            }
            type = Type.TwoPair;
            break;
        case 4:
            type = Type.OnePair;
            break;
        default:
            type = Type.HighCard;
            break;
    }

    return new Hand(hand.hand, hand.bid, type);
};

const calculateStrongerCard = (a: Hand, b: Hand, cards: string[]) => {
    for (let i = 0; i < a.hand.length; i++) {
        let charA = cards.indexOf(a.hand[i]);
        let charB = cards.indexOf(b.hand[i]);
        if (charA > charB) return a;
        else if (charB > charA) return b;
    }
};

const calculateSum = (part: number, cards: string[]): number => {
    let newHands: Hand[] = [];
    for (let hand of hands) {
        newHands.push(calculateType(hand, part));
    }
    
    newHands = newHands.sort((a, b) => {
        if (a.type === b.type) {
            return calculateStrongerCard(a, b, cards) === a ? 1 : -1;
        }
        return a.type - b.type;
    });

    let sum = 0;
    for (let i = 0; i < newHands.length; i++) {
        sum += newHands[i].bid * (i + 1);
    }

    return sum;
};

printResult(part1, part2);