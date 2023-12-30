import {SectionVM} from '../section';
import {GridVM} from '../section/components/grid';

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

    addSection(gridViewModel?: any) {
        let section;

        if (gridViewModel) {
            section = new SectionVM(gridViewModel);
        } else {
            const gridVM = new GridVM();
            section = new SectionVM(gridVM);
        }

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
