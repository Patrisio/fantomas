export class Grid {
    private rows = 0;
    private columns = 0;
    private grid: number[][] = [];

    constructor(rowsNumber: number, columnsNumber: number) {
        this.rows = rowsNumber;
        this.columns = columnsNumber;

        this.buildGrid();
    }

    // private createGridCell() {
    //     const gridCell = document.createElement('div');

    //     return gridCell;
    // }

    private addRows(rowsNumber: number) {
        for (let i = 0; i < rowsNumber; i++) {
            this.grid[i] = [];
            this.addColumns(this.columns, i);
        }
    }

    private addColumns(columnsNumber: number, rowIndex: number) {
        for (let i = 0; i < columnsNumber; i++) {
            const row = this.grid[rowIndex];
            row[i] = 1;
        }
    }

    buildGrid() {
        this.addRows(this.rows);
    }

    get model() {
        return this.grid;
    }
}