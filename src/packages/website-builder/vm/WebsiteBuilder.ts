import {makeAutoObservable} from 'mobx';
import {PageEditorVM, PageTemplateFactory} from '../../page-editor';

// import pageConfigExample from '../../page-editor/Converter/pageConfigExample.json';
// import {Converter} from '../../page-editor/Converter';

export class WebsiteBuilder {
    private pagesMap = new Map();
    public pageEditor: any;

    constructor() {
        makeAutoObservable(this);
        // console.log(pageConfigExample, '__pageConfigExample__');
        const page = PageTemplateFactory.createBlankPage();
        // const page = new Converter(pageConfigExample).getPage();
        console.log(page, '__RESSSSS___');
        this.addPage(page);
        this.pageEditor = new PageEditorVM(page);
    }

    private addPage(page: any) {
        this.pagesMap.set(page.id, page);
        
        return page;
    }

    get pageList() {
        return [...this.pagesMap.values()];
    }
}
