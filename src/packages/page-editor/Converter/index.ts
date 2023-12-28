import {Page} from '../entity/Page';

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
        const section = page.addSection(
            gridConfig.rows,
            gridConfig.columns,
            gridConfig.rowGap,
            gridConfig.columnGap,
            gridConfig.maxRowsCount,
            gridConfig.gridCellHeight,
        );
        return section;
    }

    private createElement(section, elementConfig) {
        const {
            initialData,
            minWidth,
            minHeight,
            shapeType,
            width,
            height
        } = elementConfig;
        section.addElement({
            width,
            height,
            minWidth,
            minHeight,
            shapeType,
            initialData,
        });
    }

    getPage() {
        return this.page;
    }
}
