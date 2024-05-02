import { useState } from "react";
import Building from "./components/Building";
import ConfigPanel from "./components/ConfigPanel";

export default function App() {
    const [floorNumber, setFloorNumber] = useState(5);
    const [elevatorNumber, setElevatorNumber] = useState(5);

    const handleFloorNumberChange = (newFloorNumber: number) =>
        setFloorNumber(newFloorNumber);
    const handleElevatorNumberChange = (newElevatorNumber: number) =>
        setElevatorNumber(newElevatorNumber);
    return (
        <div className="h-dvh">
            {
                // <h1 className="mx-auto my-4 text-red-500 text-center text-3xl">
                //     Hello elevators!
                // </h1>
            }
            <Building
                floorNumber={floorNumber}
                elevatorNumber={elevatorNumber}
            />
            <ConfigPanel
                floorNumber={floorNumber}
                elevatorNumber={elevatorNumber}
                onFloorNumberChange={handleFloorNumberChange}
                onElevatorNumberChange={handleElevatorNumberChange}
            />
        </div>
    );
}
