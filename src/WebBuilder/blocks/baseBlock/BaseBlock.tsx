import {FloatOutline} from '../../components';
import Moveable from 'react-moveable';
import {memo, useRef, forwardRef} from 'react';

export const BaseBlock = forwardRef(({targetRef, moveableProps, isOutlineVisible, outlineGridArea, children}, ref) => {
    return (
        <>
            {children}
            <FloatOutline visible={isOutlineVisible} gridArea={outlineGridArea}/>
            <Moveable
                ref={ref}
                target={targetRef}
                draggable={true}
                resizable
                origin={false}
                {...moveableProps}
            />
        </>
    );
});
