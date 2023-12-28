import {makeAutoObservable} from 'mobx';
import {GRID_CELL_HEIGHT, EDGE_MARGIN, EDGE_COLUMNS_COUNT} from '../ui/Grid/constants';

export class Grid {
    public clientWidth = document.documentElement.clientWidth;
    private restEdgePartWidth = (this.clientWidth - this.gridWidth) / 2;;

    constructor(
        private rows: number = 10,
        private columns: number = 24,

        private rowGap: number = 10,
        private columnGap: number = 10,

        private maxRowsCount: number = 10,

        private gridCellHeight: number = GRID_CELL_HEIGHT,
    ) {
        makeAutoObservable(this);

        window.addEventListener('resize', () => {
            this.clientWidth = document.documentElement.clientWidth;
            this.restEdgePartWidth = (this.clientWidth - this.gridWidth) / 2;
        });
    }

    get maxWidth() {
        return this.clientWidth - EDGE_MARGIN;
    }

    get cellWidth() {
        return (this.maxWidth - ((this.columns - 1) * this.columnGap)) / this.columns;
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

    getConfig() {
        return {
            rows: this.rows,
            columns: this.columns,

            rowGap: this.rowGap,
            columnGap: this.columnGap,

            maxRowsCount: this.maxRowsCount,

            gridCellHeight: GRID_CELL_HEIGHT,
        }
    }
}
