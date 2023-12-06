import {useState, useMemo, useCallback} from 'react';
import Context from './context';
import type {OutlineData, OutlinePositionData} from './types';
import {initialOutlineData} from './constants';

function OutlineProvider({children}) {
    const [outlineData, setOutlineData] = useState<Map<string, OutlineData>>(new Map<string, OutlineData>());

    const addOutlineById = useCallback((id: string, outlinePositionData: OutlinePositionData, width: number, height: number) => {
        setOutlineData(prevState => {
            const newState = new Map(prevState);

            const outlineData = Object.assign(initialOutlineData, {
                position: outlinePositionData,
                width,
                height,
            });

            newState.set(id, outlineData);

            return newState;
        });
    }, []);

    const updateColumnStart = useCallback((id: string, columnStart: number) => {
        setOutlineData(prevState => {
            const newState = new Map(prevState);

            const foundOutlineData = newState.get(id);

            if (!foundOutlineData) {
                throw new Error('outlineData не найдена');
            }
            foundOutlineData.position.columnStart = columnStart;

            newState.set(id, foundOutlineData);

            return newState;
        });
    }, []);

    const updateColumnEnd = useCallback((id: string, columnEnd: number) => {
        setOutlineData(prevState => {

            const newState = new Map(prevState);

            const foundOutlineData = newState.get(id);

            if (!foundOutlineData) {
                throw new Error('outlineData не найдена');
            }
            foundOutlineData.position.columnEnd = columnEnd;
            // console.log(columnEnd, '__ATTENDTION__');

            newState.set(id, foundOutlineData);

            return newState;
        });
    }, []);

    const updateRowStart = useCallback((id: string, rowStart: number) => {
        setOutlineData(prevState => {
            const newState = new Map(prevState);

            const foundOutlineData = newState.get(id);

            if (!foundOutlineData) {
                throw new Error('outlineData не найдена');
            }
            foundOutlineData.position.rowStart = rowStart;

            newState.set(id, foundOutlineData);

            return newState;
        });
    }, []);

    const updateRowEnd = useCallback((id: string, rowEnd: number) => {
        setOutlineData(prevState => {
            const newState = new Map(prevState);

            const foundOutlineData = newState.get(id);

            if (!foundOutlineData) {
                throw new Error('outlineData не найдена');
            }
            foundOutlineData.position.rowEnd = rowEnd;

            newState.set(id, foundOutlineData);

            return newState;
        });
    }, []);

    const updateOutlineWidth = useCallback((id: string, width: number) => {
        setOutlineData(prevState => {
            const newState = new Map(prevState);

            const foundOutlineData = newState.get(id);

            if (!foundOutlineData) {
                throw new Error('outlineData не найдена');
            }
            foundOutlineData.width = width;

            newState.set(id, foundOutlineData);

            return newState;
        });
    }, []);

    const showOutline = useCallback((id: string) => {
        setOutlineData(prevState => {
            const newState = new Map(prevState);

            const foundOutlineData = newState.get(id);

            if (!foundOutlineData) {
                throw new Error('outlineData не найдена');
            }
            foundOutlineData.isVisible = true;
            // console.log(prevState, '__foundOutlineData__');
            newState.set(id, foundOutlineData);

            return newState;
        });
    }, []);

    const hideOutline = useCallback((id: string) => {
        setOutlineData(prevState => {
            const newState = new Map(prevState);

            const foundOutlineData = newState.get(id);

            if (!foundOutlineData) {
                throw new Error('outlineData не найдена');
            }
            foundOutlineData.isVisible = false;

            newState.set(id, foundOutlineData);

            return newState;
        });
    }, []);

    const getOutlineGridArea = useCallback((elementId: string) => {
        const outlineState = outlineData.get(elementId);

        if (!outlineState) {
            throw new Error(`Нет outline для elementId: ${elementId}`);
        }

        const {position: {
            rowStart: outlineRowStart, rowEnd: outlineRowEnd, columnStart: outlineColumnStart, columnEnd: outlineColumnEnd
        }} = outlineState;

        const outlineGridArea = `${outlineRowStart} / ${outlineColumnStart} / ${outlineRowEnd} / ${outlineColumnEnd}`;

        return outlineGridArea;
    }, [outlineData]);

    const methods = useMemo(() => ({
        addOutlineById,
        updateColumnStart,
        updateColumnEnd,
        updateRowStart,
        updateRowEnd,
        updateOutlineWidth,
        showOutline,
        hideOutline,
    }), [
        addOutlineById, updateColumnStart, updateColumnEnd,
        updateRowStart, updateRowEnd, updateOutlineWidth,
        showOutline, hideOutline,
    ]);

    const queries = useMemo(() => {
        return {
            getOutlineGridArea,
        }
    }, [getOutlineGridArea]);

    const outlineStore = useMemo(() => ({
        state: outlineData,
        methods,
        queries,
    }), [outlineData, methods, queries]);

    return (
        <Context.Provider value={outlineStore}>
            {children}
        </Context.Provider>
    );
}

export default OutlineProvider;
