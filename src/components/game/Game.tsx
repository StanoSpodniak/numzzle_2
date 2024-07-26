import { useState, useRef, useEffect } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import style from "./game.module.css";

const Game = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef<HTMLButtonElement>(null);

    const [layoutButtonPosition, setLayoutButtonPosition] = useState({
        x: 0,
        y: 0,
    });
    const layoutRef = useRef<HTMLButtonElement>(null);

    //jeden useEffect sa pouzije aj na zaciatku pre pociatocne rozmiestnenie cisel

    useEffect(() => {
        if (layoutRef.current) {
            setLayoutButtonPosition({
                //myslim, ze toto pocita hodnoty od laveho horneho rohu a draggable pocita hodnoty od stredu
                x: layoutRef.current.getBoundingClientRect().x,
                y: layoutRef.current.getBoundingClientRect().y,
            });
        }
    }, [position]);

    const handleDrag = (e: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleMouseUp = (e: DraggableEvent, data: DraggableData) => {
        if (position.x - data.x < layoutButtonPosition.x - data.x) {
            setPosition({ x: 0, y: 0 });
        } else {
            setPosition({
                x: layoutButtonPosition.x,
                y: layoutButtonPosition.y,
            });
        }
        console.log(data.x);
        console.log(data.y);
        console.log(layoutButtonPosition);
    };

    return (
        <div>
            <Draggable
                nodeRef={draggableRef}
                position={position}
                onDrag={handleDrag}
                onStop={handleMouseUp}
            >
                <button ref={draggableRef} className={style.button}>
                    1
                </button>
            </Draggable>
            <div className={style.inventoryLayout}>
                <button ref={layoutRef} className={style.gridButton}></button>
                <button className={style.gridButton}></button>
            </div>
        </div>
    );
};
export default Game;
