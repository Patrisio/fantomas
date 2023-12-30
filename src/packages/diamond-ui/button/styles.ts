import {Button as BaseButton} from '@mui/base/Button';
import {styled} from '@mui/system';

export const StyledButton = styled(BaseButton)<{hasChildren: boolean}>`
    border: none;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 4px;
    color: #313131;
    cursor: pointer;
    user-select: none;
    letter-spacing: .5px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    height: 37px;
    background-color: transparent;
    ${({hasChildren}) => `padding: 0 ${hasChildren ? 5 : 13}px;`};
    ${({hasChildren}) => `width: ${hasChildren ? '36px' : 'auto'};`};
    ${({hasChildren}) => `height: ${hasChildren ? '36px' : 'auto'};`};

    &:hover {
        background-color: #f2f2f2;
    }
`;
