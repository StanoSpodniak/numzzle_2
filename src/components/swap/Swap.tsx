import { useRef, useState } from "react";
import style from "./swap.module.css";
//https://www.youtube.com/watch?v=_nZCvxJOPwU

const Swap = () => {
    const [people, setPeople] = useState([
        { id: 1, name: "1", content: "Lorem ipsum" },
        { id: 2, name: "2", content: "Lorem ipsum" },
        { id: 3, name: "3", content: "Lorem ipsum" },
        { id: 4, name: "4", content: "Lorem ipsum" },
        { id: 5, name: "5", content: "Lorem ipsum" },
        { id: 6, name: "6", content: "Lorem ipsum" },
        { id: 7, name: "7", content: "Lorem ipsum" },
        { id: 8, name: "8", content: "Lorem ipsum" },
        { id: 9, name: "9", content: "Lorem ipsum" },
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
        const peopleClone = [...people];
        const temp = peopleClone[dragPerson.current];
        peopleClone[dragPerson.current] =
            peopleClone[draggedOverPerson.current];
        peopleClone[draggedOverPerson.current] = temp;
        setPeople(peopleClone);
    }

    return (
        <div className={style.container}>
            {people.map((person, index) => (
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
                            draggingIndex === index ? style.dragging : ""
                        }`}
                    >
                        {person.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Swap;
