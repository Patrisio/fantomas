import styled from 'styled-components';

export const FloatOutlineContainer = styled.div<{
    visible: boolean;
    gridArea: string;
}>`
    ${({visible}) => `display: ${visible ? 'block' : 'none'}`};
    ${({gridArea}) => `grid-area: ${gridArea}`};
    border: 3px solid #067AFE;
    z-index: 1;
`;
