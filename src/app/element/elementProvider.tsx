import {useState, useCallback, useMemo, useEffect} from 'react';
import Context from './context';
import {ElementType} from '../positioner/types';
import {ElementData, ElementConfig} from './types';
import {useGrid} from '../grid';

const EDGE_COLUMNS_COUNT = 2;

function ElementProvider({children}) {
    const {columnGap, cellWidth, gridCellHeight, columns, restEdgePartWidth} = useGrid();
    const [elements, setElements] = useState(new Map());

    const [elementConfig, setElementConfig] = useState<ElementConfig>({
        [ElementType.SHAPE]: {
            minWidth: 0,
            minHeight: 0,
        },
    });

    useEffect(() => {
        setElementConfig(() => {
            const newConfig = {
                [ElementType.SHAPE]: {
                    minWidth: cellWidth,
                    minHeight: gridCellHeight,
                },
            };

            return newConfig;
        });
    }, [cellWidth, gridCellHeight]);

    const getElementConfigByShapeType = useCallback((elementType: ElementType) => {
        return elementConfig[elementType];
    }, [elementConfig]);

    const getElementWidth = useCallback((columnStart: number, columnEnd: number) => {
        if (columnStart === 1 || columnEnd === columns + EDGE_COLUMNS_COUNT + 1) {
            const usualCellsCount = columnEnd - columnStart - 1;
            // console.log((usualCellsCount - 1) * columnGap + usualCellsCount * cellWidth, 'HUI__', restEdgePartWidth);
            return ((usualCellsCount - 1) * columnGap + usualCellsCount * cellWidth) + restEdgePartWidth;
        }

        const cellsCount = columnEnd - columnStart;

        return (cellsCount - 1) * columnGap + cellsCount * cellWidth;
    }, [cellWidth, columnGap, columns, restEdgePartWidth]);

    const getElementHeight = useCallback((rowStart: number, rowEnd: number) => {
        const cellsCount = rowEnd - rowStart;
        const totalGridCellHeight = gridCellHeight;

        return (cellsCount - 1) * columnGap + cellsCount * totalGridCellHeight;
    }, [columnGap, gridCellHeight]);

    const addElementData = useCallback((id: string, elementData: ElementData) => {
        setElements(prevState => {
            const newState = new Map(prevState);

            newState.set(id, elementData);

            return newState;
        });
    }, []);

    const updateElementWidth = useCallback((id: string, width: number) => {
        setElements(prevState => {
            const newState = new Map(prevState);

            const foundElementData = newState.get(id);

            if (!foundElementData) {
                throw new Error('element не найден');
            }
            
            foundElementData.width = width;

            newState.set(id, foundElementData);

            return newState;
        });
    }, []);

    const updateElementHeight = useCallback((id: string, height: number) => {
        setElements(prevState => {
            const newState = new Map(prevState);

            const foundElementData = newState.get(id);

            if (!foundElementData) {
                throw new Error('element не найден');
            }
            
            foundElementData.height = height;

            newState.set(id, foundElementData);

            return newState;
        });
    }, []);

    const setMinOffsetWidthAndHeight = useCallback((e) => {
        const {minWidth, minHeight} = getElementConfigByShapeType(ElementType.SHAPE);

        e.setMin([minWidth, minHeight]);
    }, [getElementConfigByShapeType]);

    const methods = useMemo(() => ({
        addElementData,
        updateElementWidth,
        updateElementHeight,
        setMinOffsetWidthAndHeight,
    }), [addElementData, updateElementWidth, updateElementHeight, setMinOffsetWidthAndHeight]);

    const queries = useMemo(() => ({
        getElementWidth,
        getElementHeight,
        getElementConfigByShapeType,
    }), [getElementWidth, getElementHeight, getElementConfigByShapeType]);

    const elementStore = useMemo(() => ({
        state: elements,
        methods,
        queries,
    }), [methods, elements, queries]);

    return (
        <Context.Provider value={elementStore}>
            {children}
        </Context.Provider>
    );
}

export default ElementProvider;
