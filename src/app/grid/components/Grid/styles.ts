import styled from 'styled-components';
import {GRID_CELL_BORDER, GRID_CELL_HEIGHT, MAX_WIDTH} from './constants';

export const GridContainer = styled.div<{rows: number, columns: number, rowGap: number, columnGap: number, cellWidth: number}>`
    position: absolute;
    max-width: ${MAX_WIDTH}px;
    width: 100%;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: -1;
    display: grid;
    ${({rows}) => `grid-template-rows: repeat(${rows}, 1fr)`};
    ${({columns, cellWidth}) => `grid-template-columns: repeat(${columns}, ${cellWidth}px)`};
    ${({rowGap}) => `grid-row-gap: ${rowGap}px`};
    ${({columnGap}) => `grid-column-gap: ${columnGap}px`};
`;

export const Cell = styled.div`
    border: ${GRID_CELL_BORDER}px solid blue;
    height: ${GRID_CELL_HEIGHT}px;
    border-radius: 5px;
    box-sizing: border-box;
`;
