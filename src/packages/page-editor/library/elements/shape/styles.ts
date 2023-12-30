import styled from 'styled-components';

export const ShapeContainer = styled.div<{
    gridArea: string,
    width: number,
    height: number,
}>`
    ${({width}) => `width: ${width}px`};
    ${({height}) => `height: ${height}px`};
    ${({gridArea}) => `grid-area: ${gridArea}`};
    opacity: .6;
    background: #E6E4D5;
    position: absolute;
`;
