import {IconUI, H5, GroupedListItem} from '../../../../../diamond-ui';
import {OpenPageSettingsModalButton, DeletePageButton} from './features';
import {PageMiniCardUI} from './styles';

export const PageMiniCard = ({pageVM}) => {
    return (
        <GroupedListItem
            element={PageMiniCardUI}
            leftSlot={
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <DeletePageButton />
                    <IconUI name={'document'} style={{marginRight: 11}}/>
                    <H5>{pageVM.id}</H5>
                </div>
            }
            rightSlot={<OpenPageSettingsModalButton />}
            hasLeftGap
            highlightOnHover
        />
    );
};
