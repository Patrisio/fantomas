import {useRef} from 'react';
import {observer} from 'mobx-react';

import {Element} from '../../../element/ui/element';
import {ButtonContainer} from './styles';

// let uxTranslateX = 0;

export const Button = observer(({
    elementUnitViewModel,
    dragModel,
    resizeModel,
}) => {
    const targetRef = useRef<HTMLDivElement>(null);

    return (
        <Element
            targetRef={targetRef}
            elementUnitViewModel={elementUnitViewModel}
            dragModel={dragModel}
            resizeModel={resizeModel}
        >
            <ButtonContainer
                gridArea={elementUnitViewModel.positionerUnitViewModel.gridArea}
                width={elementUnitViewModel.width}
                height={elementUnitViewModel.height}
                background={elementUnitViewModel.background}
                color={elementUnitViewModel.color}
                ref={targetRef}
            >
                {elementUnitViewModel.text}
            </ButtonContainer>
        </Element>
    );
});
