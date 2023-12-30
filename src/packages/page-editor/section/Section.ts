import {DragModel} from './models/DragModel';
import {ResizeModel} from './models/ResizeModel';

import {makeAutoObservable} from 'mobx';
import {v4 as uuid} from 'uuid';

export class Section {
    public id = uuid();
    private elements = new Map();
    public dragModel;
    public resizeModel;

    constructor(
        private gridViewModel: any,
    ) {
        makeAutoObservable(this);

        this.dragModel = new DragModel(
            this.gridViewModel,
        );

        this.resizeModel = new ResizeModel(
            this.gridViewModel
        );
    }

    addElement(elementUnitViewModel: any) {
        console.log(elementUnitViewModel, '__elementUnitViewModel__');
        // const elementUnitViewModel = new ElementVM(
        //     this.gridViewModel,
        //     elementData.width,
        //     elementData.height,
        //     elementData.minWidth,
        //     elementData.minHeight,
        //     elementData.position,
        // );
        this.elements.set(elementUnitViewModel.id, elementUnitViewModel);
    }

    getConfig() {
        const elements = [];
        console.log(this.elements, '__this.elements_____');
        this.elements.forEach((elementVM) => {
            console.log(elementVM, '__CCCCC__');
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
