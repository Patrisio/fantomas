import {SectionVM} from '../section';
import {GridVM} from '../section/components/grid';

import {makeAutoObservable} from 'mobx';

export class PageEditor {
    constructor(
        private page: any,
    ) {
        makeAutoObservable(this);
    }

    addSection() {
        const gridVM = new GridVM();
        const section = new SectionVM(gridVM);

        this.page.getSections().set(section.id, section);

        return section;
    }

    getPageConfig() {
        return this.page.getConfig();
    }

    get sectionList() {
        return [...this.page.sectionsMap.values()];
    }
}
