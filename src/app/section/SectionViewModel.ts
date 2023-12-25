import {DragModel} from './DragModel';
import {ResizeModel} from './ResizeModel';
import {ElementUnitViewModel} from '../element';
import {GridViewModel} from '../grid';
import {makeAutoObservable} from 'mobx';

export class SectionViewModel {
    private elements = new Map();
    private gridViewModel;
    public dragModel;
    public resizeModel;

    constructor() {
        makeAutoObservable(this);

        this.gridViewModel = new GridViewModel();

        this.dragModel = new DragModel(
            this.gridViewModel,
        );

        this.resizeModel = new ResizeModel(
            this.gridViewModel
        );
    }

    addElement(id: string, elementData: ElementData) {
        const elementUnitViewModel = new ElementUnitViewModel(
            this.gridViewModel,
            elementData.width,
            elementData.height,
            elementData.minWidth,
            elementData.minHeight,
            elementData.shapeType,
            elementData.initialData,
        );
        this.elements.set(id, elementUnitViewModel);
    }

    getElementById(id: string): ElementType {
        const elementUnit = this.elements.get(id);

        if (!elementUnit) throw new Error('elementUnit не найден');

        return elementUnit;
    }

    get gridColumnsCount() {
        return this.gridViewModel.columns;
    }

    get elementEntries() {
        return [...this.elements.entries()];
    }

    get gridVM() {
        return this.gridViewModel;
    }
}
