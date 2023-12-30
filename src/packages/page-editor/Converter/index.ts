import {Page} from '../entity/Page';
import {ShapeVM, ButtonVM} from '../library/elements';
import {GridVM} from '../section/components/grid';

export class Converter {
    private page: any;

    constructor(
        private pageConfig: any,
    ) {
        this.page = this.createPage();
    }

    private createPage() {
        const page = new Page();

        for (let sectionConfig of this.pageConfig) {
            const {elements, grid: gridConfig} = sectionConfig;

            const section = this.createSection(page, gridConfig);

            for (let elementConfig of elements) {
                this.createElement(section, elementConfig);
            }
        }

        return page;
    }

    private createSection(page, gridConfig) {
        const gridVM = new GridVM(
            gridConfig.rows,
            gridConfig.columns,
            gridConfig.rowGap,
            gridConfig.columnGap,
            gridConfig.maxRowsCount,
            gridConfig.gridCellHeight,
        );
        const section = page.addSection(gridVM);
        return section;
    }

    private createElement(section, elementConfig) {
        const {
            position,
            minWidth,
            minHeight,
            width,
            height,
            type,
        } = elementConfig;
        
        let element;
        
        switch (type) {
            case 'SHAPE':
                element = new ShapeVM(
                    section.gridVM,
                    width,
                    height,
                    minWidth,
                    minHeight,
                    position,
                );
                break;
            case 'BUTTON':
                element = new ButtonVM(
                    section.gridVM,
                    width,
                    height,
                    minWidth,
                    minHeight,
                    position,
                );
                break;
            default:
                throw new Error('Переданного типа элемента не существует в системе.');
        }

        section.addElement(element);
    }

    private getElementByType(type, elementInputData) {
        switch (type) {
            case 'SHAPE':
                return new ShapeVM(...elementInputData);
            case 'BUTTON':
                return new ButtonVM(elementInputData);
            default:
                throw new Error('Переданного типа элемента не существует в системе.');
        }
    }

    getPage() {
        return this.page;
    }
}
