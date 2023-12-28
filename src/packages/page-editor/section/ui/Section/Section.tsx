import {Grid} from '../../components/grid';
import {SectionContainer} from './styles';
import {observer} from 'mobx-react';
import {Square} from '../../../../library/elements/shape';
import {ShapeType} from '../../components/element/components/positioner';

export const Section = observer(({vm}) => {
    return (
        <SectionContainer
            gridVM={vm.gridViewModel}
        >
            <Grid
                vm={vm.gridViewModel}
            />
            {
                vm.elementList
                    .map((elementVM) => {
                        const {type} = elementVM.positionerUnitViewModel;

                        if (type === ShapeType.SQUARE) {
                            return (
                                <Square
                                    elementUnitViewModel={elementVM}
                                    dragModel={vm.dragModel}
                                    resizeModel={vm.resizeModel}
                                    key={elementVM.id}
                                />
                            );
                        }
                    })
            }
        </SectionContainer>
    );
});
