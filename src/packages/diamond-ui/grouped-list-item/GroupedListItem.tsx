import {GroupedListItemContainer} from './styles';

export const GroupedListItem = ({
    element: Element = GroupedListItemContainer,
    leftSlot,
    rightSlot,
    hasLeftGap = false,
    highlightOnHover = false,
}) => {
    return (
        <Element
            hasLeftGap={hasLeftGap}
            highlightOnHover={highlightOnHover}
        >
            {leftSlot}
            {rightSlot}
        </Element>
    );
};
