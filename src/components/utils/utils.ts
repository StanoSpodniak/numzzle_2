export interface MathProblem {
    num1: number;
    operator1: string;
    num2: number;
    operator2: string;
    num3: number;
    result: number;
}

export function generateProblem() {
    let result: number;
    let num1: number;
    let num2: number;
    let num3: number;
    let operator1: string;
    let operator2: string;

    do {
        const operators = ["+", "-", "*", "/"];
        const operators2 = ["+", "-", "*"];
        operator1 = operators[Math.floor(Math.random() * operators.length)];
        operator2 = operators2[Math.floor(Math.random() * operators.length)];

        num1 = Math.floor(Math.random() * 20) + 1; // Avoid zero to prevent division by zero
        num2 = Math.floor(Math.random() * 20) + 1;
        num3 = Math.floor(Math.random() * 20) + 1;

        // Create a problem string with parentheses to ensure correct order of operations
        const problem = `(${num1} ${operator1} ${num2}) ${operator2} ${num3}`;

        // Use Function constructor to safely evaluate the expression
        try {
            result = new Function(`return ${problem}`)();
        } catch (e) {
            result = NaN;
        }
    } while (!isWholeNumber(result) || result >= 100);

    return { num1, operator1, num2, operator2, num3, result };
}

const isWholeNumber = (num: number): boolean => {
    return Number.isInteger(num);
};
