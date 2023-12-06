import {Square} from "../../blocks";
import {BaseSection} from "../BaseSection";
import {usePositioner} from '../../../app/positioner';
import {createPortal} from 'react-dom';

export const About = () => {
    const {
        state: elementsMap,
    } = usePositioner();

    const elementState = [...elementsMap.values()][0];
    const baseSectionNode = document.getElementById('baseSection');

    if (!elementState || !baseSectionNode) {
        return (
            <BaseSection id={'baseSection'}><></></BaseSection>
        );
    }

    const {position: {
        rowStart,
        rowEnd,
        columnStart,
        columnEnd,
    }} = elementState;

    return (
        <>
            <BaseSection id={'baseSection'} />
            {createPortal(
                <Square
                    gridArea={`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`}
                    rowStart={rowStart}
                    columnStart={columnStart}
                    rowEnd={rowEnd}
                    columnEnd={columnEnd}
                />, 
                baseSectionNode
            )}
        </>
    );
};
