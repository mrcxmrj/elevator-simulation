import ElevatorColumn from "./ElevatorColumn";
import ControlColumn from "./ControlColumn";
import useElevatorDispatcher from "../hooks/useElevatorDispatcher";

type BuildingProps = {
    floorNumber: number;
    elevatorNumber: number;
};

export default function Building(props: BuildingProps) {
    const { elevatorNumber, floorNumber } = props;
    const [elevatorStates, dispatchElevator, moveElevator] =
        useElevatorDispatcher(elevatorNumber);

    const calculateColumnHeight = (floorNumber: number) =>
        `${floorNumber * 8}rem`;

    return (
        <div className="mt-4 flex justify-evenly">
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
