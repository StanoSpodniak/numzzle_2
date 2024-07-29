import { useEffect, useRef, useState } from "react";
import style from "./game.module.css";
import { generateProblem, MathProblem } from "../utils/utils";

const Game = () => {
    //dragging nefunguje na mobile https://phuoc.ng/collection/react-drag-drop/make-an-element-draggable-on-touchscreen-devices/
    const [problems, setProblems] = useState<MathProblem[]>([]);

    const generateThreeProblems = () => {
        const newProblems = [
            generateProblem(),
            generateProblem(),
            generateProblem(),
        ];
        setProblems(newProblems);
    };

    useEffect(() => {
        generateThreeProblems();
    }, []);

    useEffect(() => {
        const numbers = problems.flatMap((problem) => [
            problem.num1,
            problem.num2,
            problem.num3,
        ]);
        //shuffle numbers before setter
        setNums(numbers);

        const operators = problems.flatMap((problem) => [
            problem.operator1,
            problem.operator2,
            "",
        ]);
        setOperators(operators);

        const results = problems.flatMap((problem) => [
            "",
            "",
            "=" + problem.result.toString(),
        ]);
        setResults(results);
    }, [problems]);

    const [nums, setNums] = useState<number[]>([]);
    const [operators, setOperators] = useState<string[]>([]);
    const [results, setResults] = useState<string[]>([]);

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const dragNumber = useRef<number>(0);
    const draggedOverNumber = useRef<number>(0);

    function handleDragStart(index: number) {
        dragNumber.current = index;
        setDraggingIndex(index);
    }

    function handleDragEnter(index: number) {
        draggedOverNumber.current = index;
    }

    function handleDragEnd() {
        handleSort();
        setDraggingIndex(null);
    }

    function handleSort() {
        const numsClone = [...nums];
        const temp = numsClone[dragNumber.current];
        numsClone[dragNumber.current] = numsClone[draggedOverNumber.current];
        numsClone[draggedOverNumber.current] = temp;
        setNums(numsClone);
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.gameContainer}>
                {nums.map((digit, index) => (
                    <div className={style.section}>
                        <div
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => e.preventDefault()}
                            key={index}
                        >
                            <button
                                className={`${style.button} ${
                                    draggingIndex === index
                                        ? style.dragging
                                        : ""
                                }`}
                            >
                                {digit}
                            </button>
                        </div>
                        <p className={style.operator}>{operators[index]}</p>
                        <div className={style.resultContainer}>
                            <p className={style.result}>{results[index]}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className={style.submitButton}>Check</button>
        </div>
    );
};

export default Game;
