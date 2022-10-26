import {Card} from "./card";
import {DummyCard} from "./dummy/dummy-card";
import {DefaultPile} from "./default-pile";
import * as mockedRandomIntFromInterval from "../utils/random";

describe(`Pile`, () => {

    const cards: Card[] = Array.from(Array(10).keys()).map(x => new DummyCard(x.toString(), x));

    test(`Given an initialized  pile,
    when cutting pile,
    then order in cards of pile is broken only at one point`, () => {
        const mockRandom = jest.spyOn(mockedRandomIntFromInterval, 'randomIntFromInterval')
        mockRandom.mockReturnValue(5);

        const pile = new DefaultPile(cards);
        const cutCards: Card[] = pile.cut();
        expect(cutCards.length).toEqual(cards.length)

        const expectedCutCards: Card[] = [
            new DummyCard('5', 5),
            new DummyCard('6', 6),
            new DummyCard('7', 7),
            new DummyCard('8', 8),
            new DummyCard('9', 9),
            new DummyCard('0', 0),
            new DummyCard('1', 1),
            new DummyCard('2', 2),
            new DummyCard('3', 3),
            new DummyCard('4', 4),
        ]

        expect(cutCards).toEqual(expectedCutCards)
        const listedCardsAfterCut = pile.list();
        expect(listedCardsAfterCut).toEqual(expectedCutCards)

    })

    test(`Given an initialized pile with only one card,
    when cutting pile,
    then cut cards is equals to not cut cards`, () => {
        const smallDeck = [new DummyCard('1', 1)];
        const pile = new DefaultPile(smallDeck);
        const cutCards: Card[] = pile.cut();
        expect(cutCards).toEqual(smallDeck)
    })

    test(`Given an initialized pile,
    when shuffling pile,
    then order in cards of pile is completely broken`, () => {
        const pile = new DefaultPile(cards);
        const shuffledCards: Card[] = pile.shuffle();

        expect(shuffledCards.length).toEqual(cards.length)
        expect(shuffledCards).not.toEqual(cards);
        expect(pile.list()).not.toEqual(cards);
    })

    test(`Given an initialized pile with shuffled cards,
    when sorting pile,
    then cards of pile are ordered according to sorting function`, () => {
        const shuffledCards: Card[] = [...cards].sort(() => 0.5 - Math.random())
        const pile = new DefaultPile(shuffledCards);
        const sortedCards = pile.sort((a: DummyCard, b: DummyCard) => a.value - b.value)

        expect(sortedCards).toEqual(cards);
        expect(pile.list()).toEqual(cards)
    })

    test(`Given an initialized pile,
    when listing cards of pile,
    then cards in pile are returned`, () => {
        const pile = new DefaultPile(cards);
        expect(pile.list()).toEqual(cards)
    })

    test(`Given an initialized pile and a number of cards, 
    when drawing cards, 
    then cards are returned and removed from top of the pile`, () => {
        const pile = new DefaultPile(cards);
        const drawnCards: Card[] = pile.draw(3);
        const expectedDrawnCards: Card[] = [
            new DummyCard('7', 7),
            new DummyCard('8', 8),
            new DummyCard('9', 9),
        ];
        expect(drawnCards).toEqual(expectedDrawnCards);

        const expectedCardsAfterDraw = [
            new DummyCard('0', 0),
            new DummyCard('1', 1),
            new DummyCard('2', 2),
            new DummyCard('3', 3),
            new DummyCard('4', 4),
            new DummyCard('5', 5),
            new DummyCard('6', 6),
        ]

        expect(pile.list()).toEqual(expectedCardsAfterDraw);
    })

    test(`Given an initialized pile, 
    when drawing all cards, 
    then cards are returned and pile does not have cards anymore`, () => {
        const pile = new DefaultPile(cards);
        const drawnCards: Card[] = pile.drawAll();
        const expectedDrawnCards: Card[] = [
            new DummyCard('0', 0),
            new DummyCard('1', 1),
            new DummyCard('2', 2),
            new DummyCard('3', 3),
            new DummyCard('4', 4),
            new DummyCard('5', 5),
            new DummyCard('6', 6),
            new DummyCard('7', 7),
            new DummyCard('8', 8),
            new DummyCard('9', 9),
        ];
        expect(drawnCards).toEqual(expectedDrawnCards);

        const expectedCardsAfterDraw = [
        ]

        expect(pile.list()).toEqual(expectedCardsAfterDraw);
    })

    test(`Given an initialized pile and a card identifier, 
    when picking a card, 
    then picked card is returned and removed from pile`, () => {
        const pile = new DefaultPile(cards);
        const pickedCard: Card = pile.pick('8');
        const expectedPickedCard: Card = new DummyCard('8', 8);
        expect(pickedCard).toEqual(expectedPickedCard);

        const expectedCardsAfterPick = [
            new DummyCard('0', 0),
            new DummyCard('1', 1),
            new DummyCard('2', 2),
            new DummyCard('3', 3),
            new DummyCard('4', 4),
            new DummyCard('5', 5),
            new DummyCard('6', 6),
            new DummyCard('7', 7),
            new DummyCard('9', 9),
        ]

        expect(pile.list()).toEqual(expectedCardsAfterPick);
    })

    test(`Given an initialized pile,
    when adding cards to pile,
    then resulting pile contains new cards`, () => {
        const pile = new DefaultPile(cards);

        const cardsToAdd: Card[] = [
            new DummyCard('10', 10),
            new DummyCard('11', 11),
            new DummyCard('12', 12)
        ];
        pile.add(cardsToAdd)

        expect(pile.list()).toEqual([...cards, ...cardsToAdd])
    })

});
