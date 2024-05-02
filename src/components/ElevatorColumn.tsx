type ElevatorColumnProps = {
    id: string;
    height: string;
    elevatorPosition: number;
    hasFloorPicker: boolean;
    floorNumber: number;
    onFloorPick: (elevatorId: string, floor: number) => Promise<void>;
};

export default function ElevatorColumn(props: ElevatorColumnProps) {
    const handleFloorPick = (elevatorId: string) => (floor: number) =>
        props.onFloorPick(elevatorId, floor);
    return (
        <div
            className="relative w-32 border-2 border-black"
            style={{ height: props.height }}
        >
            <Elevator
                floor={props.elevatorPosition}
                hasFloorPicker={props.hasFloorPicker}
                floorNumber={props.floorNumber}
                onFloorPick={handleFloorPick(props.id)}
            />
        </div>
    );
}

type ElevatorProps = {
    floor: number;
    hasFloorPicker: boolean;
    floorNumber: number;
    onFloorPick: (floor: number) => Promise<void>;
};

function Elevator(props: ElevatorProps) {
    const calculateFloorPosition = (floor: number) => `${8 * floor}rem`;
    return (
        <div
            className="absolute w-full h-32 border-y-2 border-black"
            style={{ bottom: calculateFloorPosition(props.floor) }}
        >
            {props.hasFloorPicker && (
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
        <div className="h-full flex justify-center align-middle flex-wrap">
            {floorNumbers.map((floor) => (
                <button
                    key={floor}
                    onClick={() => props.onFloorPick(floor)}
                    className="flex-1 px-6 text-center hover:bg-red-500 hover:bg-opacity-70"
                >
                    {floor}
                </button>
            ))}
        </div>
    );
}
