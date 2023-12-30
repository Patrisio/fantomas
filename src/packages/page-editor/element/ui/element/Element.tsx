import {FloatOutline} from './components/FloatOutline';
import {useMoveableData} from './hooks/useMoveableData';

import Moveable from 'react-moveable';
import {useMemo, useRef} from 'react';
import {observer} from 'mobx-react';

export const Element = observer(({
    targetRef,
    elementUnitViewModel,
    dragModel,
    resizeModel,
    children,
}) => {
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
        <>
            {children}
            <FloatOutline
                elementUnitViewModel={elementUnitViewModel}
            />
            <Moveable
                ref={moveableRef}
                target={targetRef}
                draggable
                resizable
                origin={false}
                {...moveableProps}
            />
        </>
    );
});
