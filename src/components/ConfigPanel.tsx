type ConfigPanelProps = {
    floorNumber: number;
    elevatorNumber: number;
    onFloorNumberChange: (newFloorNumber: number) => void;
    onElevatorNumberChange: (newElevatorNumber: number) => void;
};

export default function ConfigPanel(props: ConfigPanelProps) {
    return (
        <div className="flex justify-center gap-4 my-4 ">
            <NumberPicker
                label="floors"
                value={props.floorNumber}
                onInputChange={props.onFloorNumberChange}
            />
            <NumberPicker
                label="elevators"
                value={props.elevatorNumber}
                onInputChange={props.onElevatorNumberChange}
            />
        </div>
    );
}

type NumberPickerProps = {
    label: string;
    value: number;
    onInputChange: (newValue: number) => void;
};

function NumberPicker(props: NumberPickerProps) {
    const { label, value, onInputChange } = props;

    const decrement = () => {
        if (value > 0) {
            onInputChange(value - 1);
        }
    };

    const increment = () => {
        if (value < 16) {
            onInputChange(value + 1);
        }
    };

    return (
        <div className="">
            {
                // <div className="w-full text-center">{props.label}</div>
            }
            <div className="flex items-center">
                <button
                    onClick={decrement}
                    className="px-3 py-1 border-2 border-black rounded-l hover:bg-red-500"
                >
                    -
                </button>
                <p className="px-3 py-1 text-center border-y-2 border-black">
                    {value} {label}
                </p>
                <button
                    onClick={increment}
                    className="px-3 py-1 border-2 border-black rounded-r hover:bg-red-500"
                >
                    +
                </button>
            </div>
        </div>
    );
}
