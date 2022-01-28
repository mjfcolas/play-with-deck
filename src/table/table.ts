import {Card} from "./card";
import {Pile} from "./pile";

export class Table<T extends Card> {

    private readonly pileMap: Map<string, Pile<T>> = new Map<string, Pile<T>>()

    private constructor(mainPileIdentifier: string, cards: readonly T[]) {
        this.pileMap.set(mainPileIdentifier, new Pile<T>(cards))
    }

    static fromDeck<T extends Card>(mainPileIdentifier: string, cards: readonly T[]) {
        return new Table(mainPileIdentifier, cards);
    }

    getPile(pileIdentifier: string): Pile<T> {
        if (!this.pileMap.has(pileIdentifier)) {
            return new Pile([]);
        }
        return this.pileMap.get(pileIdentifier);
    }

    draw(numberOfCardsToDraw: number, pileToDraw: string, pileToPopulate: string): T[] {
        const drawnCards: T[] = this.getPile(pileToDraw).draw(numberOfCardsToDraw);
        if (!this.pileMap.has(pileToPopulate)) {
            this.pileMap.set(pileToPopulate, new Pile<T>([]))
        }

        this.pileMap.get(pileToPopulate).add(drawnCards)
        return drawnCards;
    }

    pick(cardIdentifier: string, pileToPick: string, pileToPopulate: string) {
        const pickedCard: T = this.getPile(pileToPick).pick(cardIdentifier)
        if (!this.pileMap.has(pileToPopulate)) {
            this.pileMap.set(pileToPopulate, new Pile<T>([]))
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
