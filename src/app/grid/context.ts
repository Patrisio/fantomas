import {createContext} from 'react';
import {GridContext} from './types';
import { GRID_CELL_HEIGHT, GRID_CELL_BORDER } from './components/Grid/constants';

const noop = () => {};

export default createContext<GridContext>({
    columns: 0,
    rows: 0,
    rowGap: 0,
    columnGap: 0,
    setColumns: noop,
    setRows: noop,
    setRowGap: noop,
    setColumnGap: noop,
    gridCellHeight: GRID_CELL_HEIGHT,
    gridCellBorder: GRID_CELL_BORDER,
    cellWidth: 0,
});
