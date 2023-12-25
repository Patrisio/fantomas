import {DIRECTION_NAME, DIRECTION} from '../../WebBuilder/blocks/baseBlock/constants';

export class ResizeModel {
    constructor(
        private gridViewModel,
    ) {}

    handleDirectionForResize(direction: [number, number], options) {
        const {
            widthDiff,
            widthDistance,
            heightDiff,
            halfHeightDistance,
            isIntoLeftEdgeZone,
            isIntoRightEdgeZone,
            gridViewModel,
            outlineUnitViewModel,
        } = options;
        const formattedDirection = JSON.stringify(direction);
        const directionName = DIRECTION[formattedDirection];
        let halfWidthDistance = widthDistance / 2;
        const isIntoEdgeZone = isIntoLeftEdgeZone || isIntoRightEdgeZone;

        function handleLeft() {
            const isPullToTheLeftInLeftEdgeZone = isIntoEdgeZone && isIntoLeftEdgeZone;
            if (isPullToTheLeftInLeftEdgeZone) {
                halfWidthDistance = gridViewModel.restEdgePartWidth / 2;
            }

            const isPullToTheLeftInRightEdgeZone = isIntoEdgeZone && isIntoRightEdgeZone;
            if (isPullToTheLeftInRightEdgeZone) {
                halfWidthDistance = widthDistance / 2;
            }

            if (widthDiff > halfWidthDistance) {
                outlineUnitViewModel.updateColumnStart(outlineUnitViewModel.position.columnStart - 1);
            }
    
            if (widthDiff < -halfWidthDistance) {
                outlineUnitViewModel.updateColumnStart(outlineUnitViewModel.position.columnStart + 1);
            }
        }

        function handleRight() {
            const isPullToTheRightInLeftEdgeZone = isIntoEdgeZone && isIntoLeftEdgeZone;
            if (isPullToTheRightInLeftEdgeZone) {
                halfWidthDistance = widthDistance / 2;
            }

            const isPullToTheRightInRightEdgeZone = isIntoEdgeZone && isIntoRightEdgeZone;
            if (isPullToTheRightInRightEdgeZone) {
                halfWidthDistance = gridViewModel.restEdgePartWidth / 2;
            }

            if (widthDiff > halfWidthDistance) {
                outlineUnitViewModel.updateColumnEnd(outlineUnitViewModel.position.columnEnd + 1);
            }
    
            if (widthDiff < -halfWidthDistance) {
                outlineUnitViewModel.updateColumnEnd(outlineUnitViewModel.position.columnEnd - 1);
            }
        }

        function handleBottom() {
            if (heightDiff > halfHeightDistance) {
                outlineUnitViewModel.updateRowEnd(outlineUnitViewModel.position.rowEnd + 1);

                if (outlineUnitViewModel.position.rowEnd > gridViewModel.rows) {
                    gridViewModel.incrementRow();
                }
            }
    
            if (heightDiff < -halfHeightDistance) {
                outlineUnitViewModel.updateRowEnd(outlineUnitViewModel.position.rowEnd - 1);

                if (outlineUnitViewModel.position.rowEnd - 1 === gridViewModel.rows && gridViewModel.rows > gridViewModel.maxRowsCount) {
                    gridViewModel.decrementRow();
                }
            }
        }

        function handleTop() {
            if (heightDiff > halfHeightDistance) {
                outlineUnitViewModel.updateRowStart(outlineUnitViewModel.position.rowStart - 1);
            }
    
            if (heightDiff < -halfHeightDistance) {
                outlineUnitViewModel.updateRowStart(outlineUnitViewModel.position.rowStart + 1);
            }
        }

        switch (directionName) {
            case DIRECTION_NAME.LEFT:
                handleLeft();
                break;
            case DIRECTION_NAME.RIGHT:
                handleRight()
                break;
            case DIRECTION_NAME.BOTTOM:
                handleBottom();
                break;
            case DIRECTION_NAME.TOP:
                handleTop();
                break;
            case DIRECTION_NAME.TOP_RIGHT:
                handleTop();
                handleRight();
                break;
            case DIRECTION_NAME.BOTTOM_RIGHT:
                handleBottom();
                handleRight();
                break;
            case DIRECTION_NAME.TOP_LEFT:
                handleTop();
                handleLeft();
                break;
            case DIRECTION_NAME.BOTTOM_LEFT:
                handleBottom();
                handleLeft();
                break;
        }
    }

    onResizeStartHandler(elementUnitViewModel) {
        const outlineUnitViewModel = elementUnitViewModel.outlineUnitViewModel;

        return (e) => {
            elementUnitViewModel.setMinOffsetWidthAndHeight(e);
            outlineUnitViewModel.showOutline();
        };
    }

    onResizeEndHandler(elementUnitViewModel, moveableData) {
        const positionerUnitViewModel = elementUnitViewModel.positionerUnitViewModel;
        const outlineUnitViewModel = elementUnitViewModel.outlineUnitViewModel;

        return (e) => {
            outlineUnitViewModel.hideOutline();
    
            const elementWidth = elementUnitViewModel.outlineUnitViewModel.outlineWidth;
            const elementHeight = elementUnitViewModel.outlineUnitViewModel.outlineHeight;
    
            elementUnitViewModel.updateElementWidth(elementWidth);
            elementUnitViewModel.updateElementHeight(elementHeight);
    
            positionerUnitViewModel.updateColumnStart(outlineUnitViewModel.position.columnStart);
            positionerUnitViewModel.updateColumnEnd(outlineUnitViewModel.position.columnEnd);
            positionerUnitViewModel.updateRowStart(outlineUnitViewModel.position.rowStart);
            positionerUnitViewModel.updateRowEnd(outlineUnitViewModel.position.rowEnd);
    
            this.gridViewModel.setMaxRowsCount(this.gridViewModel.rows);
    
            e.target.style.width = '';
            e.target.style.height = '';
            e.target.style.transform = 'none';
    
            moveableData.forceUpdateControlBox(e);
        };
    }

    onResizeHandler(elementUnitViewModel) {
        return (e) => {
            const leftDistanceFromLeftEdge = e.target.getBoundingClientRect().left ?? 0
            const rightDistanceFromRightEdge = document.documentElement.clientWidth - (e.target.getBoundingClientRect().right ?? 0);
            const isIntoLeftEdgeZone = leftDistanceFromLeftEdge < this.gridViewModel.restEdgePartWidth;
            const isIntoRightEdgeZone = rightDistanceFromRightEdge < this.gridViewModel.restEdgePartWidth;
    
            elementUnitViewModel.sharedState.isIntoEdgeZone = isIntoLeftEdgeZone || isIntoRightEdgeZone;
    
            const widthDistance = this.gridViewModel.columnGap + this.gridViewModel.cellWidth;
            const widthDiff = e.offsetWidth - elementUnitViewModel.outlineUnitViewModel.outlineWidth;
    
            const heightDistance = this.gridViewModel.rowGap + this.gridViewModel.gridCellHeight;
            const heightDiff = e.offsetHeight - elementUnitViewModel.outlineUnitViewModel.outlineHeight;
            const halfHeightDistance = heightDistance / 2;
    
            this.handleDirectionForResize(e.direction, {
                widthDiff,
                widthDistance,
                heightDiff,
                halfHeightDistance,
                isIntoLeftEdgeZone,
                isIntoRightEdgeZone,
                gridViewModel: this.gridViewModel,
                outlineUnitViewModel: elementUnitViewModel.outlineUnitViewModel,
            });
    
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
        };
    }
}
