import Draggable from "react-draggable";

const Drag = () => {
    return (
        <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            grid={[25, 25]}
            scale={1}
        >
            <div>
                <div className="handle">Drag from here</div>
                <div>This readme is really dragging on...</div>
            </div>
        </Draggable>
    );
};

export default Drag;
