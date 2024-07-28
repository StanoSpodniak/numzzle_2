import { useRef, useState } from "react";
import style from "./game.module.css";

const Game = () => {
    const [digits, setDigits] = useState([1, 2, 3, 4, 15, 56, 7, 8, 9]);
    const [operations, setOperations] = useState([
        "-",
        "+",
        "=",
        "+",
        "*",
        "=",
        "-",
        "/",
        "=",
    ]);
    const [results, setResults] = useState([
        "",
        "",
        20,
        "",
        "",
        30,
        "",
        "",
        40,
    ]);

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const dragPerson = useRef<number>(0);
    const draggedOverPerson = useRef<number>(0);

    function handleDragStart(index: number) {
        dragPerson.current = index;
        setDraggingIndex(index);
    }

    function handleDragEnter(index: number) {
        draggedOverPerson.current = index;
    }

    function handleDragEnd() {
        handleSort();
        setDraggingIndex(null);
    }

    function handleSort() {
        const digitsClone = [...digits];
        const temp = digitsClone[dragPerson.current];
        digitsClone[dragPerson.current] =
            digitsClone[draggedOverPerson.current];
        digitsClone[draggedOverPerson.current] = temp;
        setDigits(digitsClone);
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.gameContainer}>
                {digits.map((digit, index) => (
                    <div className={style.row}>
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
                        <p className={style.operator}>{operations[index]}</p>
                        <p className={style.result}>{results[index]}</p>
                    </div>
                ))}
            </div>
            <button className={style.submitButton}>Check</button>
        </div>
    );
};

export default Game;
