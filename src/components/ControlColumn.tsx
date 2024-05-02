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
        <div
            className="relative w-32 border-2 border-black"
            style={{ height: props.height }}
        >
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

function ControlPanel(props: ControlPanelProps) {
    return (
        <div className="h-32 flex flex-col justify-center">
            <button
                onClick={() => props.onElevatorOrder(props.floor, Direction.Up)}
                className="hover:text-red-500"
            >
                up
            </button>
            <button
                onClick={() =>
                    props.onElevatorOrder(props.floor, Direction.Down)
                }
                className="hover:text-red-500"
            >
                down
            </button>
        </div>
    );
}
