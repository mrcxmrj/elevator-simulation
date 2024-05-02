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
            <ConfigPanel
                floorNumber={floorNumber}
                elevatorNumber={elevatorNumber}
                onFloorNumberChange={handleFloorNumberChange}
                onElevatorNumberChange={handleElevatorNumberChange}
            />
            <Building
                floorNumber={floorNumber}
                elevatorNumber={elevatorNumber}
            />
        </div>
    );
}
