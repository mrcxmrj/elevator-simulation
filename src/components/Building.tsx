import { useState } from "react";
import ElevatorColumn from "./ElevatorColumn";
import ControlColumn from "./ControlColumn";
import { Direction } from "../types";
import { sleep } from "../utils";

type ElevatorState = {
    floor: number;
    hasFloorPicker: boolean;
};
type ElevatorStateMap = {
    [id: string]: ElevatorState;
};
export default function Building() {
    const [floorNumber] = useState(5);
    const [elevatorNumber] = useState(5);

    const [elevatorStates, setElevatorStates] = useState<ElevatorStateMap>(
        () => {
            let defaultStates: ElevatorStateMap = {};
            for (let i = 0; i < elevatorNumber; i++) {
                defaultStates[i] = { floor: 0, hasFloorPicker: false };
            }
            return defaultStates;
        },
    );
    console.log(elevatorStates);

    const calculateColumnHeight = (floorNumber: number) =>
        `${floorNumber * 8}rem`;

    const handleElevatorOrder = (floor: number, direction: Direction) => {
        console.log(floor, direction);
        moveElevator("0", floor);
    };

    const moveElevator = async (elevatorId: string, targetFloor: number) => {
        let currentFloor = elevatorStates[elevatorId].floor;
        console.log(currentFloor);
        const direction = currentFloor < targetFloor ? 1 : -1;
        while (currentFloor !== targetFloor) {
            currentFloor += direction;
            await sleep(500);
            setElevatorStates({
                ...elevatorStates,
                [elevatorId]: { floor: currentFloor, hasFloorPicker: false },
            } as ElevatorStateMap);
        }
        setElevatorStates({
            ...elevatorStates,
            [elevatorId]: { floor: currentFloor, hasFloorPicker: true },
        } as ElevatorStateMap);
    };

    return (
        <div className="flex justify-evenly">
            <ControlColumn
                floorNumber={floorNumber}
                height={calculateColumnHeight(floorNumber)}
                onElevatorOrder={handleElevatorOrder}
            />
            {Object.entries(elevatorStates).map(
                ([id, { floor, hasFloorPicker }]) => (
                    <ElevatorColumn
                        key={id}
                        id={id}
                        elevatorPosition={floor}
                        height={calculateColumnHeight(floorNumber)}
                        hasFloorPicker={hasFloorPicker}
                        onFloorPick={moveElevator}
                        floorNumber={floorNumber}
                    />
                ),
            )}
        </div>
    );
}
