type ElevatorProps = {
    floor: number;
};

export default function Elevator(props: ElevatorProps) {
    const calculateFloorPosition = (floor: number) => `${8 * floor}rem`;
    return (
        <div
            className="absolute w-full h-32 border-y-2 border-black"
            style={{ bottom: calculateFloorPosition(props.floor) }}
        ></div>
    );
}
