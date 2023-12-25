import {Square} from '../../blocks';
import {BaseSection} from '../BaseSection';
import {ShapeType} from '../../../app/element/positioner';
import {page} from '../../../app/page';

import {observer} from 'mobx-react';

export const About = observer(() => {
    const sectionList = 
        page.sectionEntries
            .map(([sectionId, sectionVM]) => {
                return (
                    <BaseSection
                        gridViewModel={sectionVM.gridVM}
                        key={sectionId}
                    >
                        {
                            sectionVM.elementEntries
                                .map(([elementId, elementUnitViewModel]) => {
                                    const {type} = elementUnitViewModel.positionerUnitViewModel;

                                    if (type === ShapeType.SQUARE) {
                                        return (
                                            <Square
                                                elementUnitViewModel={elementUnitViewModel}
                                                dragModel={sectionVM.dragModel}
                                                resizeModel={sectionVM.resizeModel}
                                                key={elementId}
                                            />
                                        );
                                    }
                                })
                        }
                    </BaseSection>
                );
            }
    )

    return sectionList;
});
