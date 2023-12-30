import {ElementConfig} from '../types';
import {SharedState} from '../SharedState';

import {PositionerUnitViewModel} from '../components/positioner/PositionerUnitViewModel';
import {OutlineUnitViewModel} from '../components/outline/OutlineUnitViewModel';
import {ElementType, ShapeType} from '../components/positioner/types';

import {makeObservable, toJS, action} from 'mobx';
import {v4 as uuid} from 'uuid';

export class Element {
    public id = uuid();
    public sharedState = new SharedState();
    public positionerUnitViewModel: any;
    public outlineUnitViewModel: any;
    private elementConfig: ElementConfig;

    constructor(
        private gridViewModel: any,
        private width: number,
        private height: number,
        private minWidth: number,
        private minHeight: number,
        private position: any,
        private type: string,
    ) {
        makeObservable(this, {
            updateElementWidth: action.bound,
            updateElementHeight: action.bound,
        });

        this.elementConfig = {
            [ElementType.SHAPE]: {
                minWidth: this.minWidth,
                minHeight: this.minHeight,
                width: this.width,
                height: this.height,
            },
        };
        this.positionerUnitViewModel = new PositionerUnitViewModel({...this.position});
        this.outlineUnitViewModel = new OutlineUnitViewModel(
            {...this.position},
            this.width,
            this.height,
            this.gridViewModel,
        );
    }

    private getElementConfigByShapeType(elementType: ElementType) {
        return this.elementConfig[elementType];
    }

    protected getConfig() {
        return {
            id: this.id,
            width: this.width,
            height: this.height,
            minWidth: this.minWidth,
            minHeight: this.minHeight,
            position: toJS(this.positionerUnitViewModel.position),
            type: this.type,
        };
    }

    setMinOffsetWidthAndHeight(e) {
        const {minWidth, minHeight} = this.getElementConfigByShapeType(ElementType.SHAPE);
        e.setMin([minWidth, minHeight]);
    }

    updateElementWidth(width: number) {
        this.width = width;
    }

    updateElementHeight(height: number) {
        this.height = height;
    }
}
