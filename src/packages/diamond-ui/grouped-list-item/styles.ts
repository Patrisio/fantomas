import styled from 'styled-components';

export const GroupedListItemContainer = styled.div<{hasLeftGap: boolean, highlightOnHover: boolean,}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({hasLeftGap}) => `padding: 4px 27px 4px ${hasLeftGap ? 38 : 33}px`};
`;
