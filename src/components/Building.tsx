import { useState } from "react";
import Shaft from "./Shaft";

export default function Building() {
    const [floorNumber, setFloorNumber] = useState(5);
    const [shaftNumber, setShaftNumber] = useState(5);

    return (
        <div className="flex justify-evenly">
            {Array(shaftNumber)
                .fill("")
                .map((_, index) => (
                    <Shaft key={index} floorNumber={floorNumber} />
                ))}
        </div>
    );
}
