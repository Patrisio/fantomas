import type {OutlinePositionData} from './types';
import {makeAutoObservable} from 'mobx';

export class OutlineUnitViewModel {
    isVisible = false;

    constructor(
        private position: OutlinePositionData,
        private width: number,
        private height: number,
        private gridViewModel: any,
    ) {
        makeAutoObservable(this);
    }

    updateColumnStart(columnStart: number) {
        this.position.columnStart = columnStart;
    }

    updateColumnEnd(columnEnd: number) {
        this.position.columnEnd = columnEnd;
    }

    updateRowStart(rowStart: number) {
        this.position.rowStart = rowStart;
    }

    updateRowEnd(rowEnd: number) {
        this.position.rowEnd = rowEnd;
    }

    showOutline() {
        this.isVisible = true;
    }

    hideOutline() {
        this.isVisible = false;
    }

    get gridArea() {
        return `${this.position.rowStart} / ${this.position.columnStart} / ${this.position.rowEnd} / ${this.position.columnEnd}`;
    }

    get outlineWidth() {
        return this.gridViewModel.getElementWidth(this.position.columnStart, this.position.columnEnd);
    }

    get outlineHeight() {
        return this.gridViewModel.getElementHeight(this.position.rowStart, this.position.rowEnd);
    }
}
