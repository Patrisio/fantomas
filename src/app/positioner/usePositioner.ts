import {useContext} from 'react';
import Context from './context';

function usePositioner() {
    return useContext(Context);
}

export default usePositioner;
