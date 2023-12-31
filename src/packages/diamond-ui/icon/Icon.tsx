import {iconsMap} from '../icons';
import {IconComponentContainer} from './styles';

export const Icon = ({name, width, height, color, style}) => {
    const IconComponent = iconsMap[name];

    return (
        <IconComponentContainer style={style}>
            <IconComponent
                width={width}
                height={height}
                color={color}
            />
        </IconComponentContainer>
    );
};
