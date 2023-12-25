export class DragModel {
    constructor(
        private gridViewModel,
    ) {}

    handleDirectionForDrag(e, options) {
        const {translate, left: leftDistanceFromLeftEdge} = e;
        const {
            gridViewModel,
            elementUnitViewModel,
            moveableData,
        } = options;

        const outlineColumnStart = elementUnitViewModel.outlineUnitViewModel.position.columnStart;
        const outlineColumnEnd = elementUnitViewModel.outlineUnitViewModel.position.columnEnd;
        const outlineRowStart = elementUnitViewModel.outlineUnitViewModel.position.rowStart;
        const outlineRowEnd = elementUnitViewModel.outlineUnitViewModel.position.rowEnd;

        // const restEdgePartWidth = gridViewModel.restEdgePartWidth;
        // const columns = gridViewModel.columns;

        const rightDistanceFromRightEdge = document.documentElement.clientWidth - (e.target.getBoundingClientRect().right ?? 0);

        const heightDistance = gridViewModel.rowGap + gridViewModel.gridCellHeight;
        const halfHeightDistance = heightDistance / 2;

        const [moveableLeft, moveableTop] = translate;

        const left = moveableLeft - elementUnitViewModel.sharedState.horizontalDiffDistance;
        const top = moveableTop - elementUnitViewModel.sharedState.verticalDiffDistance;

        const moveableNW = moveableData.controlBox.getElementsByClassName('moveable-nw')[0];
        const moveableW = moveableData.controlBox.getElementsByClassName('moveable-w')[0];
        const moveableSW = moveableData.controlBox.getElementsByClassName('moveable-sw')[0];

        const moveableNE = moveableData.controlBox.getElementsByClassName('moveable-ne')[0];
        const moveableE = moveableData.controlBox.getElementsByClassName('moveable-e')[0];
        const moveableSE = moveableData.controlBox.getElementsByClassName('moveable-se')[0];

        function resetLeftSideMoveables() {
            moveableNW.style.translate = '0px';
            moveableW.style.translate = '0px';
            moveableSW.style.translate = '0px';
        }

        function resetRightSideMoveables() {
            moveableNE.style.translate = '0px';
            moveableE.style.translate = '0px';
            moveableSE.style.translate = '0px';
        }

        function shiftLeftSideMoveables() {
            moveableNW.style.translate = '5.75px';
            moveableW.style.translate = '5.75px';
            moveableSW.style.translate = '5.75px';
        }

        function shiftRightSideMoveableControls() {
            moveableNE.style.translate = '-6.8px';
            moveableE.style.translate = '-6.8px';
            moveableSE.style.translate = '-6.8px';
        }

        function shiftRightSideMoveableLine() {
            moveableData.controlBox.getElementsByClassName('moveable-line')[1].style.translate = '-0.05px';
        }

        function shiftRightSideMoveables() {
            shiftRightSideMoveableControls();
            shiftRightSideMoveableLine();
        }

        function handleLeftEdge() {
            const isIntoLeftEdgeZone = leftDistanceFromLeftEdge < gridViewModel.restEdgePartWidth;
            if (!isIntoLeftEdgeZone) {
                return;
            }

            const isRightDirection = moveableLeft > elementUnitViewModel.sharedState.previouseMoveableLeft;
            const isLeftDirection = moveableLeft < elementUnitViewModel.sharedState.previouseMoveableLeft;

            const halfWidthDistance = gridViewModel.restEdgePartWidth / 2;

            elementUnitViewModel.sharedState.horizontalDiffDistance = moveableLeft < 0 ? elementUnitViewModel.sharedState.horizontalDiffDistance : leftDistanceFromLeftEdge;

            if (isLeftDirection && outlineColumnStart === 2 && leftDistanceFromLeftEdge < halfWidthDistance) {
                elementUnitViewModel.outlineUnitViewModel.updateColumnEnd(outlineColumnEnd - 1);
                elementUnitViewModel.outlineUnitViewModel.updateColumnStart(outlineColumnStart - 1);

                shiftLeftSideMoveables();
            }

            if (isRightDirection && outlineColumnStart === 1 && leftDistanceFromLeftEdge > halfWidthDistance) {
                elementUnitViewModel.outlineUnitViewModel.updateColumnEnd(outlineColumnEnd + 1);
                elementUnitViewModel.outlineUnitViewModel.updateColumnStart(outlineColumnStart + 1);

                resetLeftSideMoveables();
            }

            e.target.style.transform = e.transform;
        }

        function handleRightEdge() {
            const isIntoRightEdgeZone = rightDistanceFromRightEdge < gridViewModel.restEdgePartWidth;
            if (!isIntoRightEdgeZone) {
                elementUnitViewModel.sharedState.fixedTranslateX = 0;
                return;
            }

            const isRightDirection = moveableLeft > elementUnitViewModel.sharedState.previouseMoveableLeft;
            const isLeftDirection = moveableLeft < elementUnitViewModel.sharedState.previouseMoveableLeft;

            const halfWidthDistance = gridViewModel.restEdgePartWidth / 2;

            const [x, y] = e.translate;
            elementUnitViewModel.sharedState.isHorizontalFixed = true;

            const second1 = rightDistanceFromRightEdge < halfWidthDistance;
            const first1 = rightDistanceFromRightEdge > halfWidthDistance;

            if (isRightDirection && outlineColumnEnd === gridViewModel.columns + 2 && second1) {
                elementUnitViewModel.outlineUnitViewModel.updateColumnEnd(outlineColumnEnd + 1);
                elementUnitViewModel.outlineUnitViewModel.updateColumnStart(outlineColumnStart + 1);

                moveableData.forceUpdateControlBox(e, shiftRightSideMoveables);

                elementUnitViewModel.sharedState.fixedTranslateX = gridViewModel.clientWidth - gridViewModel.getElementWidth(outlineColumnStart + 1, 26) - elementUnitViewModel.sharedState.initialLeftPosition - gridViewModel.restEdgePartWidth;
            }

            if (isRightDirection && outlineColumnEnd === gridViewModel.columns + 3) {
                elementUnitViewModel.sharedState.fixedTranslateX = gridViewModel.clientWidth - gridViewModel.getElementWidth(outlineColumnStart, 26) - elementUnitViewModel.sharedState.initialLeftPosition - gridViewModel.restEdgePartWidth;
            }

            if (isLeftDirection && outlineColumnEnd === gridViewModel.columns + 3 && first1) {
                elementUnitViewModel.outlineUnitViewModel.updateColumnEnd(outlineColumnEnd - 1);
                elementUnitViewModel.outlineUnitViewModel.updateColumnStart(outlineColumnStart - 1);

                moveableData.forceUpdateControlBox(e, resetRightSideMoveables);

                // TODO: заготовка для улучшения UX
                // uxTranslateX = elementQueries.getElementWidth(outlineColumnStart, 27) - elementQueries.getElementWidth(outlineColumnStart - 1, 26);
            }

            e.target.style.transform = elementUnitViewModel.sharedState.fixedTranslateX && x > elementUnitViewModel.sharedState.fixedTranslateX ? `translate(${elementUnitViewModel.sharedState.fixedTranslateX}px, ${y}px)` : e.transform;
        }

        const widthDistance = gridViewModel.columnGap + gridViewModel.cellWidth;
        const halfWidthDistance = widthDistance / 2;

        elementUnitViewModel.sharedState.isIntoEdgeZone = leftDistanceFromLeftEdge < gridViewModel.restEdgePartWidth || rightDistanceFromRightEdge < gridViewModel.restEdgePartWidth;

        function handleRight() {
            const isRightDirection = moveableLeft > elementUnitViewModel.sharedState.previouseMoveableLeft;
            if (!isRightDirection) {
                return;
            }

            if (left < 0 && -left < halfWidthDistance && elementUnitViewModel.sharedState.isHorizontalFixed && outlineColumnEnd < gridViewModel.columns + 2) {
                elementUnitViewModel.sharedState.isHorizontalFixed = false;
                elementUnitViewModel.outlineUnitViewModel.updateColumnEnd(outlineColumnEnd + 1);
                elementUnitViewModel.outlineUnitViewModel.updateColumnStart(outlineColumnStart + 1);
            }

            if (left > halfWidthDistance && !elementUnitViewModel.sharedState.isHorizontalFixed && outlineColumnEnd < gridViewModel.columns + 2) {
                elementUnitViewModel.sharedState.isHorizontalFixed = true;
                elementUnitViewModel.outlineUnitViewModel.updateColumnEnd(outlineColumnEnd + 1);
                elementUnitViewModel.outlineUnitViewModel.updateColumnStart(outlineColumnStart + 1);
            }

            if (left > halfWidthDistance * 2) {
                elementUnitViewModel.sharedState.isHorizontalFixed = false;
                elementUnitViewModel.sharedState.horizontalDiffDistance = elementUnitViewModel.sharedState.horizontalDiffDistance + halfWidthDistance * 2;
            }

            e.target.style.transform = e.transform;
        }

        function handleLeft() {
            const isLeftDirection = moveableLeft < elementUnitViewModel.sharedState.previouseMoveableLeft;
            if (!isLeftDirection) {
                return;
            }

            if (left > 0 && left < halfWidthDistance && elementUnitViewModel.sharedState.isHorizontalFixed) {
                elementUnitViewModel.sharedState.isHorizontalFixed = false;
                elementUnitViewModel.outlineUnitViewModel.updateColumnEnd(outlineColumnEnd - 1);
                elementUnitViewModel.outlineUnitViewModel.updateColumnStart(outlineColumnStart - 1);
            }

            if (-left > halfWidthDistance && !elementUnitViewModel.sharedState.isHorizontalFixed) {
                elementUnitViewModel.sharedState.isHorizontalFixed = true;
                elementUnitViewModel.outlineUnitViewModel.updateColumnEnd(outlineColumnEnd - 1);
                elementUnitViewModel.outlineUnitViewModel.updateColumnStart(outlineColumnStart - 1);
            }

            if (-left > halfWidthDistance * 2) {
                elementUnitViewModel.sharedState.isHorizontalFixed = false;
                elementUnitViewModel.sharedState.horizontalDiffDistance = elementUnitViewModel.sharedState.horizontalDiffDistance - halfWidthDistance * 2;
            }

            e.target.style.transform = e.transform;
        }

        function handleTop(fixedTranslateX?: number) {
            const isTopDirection = moveableTop < elementUnitViewModel.sharedState.previouseMoveableTop;
            if (!isTopDirection) {
                return;
            }

            if (top > 0 && top < halfHeightDistance && elementUnitViewModel.sharedState.isVerticalFixed) {
                elementUnitViewModel.sharedState.isVerticalFixed = false;
                elementUnitViewModel.outlineUnitViewModel.updateRowEnd(outlineRowEnd - 1);
                elementUnitViewModel.outlineUnitViewModel.updateRowStart(outlineRowStart - 1);

                if (outlineRowEnd - 1 === gridViewModel.rows && gridViewModel.rows > gridViewModel.maxRowsCount) {
                    gridViewModel.decrementRow();
                }
            }

            if (-top > halfHeightDistance && !elementUnitViewModel.sharedState.isVerticalFixed) {
                elementUnitViewModel.sharedState.isVerticalFixed = true;
                elementUnitViewModel.outlineUnitViewModel.updateRowEnd(outlineRowEnd - 1);
                elementUnitViewModel.outlineUnitViewModel.updateRowStart(outlineRowStart - 1);

                if (outlineRowEnd - 1 === gridViewModel.rows && gridViewModel.rows > gridViewModel.maxRowsCount) {
                    gridViewModel.decrementRow();
                }
            }

            if (-top > halfHeightDistance * 2) {
                elementUnitViewModel.sharedState.isVerticalFixed = false;
                elementUnitViewModel.sharedState.verticalDiffDistance = elementUnitViewModel.sharedState.verticalDiffDistance - halfHeightDistance * 2;
            }

            const [x, y] = e.translate;
            e.target.style.transform = fixedTranslateX && x > fixedTranslateX ? `translate(${fixedTranslateX}px, ${y}px)` : e.transform;
        }

        function handleBottom(fixedTranslateX?: number) {
            const isBottomDirection = moveableTop > elementUnitViewModel.sharedState.previouseMoveableTop;
            if (!isBottomDirection) {
                return;
            }

            if (top < 0 && -top < halfHeightDistance && elementUnitViewModel.sharedState.isVerticalFixed) {
                elementUnitViewModel.sharedState.isVerticalFixed = false;
                elementUnitViewModel.outlineUnitViewModel.updateRowEnd(outlineRowEnd + 1);
                elementUnitViewModel.outlineUnitViewModel.updateRowStart(outlineRowStart + 1);

                if (outlineRowEnd > gridViewModel.rows) {
                    gridViewModel.incrementRow();
                }
            }

            if (top > halfHeightDistance && !elementUnitViewModel.sharedState.isVerticalFixed) {
                elementUnitViewModel.sharedState.isVerticalFixed = true;
                elementUnitViewModel.outlineUnitViewModel.updateRowEnd(outlineRowEnd + 1);
                elementUnitViewModel.outlineUnitViewModel.updateRowStart(outlineRowStart + 1);

                if (outlineRowEnd > gridViewModel.rows) {
                    gridViewModel.incrementRow();
                }
            }

            if (top > halfHeightDistance * 2) {
                elementUnitViewModel.sharedState.isVerticalFixed = false;
                elementUnitViewModel.sharedState.verticalDiffDistance = elementUnitViewModel.sharedState.verticalDiffDistance + halfHeightDistance * 2;
            }

            const [x, y] = e.translate;
            e.target.style.transform = fixedTranslateX && x > fixedTranslateX ? `translate(${fixedTranslateX}px, ${y}px)` : e.transform;
        }

        if (elementUnitViewModel.sharedState.isIntoEdgeZone) {
            handleLeftEdge();
            handleRightEdge();
            handleTop(elementUnitViewModel.sharedState.fixedTranslateX);
            handleBottom(elementUnitViewModel.sharedState.fixedTranslateX);
        } else {
            handleLeft();
            handleRight();
            handleTop();
            handleBottom();
        }

        elementUnitViewModel.sharedState.previouseMoveableLeft = moveableLeft;
        elementUnitViewModel.sharedState.previouseMoveableTop = moveableTop;
    }

    onDragStartHandler(elementUnitViewModel) {
        return (e) => {
            elementUnitViewModel.sharedState.initialLeftPosition = e.target.getBoundingClientRect().left;
            elementUnitViewModel.outlineUnitViewModel.showOutline();
        }
    }

    onDragEndHandler(elementUnitViewModel, moveableData) {
        return (e) => {
            elementUnitViewModel.sharedState.isHorizontalFixed = false;
            elementUnitViewModel.sharedState.isVerticalFixed = false;

            elementUnitViewModel.sharedState.horizontalDiffDistance = 0;
            elementUnitViewModel.sharedState.verticalDiffDistance = 0;

            elementUnitViewModel.sharedState.previouseMoveableLeft = 0;
            elementUnitViewModel.sharedState.previouseMoveableTop = 0;

            elementUnitViewModel.sharedState.fixedTranslateX = 0;

            elementUnitViewModel.outlineUnitViewModel.hideOutline();

            elementUnitViewModel.positionerUnitViewModel.updateColumnStart(elementUnitViewModel.outlineUnitViewModel.position.columnStart);
            elementUnitViewModel.positionerUnitViewModel.updateColumnEnd(elementUnitViewModel.outlineUnitViewModel.position.columnEnd);
            elementUnitViewModel.positionerUnitViewModel.updateRowStart(elementUnitViewModel.outlineUnitViewModel.position.rowStart);
            elementUnitViewModel.positionerUnitViewModel.updateRowEnd(elementUnitViewModel.outlineUnitViewModel.position.rowEnd);

            this.gridViewModel.setMaxRowsCount(this.gridViewModel.rows);

            e.target.style.transform = 'none';

            moveableData.forceUpdateControlBox(e);
        }
    }

    onDragHandler(elementUnitViewModel, moveableData) {
        return (e) =>  {
            this.handleDirectionForDrag(e, {
                elementUnitViewModel,
                gridViewModel: this.gridViewModel,
                moveableData,
            });
        }
    }
}
