import {gridViewModel} from '../grid';
import {ElementType} from '../positioner/types';
import {autorun, makeAutoObservable} from 'mobx';
import {ElementData, ElementConfig} from './types';
import {toJS} from 'mobx';

const EDGE_COLUMNS_COUNT = 2;

class ElementViewModel {
    elements = new Map();
    elementConfig: ElementConfig = {
        [ElementType.SHAPE]: {
            minWidth: 0,
            minHeight: 0,
        },
    };

    constructor() {
        makeAutoObservable(this);
        autorun(() => {
            const newConfig = {
                [ElementType.SHAPE]: {
                    minWidth: gridViewModel.cellWidth,
                    minHeight: gridViewModel.gridCellHeight,
                },
            };

            this.elementConfig = newConfig;
        });
    }
    
    getElementConfigByShapeType(elementType: ElementType) {
        return this.elementConfig[elementType];
    }

    getElementWidth(columnStart: number, columnEnd: number) {
        if (columnStart === 1 || columnEnd === gridViewModel.columns + EDGE_COLUMNS_COUNT + 1) {
            const usualCellsCount = columnEnd - columnStart - 1;
            return ((usualCellsCount - 1) * gridViewModel.columnGap + usualCellsCount * gridViewModel.cellWidth) + gridViewModel.restEdgePartWidth;
        }

        const cellsCount = columnEnd - columnStart;

        return (cellsCount - 1) * gridViewModel.columnGap + cellsCount * gridViewModel.cellWidth;
    }

    getElementHeight(rowStart: number, rowEnd: number) {
        const cellsCount = rowEnd - rowStart;
        const totalGridCellHeight = gridViewModel.gridCellHeight;

        return (cellsCount - 1) * gridViewModel.columnGap + cellsCount * totalGridCellHeight;
    }

    addElementData(id: string, elementData: ElementData) {
        this.elements.set(id, elementData);
    }

    updateElementWidth(id: string, height: number) {
        const foundElementData = this.elements.get(id);

        if (!foundElementData) {
            throw new Error('element не найден');
        }
        
        foundElementData.height = height;

        this.elements.set(id, foundElementData);
    }

    updateElementHeight(id: string, height: number) {
        const foundElementData = this.elements.get(id);

        if (!foundElementData) {
            throw new Error('element не найден');
        }
        
        foundElementData.height = height;

        this.elements.set(id, foundElementData);
    }

    setMinOffsetWidthAndHeight(e) {
        const {minWidth, minHeight} = this.getElementConfigByShapeType(ElementType.SHAPE);
        e.setMin([minWidth, minHeight]);
    }

    getElementById(elementId: string): ElementType {
        return toJS(this.elements.get(elementId));
    }
}

export const elementViewModel = new ElementViewModel();
