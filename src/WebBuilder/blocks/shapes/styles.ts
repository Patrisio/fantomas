import styled from 'styled-components';

export const SquareContainer = styled.div<{
    outlineColumnStart: number;
    outlineColumnEnd: number;
    gridArea: string,
    width: number,
    height: number,
    rowStart: number;
    columnStart: number;
    rowEnd: number;
    columnEnd: number;
    lastColumnNumber: number;
}>`
    ${({width}) => `width: ${width}px`};
    ${({height}) => `height: ${height}px`};
    ${({rowStart}) => `grid-row-start: ${rowStart}`};
    ${({rowEnd}) => `grid-row-end: ${rowEnd}`};
    ${({columnStart}) => `grid-column-start: ${columnStart}`};
    ${({columnEnd}) => `grid-column-end: ${columnEnd}`};
    opacity: .6;
    background: olive;
    position: absolute;
`;
