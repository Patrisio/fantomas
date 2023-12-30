import styled from 'styled-components';

export const ButtonContainer = styled.button<{
    gridArea: string,
    width: number,
    height: number,
    background: string,
    color: string,
}>`
    ${({width}) => `width: ${width}px`};
    ${({height}) => `height: ${height}px`};
    ${({gridArea}) => `grid-area: ${gridArea}`};
    ${({background}) => `background: ${background}`};
    ${({color}) => `color: ${color}`};
    // opacity: .6;
    position: absolute;
`;
