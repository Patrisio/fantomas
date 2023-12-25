import {Grid} from '../../../app/grid';
import {BaseSectionContainer} from './styles';
import {observer} from 'mobx-react';

export const BaseSection = observer(({children, gridViewModel}) => {
    return (
        <BaseSectionContainer
            height={gridViewModel.gridHeight}
            rows={gridViewModel.rows}
            columns={gridViewModel.columns}
            rowGap={gridViewModel.rowGap}
            columnGap={gridViewModel.columnGap}
        >
            <Grid
                gridViewModel={gridViewModel}
            />
            {children}
        </BaseSectionContainer>
    );
});
