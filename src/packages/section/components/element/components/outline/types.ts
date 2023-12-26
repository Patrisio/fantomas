export type OutlinePositionData = {
    rowStart: number,
    rowEnd: number,
    columnStart: number,
    columnEnd: number,
};

export type OutlineData = {
    position: OutlinePositionData;
    isVisible: boolean;
    width: number;
    height: number;
};;

type OutlineState = Map<string, OutlineData>;
type OutlineMethods = {
    addOutlineById: (id: string, outlinePositionData: OutlinePositionData, width: number, height: number) => void;
    updateColumnStart: (id: string, columnStart: number) => void;
    updateColumnEnd: (id: string, columnEnd: number) => void;
    updateRowStart: (id: string, rowStart: number) => void;
    updateRowEnd: (id: string, rowEnd: number) => void;
    showOutline: (id: string) => void;
    hideOutline: (id: string) => void;
};
type OutlineQueries = {
    getOutlineGridArea: (elementId: string) => string;
};

export type OutlineContext = {
    state: OutlineState;
    methods: OutlineMethods;
    queries: OutlineQueries;
};
