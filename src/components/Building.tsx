import { useState } from "react";
import ElevatorColumn from "./ElevatorColumn";
import ControlColumn from "./ControlColumn";
import { Direction } from "../types";
import { sleep } from "../utils";

type ElevatorState = {
    floor: number;
    hasFloorPicker: boolean;
    direction: Direction;
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
                defaultStates[i] = {
                    floor: 0,
                    hasFloorPicker: false,
                    direction: Direction.Idle,
                };
            }
            return defaultStates;
        },
    );

    const calculateColumnHeight = (floorNumber: number) =>
        `${floorNumber * 8}rem`;

    const findClosestGoodElevator = (targetFloor: number) => {
        let closestElevatorId: string = "0"; // always gets assigned
        let minDistance = Infinity;
        for (const [elevatorId, elevatorState] of Object.entries(
            elevatorStates,
        )) {
            const distance = Math.abs(elevatorState.floor - targetFloor);
            if (distance < minDistance) {
                minDistance = distance;
                closestElevatorId = elevatorId;
            }
        }
        return closestElevatorId;
    };

    const handleElevatorOrder = (floor: number, direction: Direction) => {
        // const randomElevatorId: string = Math.floor(
        //     Math.random() * (elevatorNumber - 1),
        // ).toString();
        const closestElevatorId = findClosestGoodElevator(floor);
        moveElevator(closestElevatorId, floor);
    };

    const moveElevator = async (elevatorId: string, targetFloor: number) => {
        let currentFloor = elevatorStates[elevatorId].floor;
        const direction =
            currentFloor < targetFloor ? Direction.Up : Direction.Down;
        while (currentFloor !== targetFloor) {
            currentFloor += direction;
            await sleep(500);
            setElevatorStates({
                ...elevatorStates,
                [elevatorId]: {
                    floor: currentFloor,
                    hasFloorPicker: false,
                    direction: direction,
                },
            } as ElevatorStateMap);
        }
        setElevatorStates({
            ...elevatorStates,
            [elevatorId]: {
                floor: currentFloor,
                hasFloorPicker: true,
                direction,
            },
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
