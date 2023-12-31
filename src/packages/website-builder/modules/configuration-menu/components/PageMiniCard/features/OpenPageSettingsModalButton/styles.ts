import {ButtonUI} from '../../../../../../../diamond-ui';
import styled from 'styled-components';

export const OpenPageSettingsModalButtonUI = styled(ButtonUI)`
    & > div > svg {
        color: #666666
    }
    
    &:hover > div > svg {
        color: #000;
    }

    &:hover {
        background: transparent !important;
    }
`;
