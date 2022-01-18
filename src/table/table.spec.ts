import {Card} from "./card";
import {DummyCard} from "./dummy/dummy-card";
import {Table} from "./table";
import {Pile} from "./pile";

describe(`Table`, () => {

    const primaryPileIdentifier = "PRIMARY";
    const cards: Card[] = Array.from(Array(10).keys()).map(x => new DummyCard(x.toString(), x));

    const secondaryPileIdentifier = "SECONDARY";

    test(`Given a main pile, 
    when initializing table, 
    then table is initialized`, () => {
        const table: Table<Card> = Table.fromDeck(primaryPileIdentifier, cards);
        expect(table).toBeTruthy();
    })

    test(`Given an initialized table, 
    when getting a pile that does not a priori exists,
    then an empty pile is returned`, () => {
        const table: Table<Card> = Table.fromDeck(primaryPileIdentifier, cards);
        const expectedPile: Pile<Card> = table.getPile(secondaryPileIdentifier)
        expect(expectedPile.list()).toEqual([])
    })

    test(`Given an initialized table, 
    when getting a pile that exists,
    then pile is returned and contains cards`, () => {
        const table: Table<Card> = Table.fromDeck(primaryPileIdentifier, cards);
        const expectedPile: Pile<Card> = table.getPile(primaryPileIdentifier)
        expect(expectedPile.list()).toEqual(cards)
    })

    test(`Given an initialized table with a source pile and a target pile,
    when drawing a given number of cards from source pile,
    then drawn cards are remove from top of source pile and added at top of target pile`, () => {
        const table: Table<Card> = Table.fromDeck(primaryPileIdentifier, cards);
        const drawnCards: Card[] = table.draw(3, primaryPileIdentifier, secondaryPileIdentifier);
        const expectedDrawnCards: Card[] = [
            new DummyCard('7', 7),
            new DummyCard('8', 8),
            new DummyCard('9', 9),
        ];
        expect(drawnCards).toEqual(expectedDrawnCards);

        expect(table.getPile(secondaryPileIdentifier).list()).toEqual(expectedDrawnCards);

        const expectedPrimaryListAfterDraw: Card[] = [
            new DummyCard('0', 0),
            new DummyCard('1', 1),
            new DummyCard('2', 2),
            new DummyCard('3', 3),
            new DummyCard('4', 4),
            new DummyCard('5', 5),
            new DummyCard('6', 6),
        ]
        expect(table.getPile(primaryPileIdentifier).list()).toEqual(expectedPrimaryListAfterDraw)
    })

    test(`Given an initialized table with a source pile and a target pile that already exists,
    when drawing a given number of cards from source pile,
    then drawn cards are remove from top of source pile and added at top of target pile`, () => {
        const table: Table<Card> = Table.fromDeck(primaryPileIdentifier, cards);
        const firstDrawnCard: Card[] = table.draw(1, primaryPileIdentifier, secondaryPileIdentifier);
        const drawnCards: Card[] = table.draw(2, primaryPileIdentifier, secondaryPileIdentifier);

        const expectedDrawnCards: Card[] = [
            new DummyCard('7', 7),
            new DummyCard('8', 8),
        ];
        expect(drawnCards).toEqual(expectedDrawnCards);

        expect(table.getPile(secondaryPileIdentifier).list()).toEqual([...firstDrawnCard, ...expectedDrawnCards]);
    })

    test(`Given an initialized table with a source pile and a target pile,
    when picking a given card from source pile,
    then picked card is removed from source pile and added at top of target pile`, () => {
        const table: Table<Card> = Table.fromDeck(primaryPileIdentifier, cards);
        const pickedCard: Card = table.pick('3', primaryPileIdentifier, secondaryPileIdentifier);
        const expectedPickedCard: Card = new DummyCard('3', 3);
        expect(pickedCard).toEqual(expectedPickedCard);

        expect(table.getPile(secondaryPileIdentifier).list()).toEqual([pickedCard]);
        const expectedPrimaryListAfterPick: Card[] = [
            new DummyCard('0', 0),
            new DummyCard('1', 1),
            new DummyCard('2', 2),
            new DummyCard('4', 4),
            new DummyCard('5', 5),
            new DummyCard('6', 6),
            new DummyCard('7', 7),
            new DummyCard('8', 8),
            new DummyCard('9', 9),
        ]
        expect(table.getPile(primaryPileIdentifier).list()).toEqual(expectedPrimaryListAfterPick)

    })

    test(`Given an initialized table with a source pile and a target pile that already exists,
    when picking a given card from source pile,
    then picked card is removed from source pile and added at top of target pile`, () => {
        const table: Table<Card> = Table.fromDeck(primaryPileIdentifier, cards);
        const firstPickedCard: Card = table.pick('5', primaryPileIdentifier, secondaryPileIdentifier);

        const secondPickedCard: Card = table.pick('3', primaryPileIdentifier, secondaryPileIdentifier);
        expect(table.getPile(secondaryPileIdentifier).list()).toEqual([firstPickedCard, secondPickedCard]);
    })

    test(`Given an initialized table with cards in different piles,
    when gathering cards in a pile, 
    then all cards are returned and the only pile to have cards is the target pile`, () => {
        const table: Table<Card> = Table.fromDeck(primaryPileIdentifier, cards);
        table.draw(3, primaryPileIdentifier, secondaryPileIdentifier);

        table.gather(primaryPileIdentifier);
        expect(table.getPile(primaryPileIdentifier).list().length).toEqual(cards.length);
        expect(table.getPile(secondaryPileIdentifier).list().length).toEqual(0);
    })

});
