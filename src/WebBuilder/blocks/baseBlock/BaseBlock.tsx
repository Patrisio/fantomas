import {FloatOutline} from '../../components';
import Moveable from 'react-moveable';
import {memo, useRef} from 'react';

export const BaseBlock = memo(({targetRef, moveableProps, isOutlineVisible, outlineGridArea, children}) => {
    // console.log(outlineGridArea, '__outlineGridArea__');
    const moveableRef = useRef(null);
    // console.log(Moveable, '__Moveable__');
    return (
        <>
            {children}
            <FloatOutline visible={isOutlineVisible} gridArea={outlineGridArea}/>
            <Moveable
                ref={moveableRef}
                isDisplayGridGuidelines={false}
                target={targetRef}
                onRenderStart={(moveable) => {
                    // console.log(moveable, '__moveable__22');
                }}
                // originDraggable={true}
                draggable={true}
                snapGap
                // rotatable={true}
                resizable
                snappable
                origin={false}
                // snapThreshold={5}
                // snapGridWidth={150}
                // snapGridHeight={60}
                // throttleDrag={60.41}
                // elementSnapDirections={{left: false, top: true, right: false, bottom: true, middle: true, center: false}}
                // snapDirections={{left: false, top: true, right: false, bottom: true, middle: true, center: false}}
                // snapContainer={targetRef}
                // verticalGuidelines={[0,50,150,250,450,550]}
                // horizontalGuidelines={[32,100,200,400,500]}
                // onDrag={e => {
                //     console.log('__DRAG__');
                //     e.target.style.transform = e.transform;
                // }}
                onDragOrigin={e => {
                    e.target.style.transformOrigin = e.transformOrigin;
                    e.target.style.transform = e.drag.transform;
                }}
                // onRotate={e => {
                //     e.target.style.transform = e.drag.transform;
                // }}
                {...moveableProps}
                // throttleDrag={1}
                // snapDirections={{"top":false,"left":true,"bottom":true,"right":true}}
                // snapThreshold={8}
                // horizontalGuidelines={[410]}
                // verticalGuidelines={[410]}
            />
        </>
    );
});
