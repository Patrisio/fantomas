import {BlankPage, SimplePage} from './templates';

export class PageTemplateFactory {
    static createBlankPage() {
        return new BlankPage();
    }

    static createSimplePage() {
        return new SimplePage();
    }
}
