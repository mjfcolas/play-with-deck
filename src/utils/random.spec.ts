import {randomIntFromInterval} from "./random";

describe(`Random`, () => {
    test(`Given a min at 10 and a max at 50,
    when getting random number between min included and max excluded 100 times,
    then all results are between min and max and mean value is approximately 30`, () => {
        let sumOfResult = 0;
        const min = 10;
        const max = 50;
        const mean = (10 + 50)/2;
        const margin = 5;
        const numberOfLaunches = 1000;
        Array.from(Array(numberOfLaunches).keys()).forEach(_ => {
            const currentResult = randomIntFromInterval(min, max);
            expect(currentResult).toBeLessThan(max);
            expect(currentResult).toBeGreaterThanOrEqual(min);
            sumOfResult+= currentResult;
        })
        console.log(sumOfResult/numberOfLaunches);
        expect(sumOfResult/numberOfLaunches).toBeLessThan(mean + margin)
        expect(sumOfResult/numberOfLaunches).toBeGreaterThan(mean - margin)

    });
});
