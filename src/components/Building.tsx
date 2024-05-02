import { useState } from "react";
import ElevatorColumn from "./ElevatorColumn";
import ControlColumn from "./ControlColumn";
import useElevatorDispatcher from "../hooks/useElevatorDispatcher";

export default function Building() {
    const [floorNumber] = useState(5);
    const [elevatorNumber] = useState(5);
    const [elevatorStates, dispatchElevator, moveElevator] =
        useElevatorDispatcher(elevatorNumber);

    const calculateColumnHeight = (floorNumber: number) =>
        `${floorNumber * 8}rem`;

    return (
        <div className="flex justify-evenly">
            <ControlColumn
                floorNumber={floorNumber}
                height={calculateColumnHeight(floorNumber)}
                onElevatorOrder={dispatchElevator}
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
