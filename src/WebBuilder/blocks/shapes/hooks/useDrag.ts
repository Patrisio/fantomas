import {useCallback, useMemo} from 'react';
import {elementId} from '../../../components/Debug/constants';

export const useDrag = ({
    moveableData,
    gridData,
    outlineData,
    elementData,
    positionerData,
    sharedState,
}) => {
    const {
        controlBox,
        forceUpdateControlBox,
    } = moveableData;

    const {cellWidth, columnGap, rowGap, gridCellHeight, rows, setRows, maxRowsCount, setMaxRowsCount, restEdgePartWidth, columns, clientWidth} = gridData;

    const {
        state: outlineMapState,
        methods: outlineMethods,
    } = outlineData;

    const {
        queries: elementQueries,
    } = elementData;

    const {
        methods: positionerMethods,
    } = positionerData;

    const outlineState = outlineMapState.get(elementId);

    const {position: {
        rowStart: outlineRowStart, rowEnd: outlineRowEnd, columnStart: outlineColumnStart, columnEnd: outlineColumnEnd
    }} = outlineState;

    const handleDirectionForDrag = useCallback((e, options) => {
        const {translate, left: leftDistanceFromLeftEdge} = e;
        const {
            outlineColumnStart,
            outlineColumnEnd,
            outlineRowStart,
            outlineRowEnd,
            restEdgePartWidth,
            columns,
        } = options;

        const rightDistanceFromRightEdge = document.documentElement.clientWidth - (e.target.getBoundingClientRect().right ?? 0);

        const heightDistance = rowGap + gridCellHeight;
        const halfHeightDistance = heightDistance / 2;

        const [moveableLeft, moveableTop] = translate;

        const left = moveableLeft - sharedState.horizontalDiffDistance;
        const top = moveableTop - sharedState.verticalDiffDistance;

        const moveableNW = controlBox.getElementsByClassName('moveable-nw')[0];
        const moveableW = controlBox.getElementsByClassName('moveable-w')[0];
        const moveableSW = controlBox.getElementsByClassName('moveable-sw')[0];

        const moveableNE = controlBox.getElementsByClassName('moveable-ne')[0];
        const moveableE = controlBox.getElementsByClassName('moveable-e')[0];
        const moveableSE = controlBox.getElementsByClassName('moveable-se')[0];

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
            controlBox.getElementsByClassName('moveable-line')[1].style.translate = '-0.05px';
        }

        function shiftRightSideMoveables() {
            shiftRightSideMoveableControls();
            shiftRightSideMoveableLine();
        }

        function handleLeftEdge() {
            const isIntoLeftEdgeZone = leftDistanceFromLeftEdge < restEdgePartWidth;
            if (!isIntoLeftEdgeZone) {
                return;
            }

            const isRightDirection = moveableLeft > sharedState.previouseMoveableLeft;
            const isLeftDirection = moveableLeft < sharedState.previouseMoveableLeft;

            const halfWidthDistance = restEdgePartWidth / 2;

            sharedState.horizontalDiffDistance = moveableLeft < 0 ? sharedState.horizontalDiffDistance : leftDistanceFromLeftEdge;

            if (isLeftDirection && outlineColumnStart === 2 && leftDistanceFromLeftEdge < halfWidthDistance) {
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd - 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);

                shiftLeftSideMoveables();
            }

            if (isRightDirection && outlineColumnStart === 1 && leftDistanceFromLeftEdge > halfWidthDistance) {
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd + 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);

                resetLeftSideMoveables();
            }

            e.target.style.transform = e.transform;
        }

        function handleRightEdge() {
            const isIntoRightEdgeZone = rightDistanceFromRightEdge < restEdgePartWidth;
            if (!isIntoRightEdgeZone) {
                sharedState.fixedTranslateX = 0;
                return;
            }

            const isRightDirection = moveableLeft > sharedState.previouseMoveableLeft;
            const isLeftDirection = moveableLeft < sharedState.previouseMoveableLeft;

            const halfWidthDistance = restEdgePartWidth / 2;

            const [x, y] = e.translate;
            sharedState.isHorizontalFixed = true;

            const second1 = rightDistanceFromRightEdge < halfWidthDistance;
            const first1 = rightDistanceFromRightEdge > halfWidthDistance;

            if (isRightDirection && outlineColumnEnd === columns + 2 && second1) {
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd + 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);

                forceUpdateControlBox(e, shiftRightSideMoveables);

                sharedState.fixedTranslateX = clientWidth - elementQueries.getElementWidth(outlineColumnStart + 1, 26) - sharedState.initialLeftPosition - restEdgePartWidth;
            }

            if (isRightDirection && outlineColumnEnd === columns + 3) {
                sharedState.fixedTranslateX = clientWidth - elementQueries.getElementWidth(outlineColumnStart, 26) - sharedState.initialLeftPosition - restEdgePartWidth;
            }

            if (isLeftDirection && outlineColumnEnd === columns + 3 && first1) {
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd - 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);

                forceUpdateControlBox(e, resetRightSideMoveables);

                // TODO: заготовка для улучшения UX
                // uxTranslateX = elementQueries.getElementWidth(outlineColumnStart, 27) - elementQueries.getElementWidth(outlineColumnStart - 1, 26);
            }

            e.target.style.transform = sharedState.fixedTranslateX && x > sharedState.fixedTranslateX ? `translate(${sharedState.fixedTranslateX}px, ${y}px)` : e.transform;
        }

        const widthDistance = columnGap + cellWidth;
        const halfWidthDistance = widthDistance / 2;

        sharedState.isIntoEdgeZone = leftDistanceFromLeftEdge < restEdgePartWidth || rightDistanceFromRightEdge < restEdgePartWidth;

        function handleRight() {
            const isRightDirection = moveableLeft > sharedState.previouseMoveableLeft;
            if (!isRightDirection) {
                return;
            }

            if (left < 0 && -left < halfWidthDistance && sharedState.isHorizontalFixed && outlineColumnEnd < columns + 2) {
                sharedState.isHorizontalFixed = false;
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd + 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);
            }

            if (left > halfWidthDistance && !sharedState.isHorizontalFixed && outlineColumnEnd < columns + 2) {
                sharedState.isHorizontalFixed = true;
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd + 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);
            }

            if (left > halfWidthDistance * 2) {
                sharedState.isHorizontalFixed = false;
                sharedState.horizontalDiffDistance = sharedState.horizontalDiffDistance + halfWidthDistance * 2;
            }

            e.target.style.transform = e.transform;
        }

        function handleLeft() {
            const isLeftDirection = moveableLeft < sharedState.previouseMoveableLeft;
            if (!isLeftDirection) {
                return;
            }

            if (left > 0 && left < halfWidthDistance && sharedState.isHorizontalFixed) {
                sharedState.isHorizontalFixed = false;
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd - 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);
            }

            if (-left > halfWidthDistance && !sharedState.isHorizontalFixed) {
                sharedState.isHorizontalFixed = true;
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd - 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);
            }

            if (-left > halfWidthDistance * 2) {
                sharedState.isHorizontalFixed = false;
                sharedState.horizontalDiffDistance = sharedState.horizontalDiffDistance - halfWidthDistance * 2;
            }

            e.target.style.transform = e.transform;
        }

        function handleTop(fixedTranslateX?: number) {
            const isTopDirection = moveableTop < sharedState.previouseMoveableTop;
            if (!isTopDirection) {
                return;
            }

            if (top > 0 && top < halfHeightDistance && sharedState.isVerticalFixed) {
                sharedState.isVerticalFixed = false;
                outlineMethods.updateRowEnd(elementId, outlineRowEnd - 1);
                outlineMethods.updateRowStart(elementId, outlineRowStart - 1);

                if (outlineRowEnd - 1 === rows && rows > maxRowsCount) {
                    setRows((prev) => {
                        return prev - 1;
                    });
                }
            }

            if (-top > halfHeightDistance && !sharedState.isVerticalFixed) {
                sharedState.isVerticalFixed = true;
                outlineMethods.updateRowEnd(elementId, outlineRowEnd - 1);
                outlineMethods.updateRowStart(elementId, outlineRowStart - 1);

                if (outlineRowEnd - 1 === rows && rows > maxRowsCount) {
                    setRows((prev) => {
                        return prev - 1;
                    });
                }
            }

            if (-top > halfHeightDistance * 2) {
                sharedState.isVerticalFixed = false;
                sharedState.verticalDiffDistance = sharedState.verticalDiffDistance - halfHeightDistance * 2;
            }

            const [x, y] = e.translate;
            e.target.style.transform = fixedTranslateX && x > fixedTranslateX ? `translate(${fixedTranslateX}px, ${y}px)` : e.transform;
        }

        function handleBottom(fixedTranslateX?: number) {
            const isBottomDirection = moveableTop > sharedState.previouseMoveableTop;
            if (!isBottomDirection) {
                return;
            }

            if (top < 0 && -top < halfHeightDistance && sharedState.isVerticalFixed) {
                sharedState.isVerticalFixed = false;
                outlineMethods.updateRowEnd(elementId, outlineRowEnd + 1);
                outlineMethods.updateRowStart(elementId, outlineRowStart + 1);

                if (outlineRowEnd > rows) {
                    setRows((prev) => {
                        return prev + 1;
                    });
                }
            }

            if (top > halfHeightDistance && !sharedState.isVerticalFixed) {
                sharedState.isVerticalFixed = true;
                outlineMethods.updateRowEnd(elementId, outlineRowEnd + 1);
                outlineMethods.updateRowStart(elementId, outlineRowStart + 1);

                if (outlineRowEnd > rows) {
                    setRows((prev) => {
                        return prev + 1;
                    });
                }
            }

            if (top > halfHeightDistance * 2) {
                sharedState.isVerticalFixed = false;
                sharedState.verticalDiffDistance = sharedState.verticalDiffDistance + halfHeightDistance * 2;
            }

            const [x, y] = e.translate;
            e.target.style.transform = fixedTranslateX && x > fixedTranslateX ? `translate(${fixedTranslateX}px, ${y}px)` : e.transform;
        }

        if (sharedState.isIntoEdgeZone) {
            handleLeftEdge();
            handleRightEdge();
            handleTop(sharedState.fixedTranslateX);
            handleBottom(sharedState.fixedTranslateX);
        } else {
            handleLeft();
            handleRight();
            handleTop();
            handleBottom();
        }

        sharedState.previouseMoveableLeft = moveableLeft;
        sharedState.previouseMoveableTop = moveableTop;
    }, [outlineMethods, rows, maxRowsCount, setRows, elementQueries, cellWidth, columnGap, gridCellHeight, rowGap, clientWidth, controlBox, forceUpdateControlBox, sharedState]);

    const onDragStartHandler = useCallback((e) => {
        sharedState.initialLeftPosition = e.target.getBoundingClientRect().left;
        outlineMethods.showOutline(elementId);
    }, [outlineMethods, sharedState]);

    const onDragEndHandler = useCallback((e) => {
        sharedState.isHorizontalFixed = false;
        sharedState.isVerticalFixed = false;

        sharedState.horizontalDiffDistance = 0;
        sharedState.verticalDiffDistance = 0;

        sharedState.previouseMoveableLeft = 0;
        sharedState.previouseMoveableTop = 0;

        sharedState.fixedTranslateX = 0;

        outlineMethods.hideOutline(elementId);

        positionerMethods.updateColumnStart(elementId, outlineColumnStart);
        positionerMethods.updateColumnEnd(elementId, outlineColumnEnd);
        positionerMethods.updateRowStart(elementId, outlineRowStart);
        positionerMethods.updateRowEnd(elementId, outlineRowEnd);

        setMaxRowsCount(rows);

        e.target.style.transform = 'none';

        forceUpdateControlBox(e);
    }, [positionerMethods, outlineColumnStart, outlineColumnEnd, outlineRowStart, outlineRowEnd, outlineMethods, setMaxRowsCount, rows, forceUpdateControlBox, sharedState]);

    const onDragHandler = useCallback((e) => {
        handleDirectionForDrag(e, {
            outlineColumnStart,
            outlineColumnEnd,
            outlineRowStart,
            outlineRowEnd,
            restEdgePartWidth,
            columns,
        });
    }, [outlineColumnStart, outlineColumnEnd, outlineRowStart, outlineRowEnd, handleDirectionForDrag, restEdgePartWidth, columns]);

    return useMemo(() => ({
        onDragStart: onDragStartHandler,
        onDrag: onDragHandler,
        onDragEnd: onDragEndHandler,
    }), [onDragStartHandler, onDragHandler, onDragEndHandler]);
};
