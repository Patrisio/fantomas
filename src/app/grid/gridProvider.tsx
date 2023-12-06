import {useMemo, useState, useEffect} from 'react';
import Context from './context';
import { GRID_CELL_HEIGHT, GRID_CELL_BORDER, MAX_WIDTH } from './components/Grid/constants';

function GridProvider({children}) {
    const [rows, setRows] = useState(10);
    const [columns, setColumns] = useState(24);

    const [rowGap, setRowGap] = useState(10);
    const [columnGap, setColumnGap] = useState(10);

    const [maxRowsCount, setMaxRowsCount] = useState(10);

    const [restEdgePartWidth, setRestEdgePartWidth] = useState(0);

    const [clientWidth, setClientWidth] = useState(0);

    const cellWidth = (MAX_WIDTH - ((columns - 1) * columnGap)) / columns;

    const gridWidth = useMemo(() => {
        const gridWidth = (cellWidth * columns) + columnGap * (columns - 1);

        return gridWidth;
    }, [cellWidth, columns, columnGap]);

    const gridTotalCells = rows * columns;
    const gridHeight = (rows * GRID_CELL_HEIGHT) + (rowGap * (rows - 1));

    useEffect(() => {
        const clientWidth = document.documentElement.clientWidth;
        const restEdgePartWidth = (clientWidth - gridWidth) / 2;

        setRestEdgePartWidth(restEdgePartWidth);
        setClientWidth(clientWidth);
    }, [gridWidth]);

    const gridStore = useMemo(() => {
        return {
            columns,
            rows,
            rowGap,
            columnGap,
            setColumns,
            setRows,
            setRowGap,
            setColumnGap,
            gridCellHeight: GRID_CELL_HEIGHT,
            cellWidth,
            maxRowsCount,
            setMaxRowsCount,
            gridWidth,
            restEdgePartWidth,
            clientWidth,
            gridTotalCells,
            gridHeight,
        };
    }, [cellWidth, columnGap, columns, rowGap, rows, setRows, maxRowsCount, setMaxRowsCount, gridWidth, restEdgePartWidth, clientWidth, gridTotalCells, gridHeight]);

    return (<Context.Provider value={gridStore}>{children}</Context.Provider>);
}

export default GridProvider;
