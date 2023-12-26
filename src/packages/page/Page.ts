import {v4 as uuid} from 'uuid';
import {SectionViewModel} from '../section';
import {makeAutoObservable} from 'mobx';

export class Page {
    private sectionsMap = new Map();

    constructor() {
        makeAutoObservable(this);
        // this.addSection();
    }

    addSection() {
        const sectionId = uuid();
        const section = new SectionViewModel();

        this.sectionsMap.set(sectionId, section);
        
        return section;
    }

    get sectionEntries() {
        return [...this.sectionsMap.entries()];
    }
}


export const page = new Page();
