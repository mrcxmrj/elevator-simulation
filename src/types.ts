export enum Direction {
    Up = 1,
    Down = -1,
    Idle = 0,
}

export type ElevatorState = {
    floor: number;
    hasFloorPicker: boolean;
    direction: Direction;
};

export type ElevatorStateMap = {
    [id: string]: ElevatorState;
};
