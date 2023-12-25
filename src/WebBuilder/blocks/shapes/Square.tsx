import {useRef, useMemo} from 'react';
import {observer} from 'mobx-react';

import {BaseBlock} from '../baseBlock';
import {SquareContainer} from './styles';

import {useMoveableData} from './hooks/useMoveableData';

// let uxTranslateX = 0;

export const Square = observer(({
    elementUnitViewModel,
    dragModel,
    resizeModel,
}) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const moveableRef = useRef(null);
    const moveableData = useMoveableData(moveableRef);

    const bounds = useMemo(() => {
        return {
            top: 0,
            left: 0,
            position: 'css',
        };
    }, []);

    const moveableProps = useMemo(() => ({
        onDragStart: dragModel.onDragStartHandler(elementUnitViewModel),
        onDrag: dragModel.onDragHandler(elementUnitViewModel, moveableData),
        onDragEnd: dragModel.onDragEndHandler(elementUnitViewModel, moveableData),

        onResizeStart: resizeModel.onResizeStartHandler(elementUnitViewModel),
        onResize: resizeModel.onResizeHandler(elementUnitViewModel),
        onResizeEnd: resizeModel.onResizeEndHandler(elementUnitViewModel, moveableData),

        bounds,
    }), [moveableData, bounds]);

    return (
        <BaseBlock
            targetRef={targetRef}
            ref={moveableRef}
            moveableProps={moveableProps}
            elementUnitViewModel={elementUnitViewModel}
        >
            <SquareContainer
                gridArea={elementUnitViewModel.positionerUnitViewModel.gridArea}
                width={elementUnitViewModel.width}
                height={elementUnitViewModel.height}
                ref={targetRef}
            />
        </BaseBlock>
    );
});
