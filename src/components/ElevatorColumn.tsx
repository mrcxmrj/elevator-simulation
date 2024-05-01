type ElevatorColumnProps = {
    height: string;
};

export default function ElevatorColumn(props: ElevatorColumnProps) {
    return (
        <div
            className="relative w-32 border-2 border-black"
            style={{ height: props.height }}
        >
            <Elevator floor={2} />
        </div>
    );
}

type ElevatorProps = {
    floor: number;
};

function Elevator(props: ElevatorProps) {
    const calculateFloorPosition = (floor: number) => `${8 * floor}rem`;
    return (
        <div
            className="absolute w-full h-32 border-y-2 border-black"
            style={{ bottom: calculateFloorPosition(props.floor) }}
        ></div>
    );
}
