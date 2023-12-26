import {Grid} from '../../components/grid';
import {SectionContainer} from './styles';
import {observer} from 'mobx-react';
import {Square} from '../../../library/elements/shape';
import {ShapeType} from '../../components/element/components/positioner';

export const Section = observer(({sectionVM}) => {
    return (
        <SectionContainer
            height={sectionVM.gridViewModel.gridHeight}
            rows={sectionVM.gridViewModel.rows}
            columns={sectionVM.gridViewModel.columns}
            rowGap={sectionVM.gridViewModel.rowGap}
            columnGap={sectionVM.gridViewModel.columnGap}
        >
            <Grid
                gridViewModel={sectionVM.gridViewModel}
            />
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
        </SectionContainer>
    );
});
