import Elevator from "./Elevator";

type ShaftProps = {
    floorNumber: number;
};
export default function Shaft(props: ShaftProps) {
    const calculateShaftHeight = (floorNumber: number) =>
        `${floorNumber * 8}rem`;

    return (
        <div
            className="relative w-32 border-2 border-black"
            style={{ height: calculateShaftHeight(props.floorNumber) }}
        >
            <Elevator floor={2} />
        </div>
    );
}
