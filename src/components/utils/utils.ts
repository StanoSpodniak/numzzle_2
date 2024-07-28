export function generateOperators(): string[] {
    const operators: string[] = [];
    for (let i = 1; i < 10; i++) {
        if (i % 3 === 0) {
            operators.push("=");
        } else {
            const randomOperator = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            if (randomOperator === 1) {
                operators.push("+");
            } else if (randomOperator === 2) {
                operators.push("-");
            } else if (randomOperator === 3) {
                operators.push("/");
            } else {
                operators.push("*");
            }
        }
    }
    return operators;
}

export function generateRandomNumbers(
    min: number,
    max: number,
    operators: string[]
): number[] {
    const randomNumbers: number[] = [];
    const results = getResults(randomNumbers, operators);
    /*do {
        for (let i = 0; i < 9; i++) {
            const randomNumber =
                Math.floor(Math.random() * (max - min + 1)) + min;
            randomNumbers.push(randomNumber);
        }
    } while (
        !Number.isInteger(results[0]) ||
        !Number.isInteger(results[1]) ||
        !Number.isInteger(results[1])
    );*/

    return randomNumbers;
}

export function getResults(randomNumbers, operators) {
    const results: number[] = [];
    return results;
}
