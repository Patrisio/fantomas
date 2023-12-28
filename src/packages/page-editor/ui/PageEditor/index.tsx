import {PageEditorContainer} from './styles';
import {Section} from '../../section';

import {observer} from 'mobx-react';

export const PageEditor = observer(({vm}) => {
    const sectionList = 
        vm.sectionList
            .map((sectionVM) => {
                return (
                    <Section
                        vm={sectionVM}
                        key={sectionVM.id}
                    />
                );
            }
    )

    return (
       <PageEditorContainer>
            {sectionList}
       </PageEditorContainer>
    );
});
