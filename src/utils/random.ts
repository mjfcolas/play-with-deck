export function randomIntFromInterval(minIncluded: number, maxExcluded: number): number {
    return Math.floor(Math.random() * (maxExcluded - minIncluded) + minIncluded)
}
