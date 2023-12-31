import {GroupedListItemContainer} from '../../../../../diamond-ui';

import styled from 'styled-components';

export const PageMiniCardUI = styled(GroupedListItemContainer)`
    cursor: pointer;

    &:hover {
        background: #E7E7E7;
    }

    &:hover > div > button {
        opacity: 1;
        transform: translateX(0);
    }
`;
