import {GridContainer, Cell} from './styles';

export const Grid = ({rows, columns, cells, rowGap, columnGap, cellWidth}) => {
    const renderCells = (cells: number) => {
        return new Array(cells).fill(null).map((_, idx) => {
            return <Cell key={idx} id={idx} />
        });
    };

    return <GridContainer rows={rows} columns={columns} rowGap={rowGap} columnGap={columnGap} cellWidth={cellWidth}>{renderCells(cells)}</GridContainer>;
};
