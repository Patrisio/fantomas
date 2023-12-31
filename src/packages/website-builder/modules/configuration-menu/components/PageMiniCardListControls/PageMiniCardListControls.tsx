import {ButtonUI, IconUI, H2, H3, H4, H5, GroupedListItem} from '../../../../../diamond-ui';
import {PageMiniCardListControlsContainer} from './styles';

export const PageMiniCardListControls = ({addEmptyPage}) => {
    return (
        <PageMiniCardListControlsContainer>
            <GroupedListItem
                leftSlot={<H4>Main Navigation</H4>}
                rightSlot={
                    <div style={{display: 'flex'}}>
                        <ButtonUI onClick={addEmptyPage}>
                            <IconUI name={'plus'} />
                        </ButtonUI>
                        <ButtonUI>
                            <IconUI name={'chevronDown'} />
                        </ButtonUI>
                    </div>
                }
            />
        </PageMiniCardListControlsContainer>
    );
};
