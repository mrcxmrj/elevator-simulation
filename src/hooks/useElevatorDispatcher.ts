import { useEffect, useState } from "react";
import { Direction, ElevatorStateMap } from "../types";
import { sleep } from "../utils";

type useElevatorDispatcherReturnValues = [
    ElevatorStateMap,
    (floor: number, direction: Direction) => Promise<void>,
    (elevatorId: string, targetFloor: number) => Promise<void>,
];

export default function useElevatorDispatcher(
    elevatorNumber: number,
    floorNumber: number,
): useElevatorDispatcherReturnValues {
    const [elevatorStates, setElevatorStates] = useState<ElevatorStateMap>(
        () => {
            let defaultStates: ElevatorStateMap = {};
            for (let i = 0; i < elevatorNumber; i++) {
                defaultStates[i] = {
                    floor: 0,
                    direction: Direction.Idle,
                };
            }
            return defaultStates;
        },
    );

    useEffect(() => {
        let updatedStates: ElevatorStateMap = {};
        for (let i = 0; i < elevatorNumber; i++) {
            if (elevatorStates[i] && elevatorStates[i].floor < floorNumber) {
                updatedStates[i] = elevatorStates[i];
                continue;
            }
            updatedStates[i] = {
                floor: 0,
                direction: Direction.Idle,
            };
        }
        setElevatorStates(updatedStates);
    }, [elevatorNumber, floorNumber]);

    const findClosestElevator = (
        targetFloor: number,
        elevators: ElevatorStateMap,
    ) => {
        let closestElevatorId: string = Object.keys(elevators)[0];
        let minDistance = Infinity;
        for (const [elevatorId, elevatorState] of Object.entries(elevators)) {
            const distance = Math.abs(elevatorState.floor - targetFloor);
            if (distance < minDistance) {
                minDistance = distance;
                closestElevatorId = elevatorId;
            }
        }
        return closestElevatorId;
    };

    const dispatchElevator = async (floor: number) => {
        const closestElevatorId = findClosestElevator(floor, elevatorStates);
        await moveElevator(closestElevatorId, floor);
    };

    const moveElevator = async (elevatorId: string, targetFloor: number) => {
        let currentFloor = elevatorStates[elevatorId].floor;
        const direction =
            currentFloor < targetFloor ? Direction.Up : Direction.Down;
        while (currentFloor !== targetFloor) {
            currentFloor += direction;
            await sleep(200);
            setElevatorStates({
                ...elevatorStates,
                [elevatorId]: {
                    floor: currentFloor,
                    direction: direction,
                },
            } as ElevatorStateMap);
        }
        setElevatorStates({
            ...elevatorStates,
            [elevatorId]: {
                floor: currentFloor,
                direction: Direction.Idle,
            },
        } as ElevatorStateMap);
    };

    return [elevatorStates, dispatchElevator, moveElevator];
}
