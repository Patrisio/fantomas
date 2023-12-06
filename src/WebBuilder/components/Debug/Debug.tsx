import { useGrid } from "../../../app/grid";
import { usePositioner } from "../../../app/positioner";
import { useOutline } from "../../../app/outline";
import {useElement} from '../../../app/element';
import {initialShapeData} from "../../../app/positioner/constants";
import {elementId} from './constants';
import {useMemo} from 'react';

export const Debug = () => {
    const {setColumns, setRows, setRowGap, setColumnGap, columnGap, cellWidth, gridCellHeight} = useGrid();
    const {
        state: positionerState,
        methods: positionerMethods,
    } = usePositioner();
    const {
        state: outlineState,
        methods: outlineMethods,
    } = useOutline();
    const {
        methods: elementMethods,
        queries: elementQueries,
    } = useElement();
    
    const onChangeRowsHandler = (e) => {
        const value = e.target.value ?? 1;
        setRows(parseInt(value));
    };

    const onChangeColumnsHandler = (e) => {
        const value = e.target.value ?? 0;
        setColumns(parseInt(value));
    };

    const onChangeRowGapHandler = (e) => {
        const value = e.target.value ?? 0;
        setRowGap(parseInt(value));
    };

    const onChangeColumnGapHandler = (e) => {
        const value = e.target.value ?? 0;
        setColumnGap(parseInt(value));
    };

    const squareWidth = elementQueries.getElementWidth(initialShapeData.position.columnStart, initialShapeData.position.columnEnd);
    const squareHeight = elementQueries.getElementHeight(initialShapeData.position.rowStart, initialShapeData.position.rowEnd);
    // console.log(squareWidth, '__squareWidth__');
    const addShapeHandler = () => {
        positionerMethods.addShape(elementId);
        outlineMethods.addOutlineById(elementId, {...initialShapeData.position}, squareWidth, squareHeight);
        elementMethods.addElementData(elementId, {width: squareWidth, height: squareHeight});
    };
    
    const addRowHandler = () => {
        setRows(prev => prev + 1);
    };

    // console.log(positionerState, '__positionerState__');
    // console.log(outlineState, '__outlineState__');
    // console.log(outlineState.get(elementId)?.position, '__outlineState__');
    // console.log(outlineState.get(elementId)?.width, '__outlineWIDTH__');

    return (
        <div style={{position: 'fixed', bottom: 0}}>
            <label>rows</label>
            <input onChange={onChangeRowsHandler} type="number" min={1} />

            <label>columns</label>
            <input onChange={onChangeColumnsHandler} type="number" min={1} />

            <label>rowGap</label>
            <input onChange={onChangeRowGapHandler} type="number" min={1} />

            <label>columnGap</label>
            <input onChange={onChangeColumnGapHandler} type="number" min={1} />

            <button onClick={addRowHandler}>add row</button>

            <button onClick={addShapeHandler}>add shape</button>
        </div>
    );
};