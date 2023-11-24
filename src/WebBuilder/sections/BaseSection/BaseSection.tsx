import { Grid, useGrid } from "../../../app/grid";
import { BaseSectionContainer } from "./styles";

export const BaseSection = ({children, id}) => {
    const {rows, columns, columnGap, rowGap, gridCellHeight, gridCellBorder, cellWidth} = useGrid();

    const totalCells = rows * columns;
    const height = (rows * gridCellHeight) + (rowGap * (rows - 1)) + (gridCellBorder * rows * 2);

    return (
        <BaseSectionContainer
            height={height}
            rows={rows} columns={columns} rowGap={rowGap} columnGap={columnGap}
            id={id}
        >
            <Grid rows={rows} columns={columns} cells={totalCells} rowGap={rowGap} columnGap={columnGap} cellWidth={cellWidth} />
            {children}
        </BaseSectionContainer>
    );
};
