import {DragModel} from './models/DragModel';
import {ResizeModel} from './models/ResizeModel';
import {ElementVM} from './components/element';
import {GridVM} from './components/grid';

import {makeAutoObservable} from 'mobx';
import {v4 as uuid} from 'uuid';

export class Section {
    public id = uuid();
    private elements = new Map();
    private gridViewModel;
    public dragModel;
    public resizeModel;

    constructor(
        private rows?: number,
        private columns?: number,

        private rowGap?: number,
        private columnGap?: number,

        private maxRowsCount?: number,

        private gridCellHeight?: number,
    ) {
        makeAutoObservable(this);

        this.gridViewModel = new GridVM(
            this.rows,
            this.columns,
            this.rowGap,
            this.columnGap,
            this.maxRowsCount,
            this.gridCellHeight,
        );

        this.dragModel = new DragModel(
            this.gridViewModel,
        );

        this.resizeModel = new ResizeModel(
            this.gridViewModel
        );
    }

    addElement(elementData: ElementData) {
        const elementUnitViewModel = new ElementVM(
            this.gridViewModel,
            elementData.width,
            elementData.height,
            elementData.minWidth,
            elementData.minHeight,
            elementData.shapeType,
            elementData.initialData,
        );
        this.elements.set(elementUnitViewModel.id, elementUnitViewModel);
    }

    getConfig() {
        const elements = [];
        this.elements.forEach((elementVM) => {
            const elementConfig = elementVM.getConfig();
            elements.push(elementConfig);
        });

        const grid = this.gridViewModel.getConfig();
        
        return {
            elements,
            grid,
        };
    }

    get gridColumnsCount() {
        return this.gridViewModel.columns;
    }

    get elementList() {
        return [...this.elements.values()];
    }

    get gridVM() {
        return this.gridViewModel;
    }
}
