import { usePositioner } from "../../../app/positioner";
import { useOutline } from "../../../app/outline";
import {initialShapeData} from "../../../app/positioner/constants";
import {elementId} from './constants';
import {gridViewModel} from '../../../app/grid';
import {elementViewModel} from '../../../app/element';

export const Debug = () => {
    const {
        state: positionerState,
        methods: positionerMethods,
    } = usePositioner();
    const {
        state: outlineState,
        methods: outlineMethods,
    } = useOutline();
    
    const onChangeRowsHandler = (e) => {
        const value = e.target.value ?? 1;
        gridViewModel.rows = parseInt(value);
    };

    const onChangeColumnsHandler = (e) => {
        const value = e.target.value ?? 0;
        gridViewModel.columns = parseInt(value)
        gridViewModel.columns = parseInt(value);
    };

    const onChangeRowGapHandler = (e) => {
        const value = e.target.value ?? 0;
        gridViewModel.rowGap = parseInt(value);
    };

    const onChangeColumnGapHandler = (e) => {
        const value = e.target.value ?? 0;
        gridViewModel.columnGap = parseInt(value);
    };

    const squareWidth = elementViewModel.getElementWidth(initialShapeData.position.columnStart, initialShapeData.position.columnEnd);
    const squareHeight = elementViewModel.getElementHeight(initialShapeData.position.rowStart, initialShapeData.position.rowEnd);

    const addShapeHandler = () => {
        positionerMethods.addShape(elementId);
        outlineMethods.addOutlineById(elementId, {...initialShapeData.position}, squareWidth, squareHeight);
        elementViewModel.addElementData(elementId, {width: squareWidth, height: squareHeight});
    };
    
    const addRowHandler = () => {
        gridViewModel.rows = gridViewModel.rows + 1;
    };

    return (
        <div style={{position: 'fixed', bottom: 0}}>
            <div>columns count: {gridViewModel.columns} : {gridViewModel.gridWidth} : {gridViewModel.cellWidth}</div>

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