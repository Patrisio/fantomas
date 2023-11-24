import {createContext} from 'react';
import {OutlineContext} from './types';

const noop = () => {};

export default createContext<OutlineContext>({
    state: {},
    methods: {},
});
