import { useEffect, useState } from "react";
import { Direction, ElevatorStateMap } from "../types";
import { sleep } from "../utils";

type useElevatorDispatcherReturnValues = [
    ElevatorStateMap,
    (floor: number, direction: Direction) => void,
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

    // NOTE: Currently causes bugs
    //
    // const findAlignedElevators = (
    //     elevators: ElevatorStateMap,
    //     direction: Direction,
    // ): ElevatorStateMap => {
    //     const alignedElevators = Object.entries(elevators).filter(
    //         ([_, elevatorState]: [string, ElevatorState]) =>
    //             elevatorState.direction === direction ||
    //             elevatorState.direction === Direction.Idle,
    //     );
    //
    //     return Object.fromEntries(alignedElevators);
    // };

    const dispatchElevator = (floor: number) => {
        // const potentialElevators =
        //     findAlignedElevators(elevatorStates, direction) || elevatorStates;
        const closestElevatorId = findClosestElevator(floor, elevatorStates);
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
