import {elementId} from '../../../components/Debug/constants';
import {useCallback, useMemo} from 'react';
import {DIRECTION_NAME, DIRECTION} from '../../baseBlock/constants';
import {gridViewModel} from '../../../../app/grid';
import {elementViewModel} from '../../../../app/element';

export const useResize = ({
    moveableData,
    outlineData,
    positionerData,
    sharedState,
}) => {
    const {
        forceUpdateControlBox,
    } = moveableData;

    const {
        state: outlineMapState,
        methods: outlineMethods,
    } = outlineData;

    const {
        methods: positionerMethods,
    } = positionerData;

    const outlineState = outlineMapState.get(elementId);

    const {position: {
        rowStart: outlineRowStart, rowEnd: outlineRowEnd, columnStart: outlineColumnStart, columnEnd: outlineColumnEnd
    }} = outlineState;

    const outlineWidth = elementViewModel.getElementWidth(outlineState.position.columnStart, outlineState.position.columnEnd);
    const outlineHeight = elementViewModel.getElementHeight(outlineState.position.rowStart, outlineState.position.rowEnd);

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
                halfWidthDistance = gridViewModel.restEdgePartWidth / 2;
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
                halfWidthDistance = gridViewModel.restEdgePartWidth / 2;
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

                if (outlineRowEnd > gridViewModel.rows) {
                    gridViewModel.incrementRow();
                }
            }
    
            if (heightDiff < -halfHeightDistance) {
                outlineMethods.updateRowEnd(elementId, outlineRowEnd - 1);

                if (outlineRowEnd - 1 === gridViewModel.rows && gridViewModel.rows > gridViewModel.maxRowsCount) {
                    gridViewModel.decrementRow();
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
    }, [outlineColumnEnd, outlineColumnStart, outlineMethods, outlineRowEnd, outlineRowStart, gridViewModel.maxRowsCount, gridViewModel.rows, gridViewModel.restEdgePartWidth]);

    const onResizeStartHandler = useCallback((e) => {
        elementViewModel.setMinOffsetWidthAndHeight(e);
        outlineMethods.showOutline(elementId);
    }, [outlineMethods]);

    const onResizeEndHandler = useCallback((e) => {
        outlineMethods.hideOutline(elementId);

        const elementWidth = elementViewModel.getElementWidth(outlineColumnStart, outlineColumnEnd);
        const elementHeight = elementViewModel.getElementHeight(outlineRowStart, outlineRowEnd);

        // TODO: проверить, почему это будет работать даже без вызова метода (экшена)
        elementViewModel.updateElementWidth(elementId, elementWidth);
        elementViewModel.updateElementHeight(elementId, elementHeight);

        positionerMethods.updateColumnStart(elementId, outlineColumnStart);
        positionerMethods.updateColumnEnd(elementId, outlineColumnEnd);
        positionerMethods.updateRowStart(elementId, outlineRowStart);
        positionerMethods.updateRowEnd(elementId, outlineRowEnd);

        gridViewModel.setMaxRowsCount(gridViewModel.rows);

        e.target.style.width = '';
        e.target.style.height = '';
        e.target.style.transform = 'none';

        forceUpdateControlBox(e);
    }, [
        outlineMethods, positionerMethods, outlineColumnStart,
        outlineColumnEnd, outlineRowStart, outlineRowEnd, gridViewModel.rows, forceUpdateControlBox,
    ]);

    const onResizeHandler = useCallback((e) => {
        const leftDistanceFromLeftEdge = e.target.getBoundingClientRect().left ?? 0
        const rightDistanceFromRightEdge = document.documentElement.clientWidth - (e.target.getBoundingClientRect().right ?? 0);
        const isIntoLeftEdgeZone = leftDistanceFromLeftEdge < gridViewModel.restEdgePartWidth;
        const isIntoRightEdgeZone = rightDistanceFromRightEdge < gridViewModel.restEdgePartWidth;

        sharedState.isIntoEdgeZone = isIntoLeftEdgeZone || isIntoRightEdgeZone;

        const widthDistance = gridViewModel.columnGap + gridViewModel.cellWidth;
        const widthDiff = e.offsetWidth - outlineWidth;

        const heightDistance = gridViewModel.rowGap + gridViewModel.gridCellHeight;
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
    }, [outlineWidth, handleDirectionForResize, gridViewModel.cellWidth, gridViewModel.rowGap, gridViewModel.columnGap, gridViewModel.gridCellHeight, outlineHeight, gridViewModel.restEdgePartWidth, sharedState]);

    return useMemo(() => ({
        onResizeStart: onResizeStartHandler,
        onResizeEnd: onResizeEndHandler,
        onResize: onResizeHandler,
    }), [onResizeStartHandler, onResizeEndHandler, onResizeHandler]);
};
