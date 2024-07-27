import { Reorder } from "framer-motion";
import style from "./motion.module.css";
import { useState } from "react";
//Aplikácia ako Duolingo len slová bude možné prehadzovať priamo. Nájsť k tomu API, možno: https://rapidapi.com/kdictionaries/api/lexicala1
//https://fraze.it/api.jsp#phr_api
//https://www.npmjs.com/package/react-easy-sort

//!Famos quotes: https://api-ninjas.com/api/quotes!

const Motion = () => {
    const [items, setItems] = useState([1, 2, 3, 4, 5]);
    const [sentence, setSentence] = useState([
        "I",
        "'m",
        "going",
        "to",
        "work",
    ]);

    return (
        <div className={style.container}>
            <h1>Idem do práce.</h1>
            <Reorder.Group
                axis="x"
                values={items}
                onReorder={setItems}
                className={style.sentence}
            >
                {items.map((item, index) => (
                    <Reorder.Item
                        value={item}
                        key={item}
                        className={style.reorderItem}
                    >
                        <button className={style.word}>
                            {sentence[index]}
                        </button>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <button className={style.submitButton}>Submit</button>
        </div>
    );
};

export default Motion;
