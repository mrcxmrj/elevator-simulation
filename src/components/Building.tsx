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
        <div className="flex mt-8">
            <div className="ml-8">
                <ControlColumn
                    floorNumber={floorNumber}
                    height={calculateColumnHeight(floorNumber)}
                    onElevatorOrder={dispatchElevator}
                />
            </div>
            <div className="w-full flex justify-evenly">
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
        </div>
    );
}
