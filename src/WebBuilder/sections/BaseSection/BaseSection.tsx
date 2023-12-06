import { Grid, useGrid } from "../../../app/grid";
import { BaseSectionContainer } from "./styles";

export const BaseSection = ({children, id}) => {
    const {rows, columns, columnGap, rowGap, cellWidth, gridHeight, gridTotalCells} = useGrid();

    return (
        <BaseSectionContainer
            height={gridHeight}
            rows={rows} columns={columns} rowGap={rowGap} columnGap={columnGap}
            id={id}
        >
            <Grid rows={rows} columns={columns} cells={gridTotalCells} rowGap={rowGap} columnGap={columnGap} cellWidth={cellWidth} />
            {children}
        </BaseSectionContainer>
    );
};
