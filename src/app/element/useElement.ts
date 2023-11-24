import {useContext} from 'react';
import Context from './context';

function useElement() {
    return useContext(Context);
}

export default useElement;
