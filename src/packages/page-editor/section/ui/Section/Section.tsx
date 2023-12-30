import {Grid} from '../../components/grid';
import {SectionContainer} from './styles';
import {observer} from 'mobx-react';
import {Shape, Button} from '../../../library/elements';

export const Section = observer(({vm}) => {
    return (
        <SectionContainer
            gridVM={vm.gridVM}
        >
            <Grid
                vm={vm.gridVM}
            />
            {
                vm.elementList
                    .map((elementVM) => {
                        const {type} = elementVM;

                        if (type === 'SHAPE') {
                            return (
                                <Shape
                                    elementUnitViewModel={elementVM}
                                    dragModel={vm.dragModel}
                                    resizeModel={vm.resizeModel}
                                    key={elementVM.id}
                                />
                            );
                        }

                        if (type === 'BUTTON') {
                            return (
                                <Button
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
