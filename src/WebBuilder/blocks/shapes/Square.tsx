import {SquareContainer} from './styles';
import {useRef, useCallback, useMemo, useState, useEffect} from 'react';
import {useGrid} from '../../../app/grid';
import {BaseBlock} from '../baseBlock';

import {useOutline} from '../../../app/outline';
import {useElement} from '../../../app/element';
import {usePositioner} from '../../../app/positioner';
import {initialShapeData} from '../../../app/positioner/constants';
import {elementId} from '../../components/Debug/constants';
import {DIRECTION_NAME, DIRECTION} from '../baseBlock/constants';

let isFixed = false;
let isVerticalFixed = false;
let diffDistance = 0;
let verticalDiffDistance = 0;
let previouseMoveableLeft = 0;
let previouseMoveableTop = 0;

let isLeftEdgeExceeded = false;
let isEdgeExceeded = false;
const EDGE_COLUMNS_COUNT = 2;

let isBlocked = false;
let fixedTranslateX = 0;

let uxTranslateX = 0;
let initialLeftPosition = 0;

let isIntoEdgeZone = false;

export const Square = ({
    gridArea,
    rowStart,
    columnStart,
    rowEnd,
    columnEnd,
}) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const {cellWidth, columnGap, rowGap, gridCellHeight, rows, setRows, maxRowsCount, setMaxRowsCount, restEdgePartWidth, columns, clientWidth} = useGrid();
    const {
        state: outlineMapState,
        methods: outlineMethods,
    } = useOutline();
    const {
        state: elementState,
        methods: elementMethods,
        queries: elementQueries,
    } = useElement();
    const {
        methods: positionerMethods,
    } = usePositioner();

    const squareState = elementState.get(elementId);

    const outlineState = outlineMapState.get(elementId);

    if (!outlineState || !squareState) {
        throw new Error('Нет outline или element');
    }
    const {position: {
        rowStart: outlineRowStart, rowEnd: outlineRowEnd, columnStart: outlineColumnStart, columnEnd: outlineColumnEnd
    }} = outlineState;

    const outlineGridArea = `${outlineRowStart} / ${outlineColumnStart} / ${outlineRowEnd} / ${outlineColumnEnd}`;
    const outlineWidth = elementQueries.getElementWidth(outlineState.position.columnStart, outlineState.position.columnEnd);
    const outlineHeight = elementQueries.getElementHeight(outlineState.position.rowStart, outlineState.position.rowEnd);

    const handleDirectionForResize = useCallback((direction: [number, number], options) => {
        const {
            widthDiff,
            halfWidthDistance,
            heightDiff,
            halfHeightDistance,
        } = options;
        const formattedDirection = JSON.stringify(direction);
        const directionName = DIRECTION[formattedDirection];

        function handleLeft() {
            if (widthDiff > halfWidthDistance) {
                outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);
            }
    
            if (widthDiff < -halfWidthDistance) {
                outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);
            }
        }

        function handleRight() {
            if (widthDiff > halfWidthDistance) {
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd + 1);
            }
    
            if (widthDiff < -halfWidthDistance) {
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd - 1);
            }
        }

        function handleBottom() {
            if (heightDiff > halfHeightDistance) {
                outlineMethods.updateRowEnd(elementId, outlineRowEnd + 1);

                if (outlineRowEnd > rows) {
                    setRows((prev) => {
                        return prev + 1;
                    });
                }
            }
    
            if (heightDiff < -halfHeightDistance) {
                outlineMethods.updateRowEnd(elementId, outlineRowEnd - 1);


                if (outlineRowEnd - 1 === rows && rows > maxRowsCount) {
                    setRows((prev) => {
                        return prev - 1;
                    });
                }
            }
        }

        function handleTop() {
            if (heightDiff > halfHeightDistance) {
                outlineMethods.updateRowStart(elementId, outlineRowStart - 1);
            }
    
            if (heightDiff < -halfHeightDistance) {
                outlineMethods.updateRowStart(elementId, outlineRowStart + 1);
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
    }, [outlineColumnEnd, outlineColumnStart, outlineMethods, outlineRowEnd, outlineRowStart, maxRowsCount, rows, setRows]);

    const onResizeStartHandler = useCallback((e) => {
        elementMethods.setMinOffsetWidthAndHeight(e);
        outlineMethods.showOutline(elementId);
    }, [outlineMethods, elementMethods]);

    const onResizeEndHandler = useCallback((e) => {
        outlineMethods.hideOutline(elementId);

        const elementWidth = elementQueries.getElementWidth(outlineColumnStart, outlineColumnEnd);
        const elementHeight = elementQueries.getElementHeight(outlineRowStart, outlineRowEnd);

        elementMethods.updateElementWidth(elementId, elementWidth);
        elementMethods.updateElementHeight(elementId, elementHeight);

        positionerMethods.updateColumnStart(elementId, outlineColumnStart);
        positionerMethods.updateColumnEnd(elementId, outlineColumnEnd);
        positionerMethods.updateRowStart(elementId, outlineRowStart);
        positionerMethods.updateRowEnd(elementId, outlineRowEnd);

        setMaxRowsCount(rows);

        e.target.style.width = '';
        e.target.style.height = '';
        e.target.style.transform = 'none';

        // TODO: Поправить костыль с форсированным перемещением controlBox react-moveable
        // const elementWidth2 = elementQueries.getElementWidth(1, outlineColumnStart) + columnGap;
        // const elementheight2 = elementQueries.getElementHeight(1, outlineRowStart) + rowGap;
        e.moveable.getControlBoxElement().style.display = `none`;
        setTimeout(() => {
            e.moveable.updateRect();
            // e.moveable.getControlBoxElement().style.transform = `translate3d(${elementWidth2}px, ${elementheight2}px, 0px)`;
            e.moveable.getControlBoxElement().style.display = `block`;
        });
    }, [
        outlineMethods, elementMethods, elementQueries, positionerMethods, outlineColumnStart,
        outlineColumnEnd, outlineRowStart, outlineRowEnd, setMaxRowsCount, rows
    ]);

    const onResizeHandler = useCallback((e) => {
        // const {left: leftDistanceFromLeftEdge} = e;
        const leftDistanceFromLeftEdge = targetRef.current?.getBoundingClientRect().left ?? 0
        const rightDistanceFromRightEdge = document.documentElement.clientWidth - (targetRef.current?.getBoundingClientRect().right ?? 0);

        isIntoEdgeZone = leftDistanceFromLeftEdge < restEdgePartWidth || rightDistanceFromRightEdge < restEdgePartWidth;
        console.log(leftDistanceFromLeftEdge, '__leftDistanceFromLeftEdge__444444', rightDistanceFromRightEdge);
        const widthDistance = columnGap + cellWidth;
        const widthDiff = e.offsetWidth - outlineWidth;
        console.log(isIntoEdgeZone, '__isIntoEdgeZone__');
        const halfWidthDistance = isIntoEdgeZone ? restEdgePartWidth / 2 : widthDistance / 2;

        const heightDistance = rowGap + gridCellHeight;
        const heightDiff = e.offsetHeight - outlineHeight;
        const halfHeightDistance = heightDistance / 2;

        handleDirectionForResize(e.direction, {
            widthDiff,
            halfWidthDistance,
            heightDiff,
            halfHeightDistance,
        });

        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = e.drag.transform;
    }, [outlineWidth, handleDirectionForResize, cellWidth, rowGap, columnGap, gridCellHeight, outlineHeight, restEdgePartWidth]);

    const handleDirectionForDrag = useCallback((e, options) => {
        const {translate, left: leftDistanceFromLeftEdge, right: rightDistanceFromRightEdge1} = e;
        const {
            // halfWidthDistance,
            // halfHeightDistance,
            outlineColumnStart,
            outlineColumnEnd,
            outlineRowStart,
            outlineRowEnd,
            restEdgePartWidth,
            columns,
        } = options;

        const isRightEdgeExceeded = outlineColumnEnd > columns + 2 + 1;
        const isLeftEdgeExceeded = outlineColumnStart === 1;
        isEdgeExceeded = (isLeftEdgeExceeded || isRightEdgeExceeded) && isFixed === false;

        console.log(leftDistanceFromLeftEdge, 'leftDistanceFromLeftEdge');
        const rightDistanceFromRightEdge = document.documentElement.clientWidth - (targetRef.current?.getBoundingClientRect().right ?? 0);

        console.log(rightDistanceFromRightEdge, 'rightDistanceFromRightEdge', targetRef.current?.getBoundingClientRect().right);

        // const isFixed = isEdgeExceeded && (outlineColumnEnd > columns + 1 || outlineColumnStart === 1) ? true : isFixed;

        const heightDistance = rowGap + gridCellHeight;
        const halfHeightDistance = heightDistance / 2;


        const [moveableLeft, moveableTop] = translate;
        // console.log(moveableLeft, '__zzzzzzz__');
        // console.log(diffDistance, '__OUTER__');
        const left = moveableLeft - diffDistance;
        const top = moveableTop - verticalDiffDistance;

        // const uxTranslateX = elementQueries.getElementWidth(outlineColumnStart, 27) - elementQueries.getElementWidth(outlineColumnStart - 1, 26);
        // console.log(uxTranslateX, '__uxTranslateX__');

        const handleEdge = () => {
            const isRightDirection = moveableLeft > previouseMoveableLeft;
            const isLeftDirection = moveableLeft < previouseMoveableLeft;

            // console.log(moveableLeft, 'moveableLeft');
            // console.log(previouseMoveableLeft, 'previouseMoveableLeft');

            const halfWidthDistance = restEdgePartWidth / 2;
            console.log(rightDistanceFromRightEdge < halfWidthDistance, rightDistanceFromRightEdge, halfWidthDistance, '___WWWWWW___');

            function handleLeftEdge() {
                const isIntoLeftEdgeZone = leftDistanceFromLeftEdge < restEdgePartWidth;
                if (!isIntoLeftEdgeZone) {
                    return;
                }

                console.log('__PIZDETS__', leftDistanceFromLeftEdge);

                diffDistance = moveableLeft < 0 ? diffDistance : leftDistanceFromLeftEdge;

                if (isLeftDirection && outlineColumnStart === 2 && leftDistanceFromLeftEdge < halfWidthDistance) {
                    outlineMethods.updateColumnEnd(elementId, outlineColumnEnd - 1);
                    outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);

                    setTimeout(() => {
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-nw')[0].style.translate = '5.75px';
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-w')[0].style.translate = '5.75px';
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-sw')[0].style.translate = '5.75px';
                    });
                }
    
                if (isRightDirection && outlineColumnStart === 1 && leftDistanceFromLeftEdge > halfWidthDistance) {
                    outlineMethods.updateColumnEnd(elementId, outlineColumnEnd + 1);
                    outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);

                    setTimeout(() => {
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-nw')[0].style.translate = '0px';
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-w')[0].style.translate = '0px';
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-sw')[0].style.translate = '0px';
                    });
                }

                e.target.style.transform = e.transform;
            }

            function handleRightEdge() {
                const isIntoRightEdgeZone = rightDistanceFromRightEdge < restEdgePartWidth;
                if (!isIntoRightEdgeZone) {
                    fixedTranslateX = 0;
                    return;
                }

                console.log(fixedTranslateX, '__fixedTranslateX__');
                const [x, y] = e.translate;
                isFixed = true;
                console.log(e.right, 'huyyyy');
                // e.right = 200;
                const second1 = rightDistanceFromRightEdge < halfWidthDistance;
                const first1 = rightDistanceFromRightEdge > halfWidthDistance;
                console.log(outlineColumnEnd === columns + 2, 'outlineColumnEnd === columns + 2');
                console.log(outlineColumnEnd, '__outlineColumnEnd__');
                console.log(initialLeftPosition);
                if (isRightDirection && outlineColumnEnd === columns + 2 && second1) {
                    outlineMethods.updateColumnEnd(elementId, outlineColumnEnd + 1);
                    outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);

                    // TODO: Поправить костыль с форсированным перемещением controlBox react-moveable
                    e.moveable.getControlBoxElement().style.display = `none`;
                    setTimeout(() => {
                        e.moveable.updateRect();
                        console.log(e.moveable.getControlBoxElement().getElementsByClassName('moveable-ne')[0], '__controlBox__');

                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-ne')[0].style.translate = '-6.8px';
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-e')[0].style.translate = '-6.8px';
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-se')[0].style.translate = '-6.8px';
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-line')[1].style.translate = '-0.05px';
                        console.log(e.moveable.getControlBoxElement().getElementsByClassName('moveable-line'), '__TREEEEEE__');

                        e.moveable.getControlBoxElement().style.display = `block`;
                    });
                    console.log('__HERE__');
                    fixedTranslateX = clientWidth - elementQueries.getElementWidth(outlineColumnStart + 1, 26) - initialLeftPosition - restEdgePartWidth;
                }

                if (isRightDirection && outlineColumnEnd === columns + 3) {
                    fixedTranslateX = clientWidth - elementQueries.getElementWidth(outlineColumnStart, 26) - initialLeftPosition - restEdgePartWidth;
                }

                if (isLeftDirection && outlineColumnEnd === columns + 3 && first1) {
                    outlineMethods.updateColumnEnd(elementId, outlineColumnEnd - 1);
                    outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);

                    // TODO: Поправить костыль с форсированным перемещением controlBox react-moveable
                    e.moveable.getControlBoxElement().style.display = `none`;
                    setTimeout(() => {
                        e.moveable.updateRect();

                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-ne')[0].style.translate = '0px';
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-e')[0].style.translate = '0px';
                        e.moveable.getControlBoxElement().getElementsByClassName('moveable-se')[0].style.translate = '0px';

                        e.moveable.getControlBoxElement().style.display = `block`;
                    });

                    // TODO: заготовка для улучшения UX
                    // uxTranslateX = elementQueries.getElementWidth(outlineColumnStart, 27) - elementQueries.getElementWidth(outlineColumnStart - 1, 26);
                }
                console.log(!!fixedTranslateX && x > fixedTranslateX, '__BOOL__');
                console.log(e.transform);

                e.target.style.transform = fixedTranslateX && x > fixedTranslateX ? `translate(${fixedTranslateX}px, ${y}px)` : e.transform;
            }

            handleLeftEdge();
            handleRightEdge();

            previouseMoveableLeft = moveableLeft;
        };

        const widthDistance = columnGap + cellWidth;
        const halfWidthDistance = widthDistance / 2;

        isIntoEdgeZone = leftDistanceFromLeftEdge < restEdgePartWidth || rightDistanceFromRightEdge < restEdgePartWidth;

        function handleRight() {
            const isRightDirection = moveableLeft > previouseMoveableLeft;
            if (!isRightDirection) {
                return;
            }

            // console.log(restEdgePartWidth, '__restEdgePartWidth__77');
            // console.log(rightDistanceFromRightEdge, '__rightDistanceFromRightEdge__');

            console.log(isFixed, '__isFixed__');
            // console.log(isEdgeExceeded, '__isEdgeExceeded__');
            // console.log(left, '__LEFT__');
            // console.log(diffDistance, '__diffDistance__');

            if (left < 0 && -left < halfWidthDistance && isFixed && outlineColumnEnd < columns + 2) {
                isFixed = false;
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd + 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);
            }

            if (left > halfWidthDistance && !isFixed && outlineColumnEnd < columns + 2) {
                isFixed = true;
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd + 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);
            }

            if (left > halfWidthDistance * 2) {
                isFixed = false;
                diffDistance = diffDistance + halfWidthDistance * 2;
            }

            previouseMoveableLeft = moveableLeft;

            e.target.style.transform = e.transform;
        }

        function handleLeft() {
            const isLeftDirection = moveableLeft < previouseMoveableLeft;
            if (!isLeftDirection) {
                return;
            }

            // console.log(left, '__left__1cccc');
            // console.log(isFixed, '__isFixed__');
            // console.log(diffDistance, '__diffDistance__');
            if (left > 0 && left < halfWidthDistance && isFixed) {
                isFixed = false;
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd - 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);
            }

            if (-left > halfWidthDistance && !isFixed) {
                isFixed = true;
                outlineMethods.updateColumnEnd(elementId, outlineColumnEnd - 1);
                outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);
            }

            if (-left > halfWidthDistance * 2) {
                isFixed = false;
                diffDistance = diffDistance - halfWidthDistance * 2;
            }

            previouseMoveableLeft = moveableLeft;

            e.target.style.transform = e.transform;
        }

        function handleTop(fixedTranslateX?: number) {
            const isTopDirection = moveableTop < previouseMoveableTop;
            if (!isTopDirection) {
                return;
            }

            if (top > 0 && top < halfHeightDistance && isVerticalFixed) {
                isVerticalFixed = false;
                outlineMethods.updateRowEnd(elementId, outlineRowEnd - 1);
                outlineMethods.updateRowStart(elementId, outlineRowStart - 1);

                if (outlineRowEnd - 1 === rows && rows > maxRowsCount) {
                    setRows((prev) => {
                        return prev - 1;
                    });
                }
            }

            if (-top > halfHeightDistance && !isVerticalFixed) {
                isVerticalFixed = true;
                outlineMethods.updateRowEnd(elementId, outlineRowEnd - 1);
                outlineMethods.updateRowStart(elementId, outlineRowStart - 1);

                if (outlineRowEnd - 1 === rows && rows > maxRowsCount) {
                    setRows((prev) => {
                        return prev - 1;
                    });
                }
            }

            if (-top > halfHeightDistance * 2) {
                isVerticalFixed = false;
                verticalDiffDistance = verticalDiffDistance - halfHeightDistance * 2;
            }

            previouseMoveableTop = moveableTop;

            const [x, y] = e.translate;
            e.target.style.transform = fixedTranslateX && x > fixedTranslateX ? `translate(${fixedTranslateX}px, ${y}px)` : e.transform;
        }

        function handleBottom(fixedTranslateX?: number) {
            const isBottomDirection = moveableTop > previouseMoveableTop;
            if (!isBottomDirection) {
                return;
            }

            if (top < 0 && -top < halfHeightDistance && isVerticalFixed) {
                isVerticalFixed = false;
                outlineMethods.updateRowEnd(elementId, outlineRowEnd + 1);
                outlineMethods.updateRowStart(elementId, outlineRowStart + 1);

                if (outlineRowEnd > rows) {
                    setRows((prev) => {
                        return prev + 1;
                    });
                }
            }

            if (top > halfHeightDistance && !isVerticalFixed) {
                isVerticalFixed = true;
                outlineMethods.updateRowEnd(elementId, outlineRowEnd + 1);
                outlineMethods.updateRowStart(elementId, outlineRowStart + 1);

                if (outlineRowEnd > rows) {
                    setRows((prev) => {
                        return prev + 1;
                    });
                }
            }

            if (top > halfHeightDistance * 2) {
                isVerticalFixed = false;
                verticalDiffDistance = verticalDiffDistance + halfHeightDistance * 2;
            }

            previouseMoveableTop = moveableTop;

            const [x, y] = e.translate;
            e.target.style.transform = fixedTranslateX && x > fixedTranslateX ? `translate(${fixedTranslateX}px, ${y}px)` : e.transform;
        }
        console.log(isIntoEdgeZone, '__isBlocked__');
        if (isIntoEdgeZone) {
            handleEdge();
            handleTop(fixedTranslateX);
            handleBottom(fixedTranslateX);
        } else {
            handleRight();
            handleLeft();
            handleTop();
            handleBottom();
        }
        previouseMoveableTop = moveableTop;
    }, [outlineMethods, rows, maxRowsCount, setRows, elementQueries, cellWidth, columnGap, gridCellHeight, rowGap, clientWidth]);

    const onDragStartHandler = useCallback((e) => {
        // console.log(e.target.getBoundingClientRect(), '__DATA_____');
        initialLeftPosition = e.target.getBoundingClientRect().left;
        outlineMethods.showOutline(elementId);
    }, [outlineMethods]);

    const onDragEndHandler = useCallback((e) => {
        isFixed = false; //isEdgeExceeded && (outlineColumnEnd > columns + 1 || outlineColumnStart === 1) ? true : false;
        diffDistance = 0;
        previouseMoveableLeft = 0;

        isVerticalFixed = false;
        verticalDiffDistance = 0;
        previouseMoveableTop = 0;

        fixedTranslateX = 0;

        outlineMethods.hideOutline(elementId);

        positionerMethods.updateColumnStart(elementId, outlineColumnStart);
        positionerMethods.updateColumnEnd(elementId, outlineColumnEnd);
        positionerMethods.updateRowStart(elementId, outlineRowStart);
        positionerMethods.updateRowEnd(elementId, outlineRowEnd);

        setMaxRowsCount(rows);

        e.target.style.transform = 'none';

        // TODO: Поправить костыль с форсированным перемещением controlBox react-moveable
        // const elementWidth2 = elementQueries.getElementWidth(2, outlineColumnStart) + columnGap;
        // const elementheight2 = elementQueries.getElementHeight(1, outlineRowStart) + rowGap;
        e.moveable.getControlBoxElement().style.display = `none`;
        setTimeout(() => {
            e.moveable.updateRect();
            // e.moveable.getControlBoxElement().style.transform = `translate3d(${elementWidth2}px, ${elementheight2}px, 0px)`;
            e.moveable.getControlBoxElement().style.display = `block`;
        });
    }, [positionerMethods, outlineColumnStart, outlineColumnEnd, outlineRowStart, outlineRowEnd, outlineMethods, setMaxRowsCount, rows]);

    const onDragHandler = useCallback((e) => {
        // console.log(e.bottom, '__BOTTOM__');
        // console.log(e.left, '__LEFT__');
        // console.log(e.right, '__Right__');
        // console.log(restEdgePartWidth, '__restEdgePartWidth__');

        const widthDistance = columnGap + cellWidth;
        const halfWidthDistance = widthDistance / 2;

        const heightDistance = rowGap + gridCellHeight;
        const halfHeightDistance = heightDistance / 2;

        handleDirectionForDrag(e, {
            halfWidthDistance,
            halfHeightDistance,
            outlineColumnStart,
            outlineColumnEnd,
            outlineRowStart,
            outlineRowEnd,
            restEdgePartWidth,
            columns,
        });
    }, [columnGap, cellWidth, rowGap, gridCellHeight, outlineColumnStart, outlineColumnEnd, outlineRowStart, outlineRowEnd, handleDirectionForDrag, restEdgePartWidth, columns]);

    const width = useMemo(() => {
        // if (outlineColumnStart === 1 || outlineColumnEnd === columns + EDGE_COLUMNS_COUNT + 1) {
        //     // console.log('__HEEEEEEE__');
        //     return elementQueries.getElementWidth(outlineColumnStart, outlineColumnEnd);
        // }

        return elementQueries.getElementWidth(outlineColumnStart, outlineColumnEnd);
    }, [outlineColumnStart, outlineColumnEnd, elementQueries]);
    
    // console.log(outlineColumnStart, '__outlineState__555');

    const bounds = useMemo(() => {
        return {
            top: 0,
            left: 0,
            // right: 0,
            position: 'css',
        };
    }, []);

    const moveableProps = useMemo(() => ({
        onResizeStart: onResizeStartHandler,
        onResizeEnd: onResizeEndHandler,
        onResize: onResizeHandler,
        onDragStart: onDragStartHandler,
        onDrag: onDragHandler,
        onDragEnd: onDragEndHandler,
        onBound: () => {
            console.log('BOUND_EXCEEDED');
        },
        bounds,
    }), [onResizeStartHandler, onResizeEndHandler, onResizeHandler, onDragStartHandler, onDragHandler, onDragEndHandler, bounds]);

    return (
        <BaseBlock
            targetRef={targetRef}
            moveableProps={moveableProps}
            isOutlineVisible={outlineState.isVisible}
            outlineGridArea={outlineGridArea}
        >
            <SquareContainer
                outlineColumnStart={outlineColumnStart}
                outlineColumnEnd={outlineColumnEnd}
                lastColumnNumber={columns + EDGE_COLUMNS_COUNT}
                gridArea={gridArea}
                rowStart={rowStart}
                columnStart={columnStart}
                rowEnd={rowEnd}
                columnEnd={columnEnd}
                width={width}
                height={squareState.height}
                ref={targetRef}
            />
        </BaseBlock>
    );
};


// draggable={true}
// throttleDrag={1}
// edgeDraggable={false}
// startDragRotate={0}
// throttleDragRotate={0}
// scalable={true}
// keepRatio={false}
// throttleScale={0}
// snappable={true}
// snapGridWidth={60}
// snapGridHeight={60}
// onDrag={e => {
//     e.target.style.transform = e.transform;
// }}
// onScale={e => {
//     e.target.style.transform = e.drag.transform;
// }}
