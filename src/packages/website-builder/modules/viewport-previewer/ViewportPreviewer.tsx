import {ViewportPreviewerContainer} from './styles';
import {STAND} from './constants';

export const ViewportPreviewer = () => {
    return (
        <ViewportPreviewerContainer
            src={`${STAND}/editor`}
        />
    );
};
