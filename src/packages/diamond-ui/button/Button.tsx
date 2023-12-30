import {StyledButton} from './styles';

export const Button = ({contentLeft, contentRight, text, children}) => {
    const isContentLeft = Boolean(contentLeft);
    const isContentRight = Boolean(contentRight);
    const hasChildren = Boolean(children);

    return (
        <StyledButton hasChildren={hasChildren}>
            {children}
            {!children && isContentLeft && contentLeft}
            {!children && text}
            {!children && isContentRight && contentRight}
        </StyledButton>
    );
};
