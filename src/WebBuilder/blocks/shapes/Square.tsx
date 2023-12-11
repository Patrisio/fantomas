import {SquareContainer} from './styles';
import {useRef, useMemo} from 'react';
import {BaseBlock} from '../baseBlock';

import {useOutline} from '../../../app/outline';
import {usePositioner} from '../../../app/positioner';
import {elementId} from '../../components/Debug/constants';
import {useMoveableData} from './hooks/useMoveableData';
import {useDrag} from './hooks/useDrag';
import {useResize} from './hooks/useResize';
import {gridViewModel} from '../../../app/grid';
import {elementViewModel} from '../../../app/element';
import {observer} from 'mobx-react';

const EDGE_COLUMNS_COUNT = 2;
// let uxTranslateX = 0;

const sharedState = {
    isHorizontalFixed: false,
    isVerticalFixed: false,
    horizontalDiffDistance: 0,
    verticalDiffDistance: 0,
    previouseMoveableLeft: 0,
    previouseMoveableTop: 0,
    fixedTranslateX: 0,
    initialLeftPosition: 0,
    isIntoEdgeZone: false,
};

export const Square = observer(({
    gridArea,
    rowStart,
    columnStart,
    rowEnd,
    columnEnd,
}) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const moveableRef = useRef(null);
    
    const moveableData = useMoveableData(moveableRef);

    const outlineData = useOutline();
    const positionerData = usePositioner();

    const squareState = elementViewModel.getElementById(elementId);
    const outlineState = outlineData.state.get(elementId);

    if (!outlineState || !squareState) {
        throw new Error('Нет outline или element');
    }

    const {position: {
        rowStart: outlineRowStart, rowEnd: outlineRowEnd, columnStart: outlineColumnStart, columnEnd: outlineColumnEnd
    }} = outlineState;

    const dragData = useDrag({
        moveableData,
        outlineData,
        positionerData,
        sharedState,
    });

    const resizeData = useResize({
        moveableData,
        outlineData,
        positionerData,
        sharedState,
    });

    const width = useMemo(() => {
        return elementViewModel.getElementWidth(outlineColumnStart, outlineColumnEnd);
    }, [outlineColumnStart, outlineColumnEnd]);
    
    const bounds = useMemo(() => {
        return {
            top: 0,
            left: 0,
            position: 'css',
        };
    }, []);

    const moveableProps = useMemo(() => ({
        ...dragData,
        ...resizeData,
        bounds,
    }), [dragData, resizeData, bounds]);

    return (
        <BaseBlock
            targetRef={targetRef}
            ref={moveableRef}
            moveableProps={moveableProps}
            isOutlineVisible={outlineState.isVisible}
            outlineGridArea={outlineData.queries.getOutlineGridArea(elementId)}
        >
            <SquareContainer
                outlineColumnStart={outlineColumnStart}
                outlineColumnEnd={outlineColumnEnd}
                lastColumnNumber={gridViewModel.columns + EDGE_COLUMNS_COUNT}
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
});
