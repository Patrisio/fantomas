import {SectionVM} from '../section';

import {makeObservable, action, observable} from 'mobx';
import {v4 as uuid} from 'uuid';

export class Page {
    public id = uuid();
    public sectionsMap = new Map();

    constructor() {
        makeObservable(this, {
            sectionsMap: observable,
            addSection: action.bound,
            getSections: action.bound,
        });
    }

    addSection(
        rows?: number,
        columns?: number,
        rowGap?: number,
        columnGap?: number,
        maxRowsCount?: number,
        gridCellHeight?: number,
    ) {
        const section = new SectionVM(
            rows,
            columns,
            rowGap,
            columnGap,
            maxRowsCount,
            gridCellHeight
        );

        this.sectionsMap.set(section.id, section);
        
        return section;
    }

    getSections() {
        return this.sectionsMap;
    }

    getConfig() {
        const config = [];
        this.sectionsMap
            .forEach((sectionVM) => {
                const sectionConfig = sectionVM.getConfig();
                config.push(sectionConfig);
            });
            
        return config;
    }
}
