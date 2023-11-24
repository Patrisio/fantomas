import {useContext} from 'react';
import Context from './context';

function useGrid() {
    return useContext(Context);
}

export default useGrid;
