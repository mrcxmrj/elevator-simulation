type ControlColumnProps = {
    height: string;
    floorNumber: number;
};

enum Direction {
    Up = "UP",
    Down = "DOWN",
}

export default function ControlColumn(props: ControlColumnProps) {
    const logOrder = (floor: number, direction: Direction) =>
        console.log(floor, direction);

    const floors = Array.from(
        { length: props.floorNumber },
        (_, index) => props.floorNumber - index,
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
                    handleElevatorOrder={logOrder}
                />
            ))}
        </div>
    );
}

type ControlPanelProps = {
    floor: number;
    handleElevatorOrder: (floor: number, direction: Direction) => void;
};

function ControlPanel(props: ControlPanelProps) {
    return (
        <div className="h-32 flex flex-col justify-center">
            <button
                onClick={() =>
                    props.handleElevatorOrder(props.floor, Direction.Up)
                }
                className="hover:text-red-500"
            >
                up
            </button>
            <button
                onClick={() =>
                    props.handleElevatorOrder(props.floor, Direction.Down)
                }
                className="hover:text-red-500"
            >
                down
            </button>
        </div>
    );
}
