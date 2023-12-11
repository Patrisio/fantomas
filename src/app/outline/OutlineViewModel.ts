import type {OutlineData, OutlinePositionData} from './types';
import {initialOutlineData} from './constants';

class OutlineViewModel {
    outlineData = new Map<string, OutlineData>();

    addOutlineById(id: string, outlinePositionData: OutlinePositionData, width: number, height: number) {
        const outlineData = Object.assign(initialOutlineData, {
            position: outlinePositionData,
            width,
            height,
        });

        this.outlineData.set(id, outlineData);
    }
}

export const outlineViewModel = new OutlineViewModel();
