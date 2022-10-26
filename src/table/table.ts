import {Card} from "./card";
import {DefaultPile} from "./default-pile";
import {Pile} from "./pile";

export class Table<T extends Card> {

    private readonly pileMap: Map<string, DefaultPile<T>> = new Map<string, DefaultPile<T>>()

    private constructor(mainPileIdentifier: string, cards: readonly T[]) {
        this.pileMap.set(mainPileIdentifier, new DefaultPile<T>(cards))
    }

    static fromDeck<T extends Card>(mainPileIdentifier: string, cards: readonly T[]) {
        return new Table(mainPileIdentifier, cards);
    }

    getPile(pileIdentifier: string): Pile<T> {
        return this.getDefaultPile(pileIdentifier)
    }

    private getDefaultPile(pileIdentifier: string): DefaultPile<T> {
        if (!this.pileMap.has(pileIdentifier)) {
            return new DefaultPile([]);
        }
        return this.pileMap.get(pileIdentifier);
    }

    draw(numberOfCardsToDraw: number, pileToDraw: string, pileToPopulate: string): T[] {
        const drawnCards: T[] = this.getDefaultPile(pileToDraw).draw(numberOfCardsToDraw);
        if (!this.pileMap.has(pileToPopulate)) {
            this.pileMap.set(pileToPopulate, new DefaultPile<T>([]))
        }

        this.pileMap.get(pileToPopulate).add(drawnCards)
        return drawnCards;
    }

    pick(cardIdentifier: string, pileToPick: string, pileToPopulate: string) {
        const pickedCard: T = this.getDefaultPile(pileToPick).pick(cardIdentifier)
        if (!this.pileMap.has(pileToPopulate)) {
            this.pileMap.set(pileToPopulate, new DefaultPile<T>([]))
        }
        this.pileMap.get(pileToPopulate).add([pickedCard])
        return pickedCard;
    }

    gather(pileToPopulate: string): T[]{
        this.pileMap.forEach((currentPileToDraw) => {
            const drawnCards: T[] = currentPileToDraw.drawAll();
            this.pileMap.get(pileToPopulate).add(drawnCards)
        })
        return this.pileMap.get(pileToPopulate).list();
    }
}
