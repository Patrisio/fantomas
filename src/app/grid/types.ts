import { Dispatch, SetStateAction } from "react";

export type GridContext = {
    rows: number;
    columns: number;
    rowGap: number;
    columnGap: number;
    setRows: Dispatch<SetStateAction<number>>;
    setColumns: Dispatch<SetStateAction<number>>;
    setRowGap: Dispatch<SetStateAction<number>>;
    setColumnGap: Dispatch<SetStateAction<number>>;
    gridCellHeight: number;
    gridCellBorder: number;
    cellWidth: number;
    maxRowsCount: number;
    setMaxRowsCount: Dispatch<SetStateAction<number>>;
};
