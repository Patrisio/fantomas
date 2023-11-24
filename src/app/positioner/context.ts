import {createContext} from 'react';
import {PositionerContext} from './types';

const noop = () => {};

export default createContext<PositionerContext>({});
