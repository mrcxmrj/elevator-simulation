import { useState } from "react";
import ElevatorColumn from "./ElevatorColumn";
import ControlColumn from "./ControlColumn";
import { Direction } from "../types";
import { sleep } from "../utils";

type ElevatorPositionsMap = {
    [id: number]: number;
};
export default function Building() {
    const [floorNumber] = useState(5);
    const [elevatorNumber] = useState(5);

    const [elevatorPositions, setElevatorPositions] =
        useState<ElevatorPositionsMap>(() => {
            let defaultPositions: ElevatorPositionsMap = {};
            for (let i = 0; i < elevatorNumber; i++) {
                defaultPositions[i] = 0;
            }
            return defaultPositions;
        });

    const calculateColumnHeight = (floorNumber: number) =>
        `${floorNumber * 8}rem`;

    const handleElevatorOrder = (floor: number, direction: Direction) => {
        console.log(floor, direction);
        moveElevator(0, floor);
    };

    const moveElevator = async (elevatorId: number, targetFloor: number) => {
        let currentFloor = elevatorPositions[elevatorId];
        const direction = currentFloor < targetFloor ? 1 : -1;
        while (currentFloor !== targetFloor) {
            currentFloor += direction;
            await sleep(500);
            setElevatorPositions({
                ...elevatorPositions,
                [elevatorId]: currentFloor,
            } as ElevatorPositionsMap);
        }
    };

    return (
        <div className="flex justify-evenly">
            <ControlColumn
                floorNumber={floorNumber}
                height={calculateColumnHeight(floorNumber)}
                onElevatorOrder={handleElevatorOrder}
            />
            {Object.entries(elevatorPositions).map(([id, position]) => (
                <ElevatorColumn
                    key={id}
                    elevatorPosition={position}
                    height={calculateColumnHeight(floorNumber)}
                />
            ))}
        </div>
    );
}
