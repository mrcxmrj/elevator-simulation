import { useState } from "react";
import ElevatorColumn from "./ElevatorColumn";
import ControlColumn from "./ControlColumn";

export default function Building() {
    const [floorNumber, setFloorNumber] = useState(5);
    const [shaftNumber, setShaftNumber] = useState(5);

    const calculateColumnHeight = (floorNumber: number) =>
        `${floorNumber * 8}rem`;

    return (
        <div className="flex justify-evenly">
            <ControlColumn
                floorNumber={floorNumber}
                height={calculateColumnHeight(floorNumber)}
            />
            {Array(shaftNumber)
                .fill("")
                .map((_, index) => (
                    <ElevatorColumn
                        key={index}
                        height={calculateColumnHeight(floorNumber)}
                    />
                ))}
        </div>
    );
}
