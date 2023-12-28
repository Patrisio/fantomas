import {ViewportPreviewer} from '../../modules';
import {ViewportPreviewerWrapper} from './styles';

import {observer} from 'mobx-react';

export const WebsiteBuilder = observer(({vm}) => {
    return (
        <div style={{
            display: 'flex',
        }}>
            <div
                className='sidebar'
                style={{
                    maxWidth: 342,
                    height: 500,
                }}
            >
                <div style={{width: 1000, height: 500}}></div>
            </div>
            <ViewportPreviewerWrapper>
                <ViewportPreviewer />
            </ViewportPreviewerWrapper>
        </div>
    );
});
