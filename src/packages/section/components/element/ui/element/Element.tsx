import {FloatOutline} from './components/FloatOutline';
import Moveable from 'react-moveable';
import {forwardRef} from 'react';
import {observer} from 'mobx-react';

export const Element = observer(forwardRef(({
    targetRef,
    moveableProps,
    elementUnitViewModel,
    children,
}, ref) => {
    return (
        <>
            {children}
            <FloatOutline
                elementUnitViewModel={elementUnitViewModel}
            />
            <Moveable
                ref={ref}
                target={targetRef}
                draggable
                resizable
                origin={false}
                {...moveableProps}
            />
        </>
    );
}));