import {SectionVM} from '../section';
import {makeAutoObservable, toJS} from 'mobx';

export class PageEditor {
    constructor(
        private page: any,
    ) {
        makeAutoObservable(this);
    }

    addSection() {
        const section = new SectionVM();

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
