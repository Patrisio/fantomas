import {initialShapeData} from '../../section/components/element/components/positioner/constants';
import {v4 as uuid} from 'uuid';
import {ShapeType} from '../../section/components/element/components/positioner';
import {page} from '../../page';
import {useState} from 'react';

export const Debug = () => {
    const [section, setSection] = useState(null);

    const onChangeRowsHandler = (e) => {
        const value = e.target.value ?? 1;
        section.gridVM.rows = parseInt(value);
    };

    const onChangeColumnsHandler = (e) => {
        const value = e.target.value ?? 0;
        section.gridVM.columns = parseInt(value)
        section.gridVM.columns = parseInt(value);
    };

    const onChangeRowGapHandler = (e) => {
        const value = e.target.value ?? 0;
        section.gridVM.rowGap = parseInt(value);
    };

    const onChangeColumnGapHandler = (e) => {
        const value = e.target.value ?? 0;
        section.gridVM.columnGap = parseInt(value);
    };

    const squareWidth = section?.gridVM.getElementWidth(initialShapeData.position.columnStart, initialShapeData.position.columnEnd);
    const squareHeight = section?.gridVM.getElementHeight(initialShapeData.position.rowStart, initialShapeData.position.rowEnd);

    const addShapeHandler = () => {
        const elementId = uuid();
        console.log(section.gridVM.cellWidth, section.gridVM.gridCellHeight, '__SUPER__', squareWidth, squareHeight);
        section.addElement(elementId, {
            width: squareWidth,
            height: squareHeight,
            minWidth: section.gridVM.cellWidth,
            minHeight: section.gridVM.gridCellHeight,
            shapeType: ShapeType.SQUARE,
            initialData: {...initialShapeData.position},
        });
    };
    
    // const addRowHandler = () => {
    //     gridViewModel.rows = gridViewModel.rows + 1;
    // };

    const addSectionHandler = () => {
        const section = page.addSection();
        setSection(section);
    };

    return (
        <div style={{position: 'fixed', bottom: 0}}>
            <div>columns count: {section?.gridVM.columns} : {section?.gridVM.gridWidth} : {section?.gridVM.cellWidth}</div>

            <label>rows</label>
            <input onChange={onChangeRowsHandler} type="number" min={1} />

            <label>columns</label>
            <input onChange={onChangeColumnsHandler} type="number" min={1} />

            <label>rowGap</label>
            <input onChange={onChangeRowGapHandler} type="number" min={1} />

            <label>columnGap</label>
            <input onChange={onChangeColumnGapHandler} type="number" min={1} />

            {/* <button onClick={addRowHandler}>add row</button> */}

            <button onClick={addShapeHandler}>add shape</button>

            <button onClick={addSectionHandler}>add section</button>
        </div>
    );
};
