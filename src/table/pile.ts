import {Card} from "./card";

export interface Pile<T extends Card> {
    list(): T[]
    cut(): T[]
    shuffle(): T[]
    sort(sortingFunction: (a: T, b: T) => number): T[]
}
