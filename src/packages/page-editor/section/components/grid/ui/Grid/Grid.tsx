import {GridContainer, Cell} from './styles';
import {observer} from 'mobx-react';

export const Grid = observer(({vm}) => {
    const renderCells = (totalCells: number) => {
        return (
            new Array(totalCells)
                .fill(null)
                .map((_, idx) => <Cell key={idx} />)
        );
    };

    return (
        <GridContainer
            gridVM={vm}
        >
            {renderCells(vm.gridTotalCells)}
        </GridContainer>
    );
});
