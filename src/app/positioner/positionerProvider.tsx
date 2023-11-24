import {useState, useCallback, useMemo} from 'react';
import Context from './context';
import {initialShapeData} from './constants';

function PositionerProvider({children}) {
    const [elements, setElements] = useState(new Map());

    const addShape = useCallback((id: string) => {
        setElements(prevState => {
            const newState = new Map(prevState);

            newState.set(id, {...initialShapeData});

            return newState;
        });
    }, []);

    const updateColumnStart = useCallback((id: string, columnStart: number) => {
        setElements(prevState => {
            const newState = new Map(prevState);

            const foundElementData = newState.get(id);

            if (!foundElementData) {
                throw new Error('Element не найден');
            }

            foundElementData.position.columnStart = columnStart;
            newState.set(id, foundElementData);

            return newState;
        });
    }, []);

    const updateColumnEnd = useCallback((id: string, columnEnd: number) => {
        setElements(prevState => {
            const newState = new Map(prevState);

            const foundElementData = newState.get(id);

            if (!foundElementData) {
                throw new Error('Element не найден');
            }

            foundElementData.position.columnEnd = columnEnd;
            newState.set(id, foundElementData);

            return newState;
        });
    }, []);

    const updateRowStart = useCallback((id: string, rowStart: number) => {
        // console.log('__ZZZZZ___', rowStart);
        setElements(prevState => {
            const newState = new Map(prevState);

            const foundElementData = newState.get(id);

            if (!foundElementData) {
                throw new Error('Element не найден');
            }
            
            foundElementData.position.rowStart = rowStart;
            newState.set(id, foundElementData);

            return newState;
        });
    }, []);

    const updateRowEnd = useCallback((id: string, rowEnd: number) => {
        setElements(prevState => {
            const newState = new Map(prevState);

            const foundElementData = newState.get(id);

            if (!foundElementData) {
                throw new Error('Element не найден');
            }

            foundElementData.position.rowEnd = rowEnd;
            newState.set(id, foundElementData);

            return newState;
        });
    }, []);

    const methods = useMemo(() => ({
        addShape,
        updateColumnStart,
        updateColumnEnd,
        updateRowStart,
        updateRowEnd,
    }), [addShape, updateColumnStart, updateColumnEnd, updateRowStart, updateRowEnd]);

    const positionerStore = useMemo(() => ({
        state: elements,
        methods,
    }), [methods, elements]);

    return (
        <Context.Provider value={positionerStore}>
            {children}
        </Context.Provider>
    );
}

export default PositionerProvider;