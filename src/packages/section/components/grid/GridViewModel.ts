import {makeAutoObservable} from 'mobx';
import {GRID_CELL_HEIGHT, MAX_WIDTH} from './ui/Grid/constants';

export const EDGE_COLUMNS_COUNT = 2;

export class GridViewModel {
    rows = 10;
    columns = 24;

    rowGap = 10;
    columnGap = 10;

    maxRowsCount = 10;

    restEdgePartWidth = 0;

    clientWidth = 0;

    gridCellHeight = GRID_CELL_HEIGHT;

    constructor() {
        makeAutoObservable(this);

        const clientWidth = document.documentElement.clientWidth;
        const restEdgePartWidth = (clientWidth - this.gridWidth) / 2;

        this.restEdgePartWidth = restEdgePartWidth;
        this.clientWidth = clientWidth;
    }

    get cellWidth() {
        return (MAX_WIDTH - ((this.columns - 1) * this.columnGap)) / this.columns;
    }

    get gridWidth() {
        const gridWidth = (this.cellWidth * this.columns) + this.columnGap * (this.columns - 1);
        return gridWidth;
    }

    get gridTotalCells() {
        return this.rows * this.columns;
    }

    get gridHeight() {
        return (this.rows * GRID_CELL_HEIGHT) + (this.rowGap * (this.rows - 1));
    }

    incrementRow() {
        this.rows++;
    }

    decrementRow() {
        this.rows--;
    }

    setMaxRowsCount(maxRowsCount: number) {
        this.maxRowsCount = maxRowsCount;
    }

    getElementWidth(columnStart: number, columnEnd: number) {
        if (columnStart === 1 || columnEnd === this.columns + EDGE_COLUMNS_COUNT + 1) {
            const usualCellsCount = columnEnd - columnStart - 1;
            return ((usualCellsCount - 1) * this.columnGap + usualCellsCount * this.cellWidth) + this.restEdgePartWidth;
        }

        const cellsCount = columnEnd - columnStart;

        return (cellsCount - 1) * this.columnGap + cellsCount * this.cellWidth;
    }

    getElementHeight(rowStart: number, rowEnd: number) {
        const cellsCount = rowEnd - rowStart;
        const totalGridCellHeight = this.gridCellHeight;

        return (cellsCount - 1) * this.columnGap + cellsCount * totalGridCellHeight;
    }
}
