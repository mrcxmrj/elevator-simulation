import { Direction, ElevatorState } from "../types";

type ElevatorColumnProps = {
    id: string;
    height: string;
    elevatorState: ElevatorState;
    floorNumber: number;
    onFloorPick: (elevatorId: string, floor: number) => Promise<void>;
};

export default function ElevatorColumn(props: ElevatorColumnProps) {
    const handleFloorPick = (elevatorId: string) => (floor: number) =>
        props.onFloorPick(elevatorId, floor);
    return (
        <div
            className="relative w-32 border-2 border-black overflow-clip"
            style={{ height: props.height }}
        >
            <Elevator
                floorNumber={props.floorNumber}
                elevatorState={props.elevatorState}
                onFloorPick={handleFloorPick(props.id)}
            />
        </div>
    );
}

type ElevatorProps = {
    floorNumber: number;
    elevatorState: ElevatorState;
    onFloorPick: (floor: number) => Promise<void>;
};

function Elevator(props: ElevatorProps) {
    const calculateFloorPosition = (floor: number) => `${128 * floor - 2}px`; // -2 to account for border
    return (
        <div
            className="absolute w-full h-32 border-y-2 border-black"
            style={{
                bottom: calculateFloorPosition(props.elevatorState.floor),
            }}
        >
            {props.elevatorState.direction === Direction.Idle && (
                <FloorPicker
                    floorNumber={props.floorNumber}
                    onFloorPick={props.onFloorPick}
                />
            )}
        </div>
    );
}

type FloorPickerProps = {
    floorNumber: number;
    onFloorPick: (floor: number) => Promise<void>;
};

function FloorPicker(props: FloorPickerProps) {
    const floorNumbers = Array.from(
        { length: props.floorNumber },
        (_, index) => index,
    );
    return (
        <div className="h-full flex justify-center items-center flex-wrap overflow-x-hidden">
            {floorNumbers.map((floor) => (
                <button
                    key={floor}
                    onClick={() => props.onFloorPick(floor)}
                    className={`flex-1 ${props.floorNumber <= 10 ? "px-6" : "px-3"} text-center hover:bg-red-500 hover:bg-opacity-70`}
                >
                    {floor}
                </button>
            ))}
        </div>
    );
}
