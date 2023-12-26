import {ElementType, ShapeType} from './components/positioner/types';
import {makeAutoObservable} from 'mobx';
import {ElementConfig} from './types';
import {SharedState} from './SharedState';
import {PositionerUnitViewModel} from './components/positioner/PositionerUnitViewModel';
import {OutlineUnitViewModel} from './components/outline/OutlineUnitViewModel';

export class ElementUnitViewModel {
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
        private shapeType: ShapeType,
        private initialData: any,
    ) {
        makeAutoObservable(this);

        this.elementConfig = {
            [ElementType.SHAPE]: {
                minWidth: this.minWidth,
                minHeight: this.minHeight,
                width: this.width,
                height: this.height,
            },
        };
        this.positionerUnitViewModel = new PositionerUnitViewModel(this.shapeType, {...this.initialData});
        this.outlineUnitViewModel = new OutlineUnitViewModel(
            {...this.initialData},
            this.width,
            this.height,
            this.gridViewModel,
        );
    }

    private getElementConfigByShapeType(elementType: ElementType) {
        return this.elementConfig[elementType];
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