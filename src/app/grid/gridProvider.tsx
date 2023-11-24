import {useMemo, useCallback, useState, useEffect, useLayoutEffect, useRef} from 'react';
import Context from './context';
import {Grid} from './classes/Grid';
import { GRID_CELL_HEIGHT, GRID_CELL_BORDER, MAX_WIDTH } from './components/Grid/constants';

const useStateWithCallback = (initialState, callback?: VoidFunction) => {
    const [state, setState] = useState(initialState);
  
    const didMount = useRef(false);
  
    useEffect(() => {
      if (didMount.current) {
        callback?.(state);
      } else {
        didMount.current = true;
      }
    }, [state, callback]);
  
    return [state, setState];
};
  
const useStateWithCallbackInstant = (initialState, callback?: VoidFunction) => {
    const [state, setState] = useState(initialState);
  
    const didMount = useRef(false);
  
    useLayoutEffect(() => {
      if (didMount.current) {
        callback?.(state);
      } else {
        didMount.current = true;
      }
    }, [state, callback]);
  
    return [state, setState];
};

const useStateWithCallbackLazy = (initialValue) => {
    const callbackRef = useRef(null);
  
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      if (callbackRef.current) {
        callbackRef.current(value);
  
        callbackRef.current = null;
      }
    }, [value]);
  
    const setValueWithCallback = useCallback(
      (newValue, callback) => {
        callbackRef.current = callback;
  
        return setValue(newValue);
      },
      [],
    );
  
    return [value, setValueWithCallback];
  };

function GridProvider({children}) {
    const [rows, setRows] = useState(10);
    const [columns, setColumns] = useState(24);

    const [rowGap, setRowGap] = useState(10);
    const [columnGap, setColumnGap] = useState(10);

    const [maxRowsCount, setMaxRowsCount] = useState(10);

    const [restEdgePartWidth, setRestEdgePartWidth] = useState(0);

    const [clientWidth, setClientWidth] = useState(0);

    const cellWidth = (MAX_WIDTH - ((columns - 1) * columnGap)) / columns;

    const gridWidth = useMemo(() => {
        const gridWidth = (cellWidth * columns) + columnGap * (columns - 1);

        return gridWidth;
    }, [cellWidth, columns, columnGap]);

    useEffect(() => {
        const clientWidth = document.documentElement.clientWidth;
        const restEdgePartWidth = (clientWidth - gridWidth) / 2;

        setRestEdgePartWidth(restEdgePartWidth);
        setClientWidth(clientWidth);
    }, [gridWidth]);

    const gridStore = useMemo(() => {
        return {
            columns,
            rows,
            rowGap,
            columnGap,
            setColumns,
            setRows,
            setRowGap,
            setColumnGap,
            gridCellHeight: GRID_CELL_HEIGHT,
            gridCellBorder: GRID_CELL_BORDER,
            cellWidth,
            maxRowsCount,
            setMaxRowsCount,
            gridWidth,
            restEdgePartWidth,
            clientWidth
        };
    }, [cellWidth, columnGap, columns, rowGap, rows, setRows, maxRowsCount, setMaxRowsCount, gridWidth, restEdgePartWidth, clientWidth]);

    return (<Context.Provider value={gridStore}>{children}</Context.Provider>);
}

export default GridProvider;
