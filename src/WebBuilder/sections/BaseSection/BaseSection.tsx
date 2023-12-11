import {Grid} from "../../../app/grid";
import { BaseSectionContainer } from "./styles";
import {observer} from 'mobx-react';
import {gridViewModel} from '../../../app/grid/GridViewModel';

export const BaseSection = observer(({children, id}) => {
    return (
        <BaseSectionContainer
            height={gridViewModel.gridHeight}
            rows={gridViewModel.rows}
            columns={gridViewModel.columns}
            rowGap={gridViewModel.rowGap}
            columnGap={gridViewModel.columnGap}
            id={id}
        >
            <Grid
                rows={gridViewModel.rows}
                columns={gridViewModel.columns}
                cells={gridViewModel.gridTotalCells}
                rowGap={gridViewModel.rowGap}
                columnGap={gridViewModel.columnGap}
                cellWidth={gridViewModel.cellWidth}
            />
            {children}
        </BaseSectionContainer>
    );
});
