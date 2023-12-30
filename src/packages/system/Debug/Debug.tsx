import {initialShapeData} from '../../page-editor/element/components/positioner/constants';
import {useState} from 'react';
import {Converter} from '../../page-editor/Converter';
import {ShapeVM, ButtonVM} from '../../page-editor/library/elements';

export const Debug = ({page}) => {
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


    const addShapeHandler = () => {
        section.addElement(new ShapeVM(section.gridVM));

        // {
        //     width: squareWidth,
        //     height: squareHeight,
        //     minWidth: section.gridVM.cellWidth,
        //     minHeight: section.gridVM.gridCellHeight,
        //     position: {...initialShapeData.position},
        // }
    };

    const addButtonHandler = () => {
        section.addElement(new ButtonVM(section.gridVM));
    };

    // const addRowHandler = () => {
    //     gridViewModel.rows = gridViewModel.rows + 1;
    // };

    const addSectionHandler = () => {
        const section = page.addSection();
        setSection(section);
    };

    const getConfigHandler = () => {
        const pageConfig = page.getPageConfig();
        console.log(pageConfig, '__pageConfig__');
        const pageResult = new Converter(pageConfig).getPage();
        console.log(pageResult, '__PAGE__');
        localStorage.setItem('pageConfigExample', JSON.stringify(pageConfig));
    };

    // const renderPageHandler = () => {
    //     const pageConfig =localStorage.getItem('pageConfigExample');
    // };

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
            <button onClick={addButtonHandler}>add button</button>
            <button onClick={addSectionHandler}>add section</button>
            <button onClick={getConfigHandler}>get config</button>
            {/* <button onClick={renderPageHandler}>render page, using config from LS</button> */}
        </div>
    );
};
