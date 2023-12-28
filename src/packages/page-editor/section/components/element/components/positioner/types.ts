type ElementPositionData = {
    rowStart: number,
    rowEnd: number,
    columnStart: number,
    columnEnd: number,
};

export enum ElementType {
    SHAPE = 'SHAPE',
}

export enum ShapeType {
    SQUARE = 'SQUARE',
}

export type ElementData = {
    type: ShapeType;
    position: ElementPositionData;
}

type PositionerState = Map<string, ElementData>;

type PositionerMethods = {
    addShape: (id: string) => void;
    updateColumnStart: (id: string, columnStart: number) => void;
    updateColumnEnd: (id: string, columnEnd: number) => void;
    updateRowStart: (id: string, rowStart: number) => void;
    updateRowEnd: (id: string, rowEnd: number) => void;
};

export type PositionerContext = {
    state: PositionerState;
    methods: PositionerMethods;
};
