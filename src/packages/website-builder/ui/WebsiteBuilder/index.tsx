import {ViewportPreviewer} from '../../modules';
// import {ButtonUI, IconUI} from '../../../diamond-ui';
import {ViewportPreviewerWrapper} from './styles';

import {observer} from 'mobx-react';
import {useState} from 'react';

export const WebsiteBuilder = observer(({vm}) => {
    const [open, setOpen] = useState(true);
    return (
        <>
            <div style={{
                display: 'flex',
            }}>
                <button
                    style={{position: 'fixed', left: 0, bottom: 0, zIndex: 9999, background: 'blue'}}
                    onClick={() => setOpen(prev => !prev)}
                >
                    {open ? 'close' : 'open'}
                </button>
                <div
                    className='sidebar'
                    style={{
                        width: open ? 342 : 0,
                        height: 500,
                        visibility: open ? 'visible' : 'hidden',
                    }}
                >
                    <div style={{width: 1000, height: 500}}></div>
                </div>
                <ViewportPreviewerWrapper open={open}>
                    <ViewportPreviewer />
                </ViewportPreviewerWrapper>
            </div>
        </>
    );
});


{/* <ButtonUI text={'edit'} />
<ButtonUI>
    <IconUI name={'plus'} />
</ButtonUI> */}
