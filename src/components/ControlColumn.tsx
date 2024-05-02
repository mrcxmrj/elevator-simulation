import { Direction } from "../types";

type ControlColumnProps = {
    height: string;
    floorNumber: number;
    onElevatorOrder: (floor: number, direction: Direction) => void;
};

export default function ControlColumn(props: ControlColumnProps) {
    const floors = Array.from(
        { length: props.floorNumber },
        (_, index) => props.floorNumber - index - 1,
    );

    return (
        <div className="relative w-32" style={{ height: props.height }}>
            {floors.map((floor) => (
                <ControlPanel
                    key={floor}
                    floor={floor}
                    onElevatorOrder={props.onElevatorOrder}
                />
            ))}
        </div>
    );
}

type ControlPanelProps = {
    floor: number;
    onElevatorOrder: (floor: number, direction: Direction) => void;
};

const UP_ARROW = "\u2191";
const DOWN_ARROW = "\u2193";

function ControlPanel(props: ControlPanelProps) {
    return (
        <div className="h-32 flex justify-center items-center">
            <h1 className="mr-8 text-4xl">{props.floor}</h1>
            <div className="w-fit h-fit p-4 rounded-full flex flex-col justify-center border-2 border-black text-xl">
                <button
                    onClick={() =>
                        props.onElevatorOrder(props.floor, Direction.Up)
                    }
                    className="h-full hover:text-red-500"
                >
                    {UP_ARROW}
                </button>
                <button
                    onClick={() =>
                        props.onElevatorOrder(props.floor, Direction.Down)
                    }
                    className="h-full hover:text-red-500"
                >
                    {DOWN_ARROW}
                </button>
            </div>
        </div>
    );
}
