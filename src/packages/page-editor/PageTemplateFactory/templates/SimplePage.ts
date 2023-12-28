import {Page} from '../../entity/Page';
import {ShapeType} from '../../section/components/element/components/positioner/types';

export class SimplePage extends Page {
    constructor() {
        super();
        this.createFirstSection();
        this.createSecondSection();
        this.createThirdSection();
    }

    private createFirstSection() {
        const section = this.addSection();
        const initialPosition = {
            rowStart: 3,
            rowEnd: 7,
            columnStart: 4,
            columnEnd: 6,
        }
        section.addElement({
            width: section?.gridVM.getElementWidth(initialPosition.columnStart, initialPosition.columnEnd),
            height: section?.gridVM.getElementHeight(initialPosition.rowStart, initialPosition.rowEnd),
            minWidth: section.gridVM.cellWidth,
            minHeight: section.gridVM.gridCellHeight,
            shapeType: ShapeType.SQUARE,
            initialData: {
                rowStart: initialPosition.rowStart,
                rowEnd: initialPosition.rowEnd,
                columnStart: initialPosition.columnStart,
                columnEnd: initialPosition.columnEnd,
            },
        });
    }

    private createSecondSection() {
        const section = this.addSection();
        const initialPosition = {
            rowStart: 8,
            rowEnd: 9,
            columnStart: 3,
            columnEnd: 8,
        }
        section.addElement({
            width: section?.gridVM.getElementWidth(initialPosition.columnStart, initialPosition.columnEnd),
            height: section?.gridVM.getElementHeight(initialPosition.rowStart, initialPosition.rowEnd),
            minWidth: section.gridVM.cellWidth,
            minHeight: section.gridVM.gridCellHeight,
            shapeType: ShapeType.SQUARE,
            initialData: {
                rowStart: initialPosition.rowStart,
                rowEnd: initialPosition.rowEnd,
                columnStart: initialPosition.columnStart,
                columnEnd: initialPosition.columnEnd,
            },
        });
    }

    private createThirdSection() {
        const section = this.addSection();

        const firstElementInitialPosition = {
            rowStart: 2,
            rowEnd: 8,
            columnStart: 15,
            columnEnd: 20,
        }
        section.addElement({
            width: section?.gridVM.getElementWidth(firstElementInitialPosition.columnStart, firstElementInitialPosition.columnEnd),
            height: section?.gridVM.getElementHeight(firstElementInitialPosition.rowStart, firstElementInitialPosition.rowEnd),
            minWidth: section.gridVM.cellWidth,
            minHeight: section.gridVM.gridCellHeight,
            shapeType: ShapeType.SQUARE,
            initialData: {
                rowStart: firstElementInitialPosition.rowStart,
                rowEnd: firstElementInitialPosition.rowEnd,
                columnStart: firstElementInitialPosition.columnStart,
                columnEnd: firstElementInitialPosition.columnEnd,
            },
        });

        const secondElementInitialPosition = {
            rowStart: 4,
            rowEnd: 7,
            columnStart: 3,
            columnEnd: 7,
        }
        section.addElement({
            width: section?.gridVM.getElementWidth(secondElementInitialPosition.columnStart, secondElementInitialPosition.columnEnd),
            height: section?.gridVM.getElementHeight(secondElementInitialPosition.rowStart, secondElementInitialPosition.rowEnd),
            minWidth: section.gridVM.cellWidth,
            minHeight: section.gridVM.gridCellHeight,
            shapeType: ShapeType.SQUARE,
            initialData: {
                rowStart: secondElementInitialPosition.rowStart,
                rowEnd: secondElementInitialPosition.rowEnd,
                columnStart: secondElementInitialPosition.columnStart,
                columnEnd: secondElementInitialPosition.columnEnd,
            },
        });
    }
}