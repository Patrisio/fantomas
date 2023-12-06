import {elementId} from '../../../components/Debug/constants';
import {useCallback, useMemo} from 'react';
import {DIRECTION_NAME, DIRECTION} from '../../baseBlock/constants';

export const useResize = ({
    moveableData,
    gridData,
    outlineData,
    elementData,
    positionerData,
    sharedState,
}) => {
    const {
        forceUpdateControlBox,
    } = moveableData;

    const {cellWidth, columnGap, rowGap, gridCellHeight, rows, setRows, maxRowsCount, setMaxRowsCount, restEdgePartWidth} = gridData;
    const {
        state: outlineMapState,
        methods: outlineMethods,
    } = outlineData;
    const {
        methods: elementMethods,
        queries: elementQueries,
    } = elementData;

    const {
        methods: positionerMethods,
    } = positionerData;

    const outlineState = outlineMapState.get(elementId);

    const {position: {
        rowStart: outlineRowStart, rowEnd: outlineRowEnd, columnStart: outlineColumnStart, columnEnd: outlineColumnEnd
    }} = outlineState;

    const outlineWidth = elementQueries.getElementWidth(outlineState.position.columnStart, outlineState.position.columnEnd);
    const outlineHeight = elementQueries.getElementHeight(outlineState.position.rowStart, outlineState.position.rowEnd);

    const handleDirectionForResize = useCallback((direction: [number, number], options) => {
        const {
            widthDiff,
            widthDistance,
            heightDiff,
            halfHeightDistance,
            isIntoLeftEdgeZone,
            isIntoRightEdgeZone,
        } = options;
        const formattedDirection = JSON.stringify(direction);
        const directionName = DIRECTION[formattedDirection];
        let halfWidthDistance = widthDistance / 2;
        const isIntoEdgeZone = isIntoLeftEdgeZone || isIntoRightEdgeZone;

        function handleLeft() {
            const isPullToTheLeftInLeftEdgeZone = isIntoEdgeZone && isIntoLeftEdgeZone;
            if (isPullToTheLeftInLeftEdgeZone) {
                halfWidthDistance = restEdgePartWidth / 2;
            }

            const isPullToTheLeftInRightEdgeZone = isIntoEdgeZone && isIntoRightEdgeZone;
            if (isPullToTheLeftInRightEdgeZone) {
                halfWidthDistance = widthDistance / 2;
            }

            if (widthDiff > halfWidthDistance) {
                outlineMethods.updateColumnStart(elementId, outlineColumnStart - 1);
            }
    
            if (widthDiff < -halfWidthDistance) {
                outlineMethods.updateColumnStart(elementId, outlineColumnStart + 1);
            }
        }

        function handleRight() {
            const isPullToTheRightInLeftEdgeZone = isIntoEdgeZone && isIntoLeftEdgeZone;
            if (isPullToTheRightInLeftEdgeZone) {
                halfWidthDistance = widthDistance / 2;
            }

            const isPullToTheRightInRightEdgeZone = isIntoEdgeZone && isIntoRightEdgeZone;
            if (isPullToTheRightInRightEdgeZone) {
                halfWidthDistance = restEdgePartWidth / 2;
            }

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
    }, [outlineColumnEnd, outlineColumnStart, outlineMethods, outlineRowEnd, outlineRowStart, maxRowsCount, rows, restEdgePartWidth, setRows]);

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

        forceUpdateControlBox(e);
    }, [
        outlineMethods, elementMethods, elementQueries, positionerMethods, outlineColumnStart,
        outlineColumnEnd, outlineRowStart, outlineRowEnd, setMaxRowsCount, rows, forceUpdateControlBox,
    ]);

    const onResizeHandler = useCallback((e) => {
        const leftDistanceFromLeftEdge = e.target.getBoundingClientRect().left ?? 0
        const rightDistanceFromRightEdge = document.documentElement.clientWidth - (e.target.getBoundingClientRect().right ?? 0);
        const isIntoLeftEdgeZone = leftDistanceFromLeftEdge < restEdgePartWidth;
        const isIntoRightEdgeZone = rightDistanceFromRightEdge < restEdgePartWidth;

        sharedState.isIntoEdgeZone = isIntoLeftEdgeZone || isIntoRightEdgeZone;

        const widthDistance = columnGap + cellWidth;
        const widthDiff = e.offsetWidth - outlineWidth;

        const heightDistance = rowGap + gridCellHeight;
        const heightDiff = e.offsetHeight - outlineHeight;
        const halfHeightDistance = heightDistance / 2;

        handleDirectionForResize(e.direction, {
            widthDiff,
            widthDistance,
            heightDiff,
            halfHeightDistance,
            isIntoLeftEdgeZone,
            isIntoRightEdgeZone,
        });

        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = e.drag.transform;
    }, [outlineWidth, handleDirectionForResize, cellWidth, rowGap, columnGap, gridCellHeight, outlineHeight, restEdgePartWidth, sharedState]);

    return useMemo(() => ({
        onResizeStart: onResizeStartHandler,
        onResizeEnd: onResizeEndHandler,
        onResize: onResizeHandler,
    }), [onResizeStartHandler, onResizeEndHandler, onResizeHandler]);
};
