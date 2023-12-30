import {iconsMap} from '../icons';

export const Icon = ({name}) => {
    const iconPath = iconsMap[name];

    return (
        <img src={iconPath} />
    );
};
