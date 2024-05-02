import { useState } from "react";
import { Direction, ElevatorStateMap } from "../types";
import { sleep } from "../utils";

type useElevatorDispatcherReturnValues = [
    ElevatorStateMap,
    (floor: number, direction: Direction) => void,
    (elevatorId: string, targetFloor: number) => Promise<void>,
];

export default function useElevatorDispatcher(
    elevatorNumber: number,
): useElevatorDispatcherReturnValues {
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

    const findClosestGoodElevator = (targetFloor: number) => {
        let closestElevatorId: string = Object.keys(elevatorStates)[0];
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

    const dispatchElevator = (floor: number, direction: Direction) => {
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

    return [elevatorStates, dispatchElevator, moveElevator];
}
