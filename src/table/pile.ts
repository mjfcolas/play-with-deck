import {Card} from "./card";
import {randomIntFromInterval} from "../utils/random";

export class Pile<T extends Card> {

    private cards: T[]

    constructor(cards: readonly T[]) {
        this.cards = [...cards]
    }

    list(): T[] {
        return this.cards;
    }

    cut(): T[] {
        if (this.cards.length < 2) {
            return this.cards;
        }
        const cutPosition: number = randomIntFromInterval(1, this.cards.length - 1)
        this.cards = [...this.cards.slice(cutPosition, this.cards.length), ...this.cards.slice(0, cutPosition)];
        return this.list();
    }

    shuffle(): T[] {
        this.sort(() => 0.5 - Math.random())
        return this.list()
    }

    sort(sortingFunction: (a: T, b: T) => number): T[] {
        this.cards.sort(sortingFunction)
        return this.list()
    }

    draw(numberOfCardsToDraw: number): T[] {
        return this.cards.splice(this.cards.length - numberOfCardsToDraw, numberOfCardsToDraw);
    }

    drawAll(): T[]{
        return this.cards.splice(0, this.cards.length)
    }

    pick(cardToPickIdentifier: string): T {
        const indexOfPickedCard: number = this.cards.findIndex(currentCard => currentCard.identifier === cardToPickIdentifier);
        const pickedCard: T = this.cards[indexOfPickedCard];
        this.cards.splice(indexOfPickedCard, 1)
        return pickedCard;
    }

    add(cardsToAdd: T[]): void {
        this.cards = [...this.cards, ...cardsToAdd];
    }
}
