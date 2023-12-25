import {FloatOutlineContainer} from './styles';
import {observer} from 'mobx-react';

export const FloatOutline = observer(({elementUnitViewModel}) => {
    return (
        <FloatOutlineContainer
            visible={elementUnitViewModel.outlineUnitViewModel.isVisible}
            gridArea={elementUnitViewModel.outlineUnitViewModel.gridArea}
        />
    );
});
