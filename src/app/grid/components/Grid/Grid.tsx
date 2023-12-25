import {GridContainer, Cell} from './styles';
import {observer} from 'mobx-react';

export const Grid = observer(({gridViewModel}) => {
    const renderCells = (totalCells: number) => {
        return new Array(totalCells).fill(null).map((_, idx) => {
            return <Cell key={idx} />
        });
    };

    return (
        <GridContainer
            rows={gridViewModel.rows}
            columns={gridViewModel.columns}
            rowGap={gridViewModel.rowGap}
            columnGap={gridViewModel.columnGap}
            cellWidth={gridViewModel.cellWidth}
        >
            {renderCells(gridViewModel.gridTotalCells)}
        </GridContainer>
    );
});
