import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
import arrayMove from "array-move";
import { useEffect, useState } from "react";
import style from "./sort.module.css";
//https://www.npmjs.com/package/react-easy-sort
//Famous quotes API: https://api-ninjas.com/api/quotes

// Utility function to shuffle an array - put them to the seperate file
// Urobit to iste s cislami - nebude ziadne dolne menu, ale na zaciatku budu cisla nahodne usporiadane
const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray;
};

const arraysEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

const Sort = () => {
    const [items, setItems] = useState<string[]>([
        "I",
        "'m",
        "going",
        "to",
        "work",
    ]);

    const [exercise, setExercise] = useState<string[]>([]);
    const onSortEnd = (oldIndex: number, newIndex: number) => {
        setExercise((array) => arrayMove(array, oldIndex, newIndex));
    };

    useEffect(() => {
        setExercise(shuffleArray(items));
    }, [items]);

    const handleCheck = () => {
        return console.log(arraysEqual(items, exercise));
    };

    return (
        <div className={style.container}>
            <SortableList
                onSortEnd={onSortEnd}
                className={style.sentence}
                draggedItemClassName="dragged"
            >
                {exercise.map((item) => (
                    <SortableItem key={item}>
                        <div>
                            <SortableKnob>
                                <button className={style.word}>{item}</button>
                            </SortableKnob>
                        </div>
                    </SortableItem>
                ))}
            </SortableList>
            <button className={style.submitButton} onClick={handleCheck}>
                Check
            </button>
        </div>
    );
};

export default Sort;
