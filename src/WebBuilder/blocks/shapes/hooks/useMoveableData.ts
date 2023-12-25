import {useCallback, useMemo} from 'react';

export const useMoveableData = (moveableRef) => {
    const moveable = moveableRef.current?.moveable;
    const controlBox = moveable?.getControlBoxElement();

    const hideControlBox = useCallback(() => {
        controlBox.style.display = `none`;
    }, [controlBox]);

    const showControlBox = useCallback(() => {
        controlBox.style.display = `block`;
    }, [controlBox]);

    // TODO: Поправить костыль с форсированным перемещением controlBox react-moveable
    const forceUpdateControlBox = useCallback((e, callback?: VoidFunction) => {
        hideControlBox();
        setTimeout(() => {
            e.moveable.updateRect();
            callback?.();
            showControlBox();
        });
    }, [hideControlBox, showControlBox]);

    return useMemo(() => {
        return {
            controlBox,
            forceUpdateControlBox,
        };
    }, [forceUpdateControlBox, controlBox]);
};
