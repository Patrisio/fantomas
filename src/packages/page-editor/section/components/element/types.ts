import {ElementType} from './components/positioner/types';

export type ElementData = {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
};

export type ElementConfig = Record<ElementType, ElementData>;

type Bounds = {top: boolean, bottom: boolean, left: boolean, right: boolean};

type ElementState = Map<string, ElementData>;

type ElementMethods = {
    addElementData: (id: string, elementData: ElementData) => void;
    updateElementWidth: (id: string, width: number) => void;
    updateElementHeight: (id: string, height: number) => void;
    setMinOffsetWidthAndHeight: (e: any) => void;
};

type ElementQueries = {
    getElementWidth: (columnStart: number, columnEnd: number) => number;
    getElementHeight: (rowStart: number, rowEnd: number) => number;
    getElementConfigByShapeType: (elementType: ElementType) => {minWidth: number, minHeight: number};
};

export type ElementContext = {
    state: ElementState;
    methods: ElementMethods;
    queries: ElementQueries;
};
