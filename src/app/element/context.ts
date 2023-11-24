import {createContext} from 'react';
import {ElementContext} from './types';

const noop = () => {};

export default createContext<ElementContext>({});
