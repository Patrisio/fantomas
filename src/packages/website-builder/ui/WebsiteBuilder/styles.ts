import styled from 'styled-components';

export const ViewportPreviewerWrapper = styled.div<{open: boolean}>`
    position: fixed;
    ${({open}) => `width: calc(100% - ${open ? 342 : 0}px - 16px)`};
    height: calc(100vh - 15px);
    box-shadow: 0 0 25px rgba(0,0,0,.11);
    top: 16px;
    transition: all .55s cubic-bezier(.66,0,.34,1);
    ${({open}) => `transform: translate3d(${open ? 342 : 0}px, 0px, 0px)`};
    left: 0;
    right: unset;
`;
