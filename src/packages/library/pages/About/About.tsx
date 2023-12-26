import {page} from '../../../page';
import {Section} from '../../../section';

import {observer} from 'mobx-react';

export const About = observer(() => {
    const sectionList = 
        page.sectionEntries
            .map(([sectionId, sectionVM]) => {
                return (
                    <Section
                        sectionVM={sectionVM}
                        key={sectionId}
                    />
                );
            }
    )

    return sectionList;
});
