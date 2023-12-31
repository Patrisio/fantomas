import {ViewportPreviewer, ConfigurationMenu} from '../../modules';
import {ViewportPreviewerWrapper} from './styles';
import {PageTemplateFactory} from '../../../page-editor';

import {observer} from 'mobx-react';
import {useState} from 'react';

export const WebsiteBuilder = observer(({vm}) => {
    const [open, setOpen] = useState(true);

    const addEmptyPage = () => {
        const page = PageTemplateFactory.createBlankPage();
        vm.addPage(page);
    };

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
                <ConfigurationMenu
                    open={open}
                    addEmptyPage={addEmptyPage}
                    pageList={vm.pageList}
                />
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
