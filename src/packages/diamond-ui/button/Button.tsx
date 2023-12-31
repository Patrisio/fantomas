import {StyledButton} from './styles';

export const Button = ({contentLeft, contentRight, text, children, style, ...restProps}) => {
    const isContentLeft = Boolean(contentLeft);
    const isContentRight = Boolean(contentRight);
    const hasChildren = Boolean(children);

    return (
        <StyledButton hasChildren={hasChildren} style={style} {...restProps}>
            {children}
            {!children && isContentLeft && contentLeft}
            {!children && text}
            {!children && isContentRight && contentRight}
        </StyledButton>
    );
};
