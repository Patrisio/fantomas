import {GRID_CELL_BORDER, GRID_CELL_HEIGHT} from './constants';

import {observer} from 'mobx-react';
import styled from 'styled-components';

export const GridContainer = observer(styled.div<{gridVM}>`
    position: absolute;
    width: 100%;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: -1;
    display: grid;
    ${({gridVM}) => `max-width: ${gridVM.maxWidth}px`};
    ${({gridVM}) => `grid-template-rows: repeat(${gridVM.rows}, 1fr)`};
    ${({gridVM}) => `grid-template-columns: repeat(${gridVM.columns}, ${gridVM.cellWidth}px)`};
    ${({gridVM}) => `grid-row-gap: ${gridVM.rowGap}px`};
    ${({gridVM}) => `grid-column-gap: ${gridVM.columnGap}px`};
`);

export const Cell = styled.div`
    border: ${GRID_CELL_BORDER}px solid #B7B7B7;
    background-color: rgba(255, 255, 255, .2);
    height: ${GRID_CELL_HEIGHT}px;
    border-radius: 3px;
    box-sizing: border-box;
`;
