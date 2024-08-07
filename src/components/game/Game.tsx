import { useEffect, useRef, useState } from "react";
import style from "./game.module.css";
import { generateProblem, MathProblem } from "../utils/utils";

const Game = () => {
    // cursor issue: https://stackoverflow.com/questions/66233979/change-not-allowed-cursor-on-drag-in-react
    //Tutorial: https://www.youtube.com/watch?v=pyx3Ps20TOg&list=PLDIXF8nb0VG0I-ZTeS_JAnUQEcsBMde9q
    //dragging nefunguje na mobile https://phuoc.ng/collection/react-drag-drop/make-an-element-draggable-on-touchscreen-devices/

    //pre efekt presúvania urobiť div s border a v ňom presne tak isté veľké button s tou istou border

    //skúsiť použiť pohyb zo Sratch component, Návod: https://github.com/phuocng/react-drag-drop https://phuoc.ng/collection/react-drag-drop/
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

    const [dragging, setDragging] = useState(false);

    const handleDragStart = (index: number) => {
        dragNumber.current = index;
        setDraggingIndex(index);

        setTimeout(() => {
            setDragging(true);
        }, 0);
    };

    const handleDragEnter = (index: number) => {
        draggedOverNumber.current = index;
    };

    const handleDragEnd = () => {
        handleSort();
        setDraggingIndex(null);
        setDragging(false);
    };

    const handleSort = () => {
        if (dragNumber.current !== null && draggedOverNumber.current !== null) {
            const numsClone = [...nums];
            const temp = numsClone[dragNumber.current];
            numsClone[dragNumber.current] =
                numsClone[draggedOverNumber.current];
            numsClone[draggedOverNumber.current] = temp;
            setNums(numsClone);
        }
    };

    const handleTouchStart = (index: number) => {
        handleDragStart(index);
    };

    const handleTouchMove = (event: TouchEvent) => {
        event.preventDefault();
        const touch = event.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target) {
            const targetIndex = parseInt(
                target.getAttribute("data-index") || "",
                10
            );
            if (!isNaN(targetIndex)) {
                handleDragEnter(targetIndex);
            }
        }
    };

    const handleTouchEnd = () => {
        handleDragEnd();
    };

    useEffect(() => {
        const touchMoveListener = (event: TouchEvent) => handleTouchMove(event);
        const touchEndListener = () => handleTouchEnd();

        if (draggingIndex !== null) {
            document.addEventListener("touchmove", touchMoveListener, {
                passive: false,
            });
            document.addEventListener("touchend", touchEndListener, {
                passive: false,
            });
        } else {
            document.removeEventListener("touchmove", touchMoveListener);
            document.removeEventListener("touchend", touchEndListener);
        }

        return () => {
            document.removeEventListener("touchmove", touchMoveListener);
            document.removeEventListener("touchend", touchEndListener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draggingIndex]);

    return (
        <div className={style.mainContainer}>
            <div className={style.gameContainer}>
                {nums.map((num, index) => (
                    <div key={index} className={style.section}>
                        <div
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                            onTouchStart={() => handleTouchStart(index)}
                            className={style.draggable}
                        >
                            <button
                                data-index={index}
                                className={`${style.button} ${
                                    draggingIndex === index && dragging
                                        ? style.dragging
                                        : ""
                                }`}
                            >
                                {num}
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
