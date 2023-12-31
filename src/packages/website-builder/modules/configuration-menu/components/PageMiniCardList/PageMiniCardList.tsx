import {PageMiniCard} from '../PageMiniCard';

import {observer} from 'mobx-react';

export const PageMiniCardList = observer(({pageList}) => {
    return (
        <div>
            {pageList.map((pageVM) => {
                return (
                    <PageMiniCard pageVM={pageVM} />
                );
            })}
        </div>
    );
});
