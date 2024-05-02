import { Direction, ElevatorState } from "../types";

type ElevatorColumnProps = {
    id: string;
    height: string;
    elevatorState: ElevatorState;
    floorNumber: number;
    onFloorPick: (elevatorId: string, floor: number) => Promise<void>;
};

export default function ElevatorColumn(props: ElevatorColumnProps) {
    const handleFloorPick = (elevatorId: string) => async (floor: number) =>
        await props.onFloorPick(elevatorId, floor);
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
    const formatText = (floorNumber: number) => {
        if (floorNumber === 16) return "text-xs";
        if (floorNumber >= 13) return "text-sm";
    };
    return (
        <div className="h-full flex justify-center items-center flex-wrap overflow-x-hidden p-1">
            {floorNumbers.map((floor) => (
                <button
                    key={floor}
                    onClick={() => props.onFloorPick(floor)}
                    className={`flex-1 flex justify-center ${props.floorNumber <= 8 ? "px-4" : "px-1"} text-center `}
                >
                    <p
                        className={`border border-black rounded-full w-6 ${formatText(props.floorNumber)} hover:bg-red-500 hover:bg-opacity-75`}
                    >
                        {floor}
                    </p>
                </button>
            ))}
        </div>
    );
}
