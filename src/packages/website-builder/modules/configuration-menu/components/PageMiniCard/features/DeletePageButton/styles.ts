import styled from 'styled-components';
import {ButtonUI} from '../../../../../../../diamond-ui';

export const DeletePageButtonUI = styled(ButtonUI)`
    opacity: 0;
    transform: translateX(-20px);
    position: absolute;
    transition: transform .2s ease-in-out, opacity .2s ease-in-out;
    left: 0;

    &:hover > div > svg {
        color: #C32D38;
    }

    &:hover {
        background: transparent !important;
    }
`;
