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
                label="Number of floors"
                value={props.floorNumber}
                onInputChange={props.onFloorNumberChange}
            />
            <NumberPicker
                label="Number of elevators"
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
    const { value, onInputChange } = props;

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
        <div className="flex items-center">
            <label className="mr-2">{props.label}</label>
            <button
                onClick={decrement}
                className="px-3 py-1 bg-gray-300 rounded-l"
            >
                -
            </button>
            <p className="px-3 py-1 text-center border border-gray-300 w-16">
                {value}
            </p>
            <button
                onClick={increment}
                className="px-3 py-1 bg-gray-300 rounded-r"
            >
                +
            </button>
        </div>
    );
}
