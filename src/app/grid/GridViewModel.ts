import {makeAutoObservable, autorun} from 'mobx';
import { GRID_CELL_HEIGHT, MAX_WIDTH } from './components/Grid/constants';

class GridViewModel {
    rows = 10;
    columns = 24;

    rowGap = 10;
    columnGap = 10

    maxRowsCount = 10;

    restEdgePartWidth = 0;

    clientWidth = 0;

    gridCellHeight = GRID_CELL_HEIGHT;

    constructor() {
        makeAutoObservable(this);
        autorun(() => {
            const clientWidth = document.documentElement.clientWidth;
            const restEdgePartWidth = (clientWidth - this.gridWidth) / 2;

            this.restEdgePartWidth = restEdgePartWidth;
            this.clientWidth = clientWidth;
        });
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
}

export const gridViewModel = new GridViewModel();
