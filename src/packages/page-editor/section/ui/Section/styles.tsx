import styled from 'styled-components';
import {observer} from 'mobx-react';

export const SectionContainer = observer(styled.section<{
    gridVM
}>`
    position: relative;
    // border: 1px solid purple;
    ${({gridVM}) => `min-height: ${gridVM.gridHeight}px`};

    // Дубль из Grid компонента src/app/grid/components/Grid/styles.ts
    // max-width: 1440px;
    // margin: 0 auto;

    display: grid;
    ${({gridVM}) => `grid-template-rows: repeat(${gridVM.rows}, 1fr)`};
    ${({gridVM}) => `grid-template-columns: minmax(10px, 1fr) repeat(${gridVM.columns}, ${gridVM.cellWidth}px)`} minmax(10px, 1fr);
    ${({gridVM}) => `grid-row-gap: ${gridVM.rowGap}px`};
    ${({gridVM}) => `grid-column-gap: ${gridVM.columnGap}px`};
`);

// 58.15