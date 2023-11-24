import { useEffect, useRef } from 'react';
import {useGrid} from '../app/grid';
import { Grid } from '../app/grid/components';
import { Debug } from './components/Debug/Debug';
import {About} from './sections';
import OriginalMoveable from 'react-moveable';

export const WebBuilder = () => {
    const {rows, columns, rowGap, columnGap} = useGrid();

    return (
        <>
            <About />
            <Debug />
        </>
    );
};
