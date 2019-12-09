import { drag } from './drag';
import { drop } from './drop';
import { is, matches, clear } from './util';
import { DragData, DropData } from './core';
declare function defaultmove(e: MouseEvent): void;
declare const _default: {
    drag: typeof drag;
    drop: typeof drop;
    util: {
        clear: typeof clear;
        defaultmove: typeof defaultmove;
        is: typeof is;
        matches: typeof matches;
    };
    _GLOBAL: {
        drags: WeakMap<Element, DragData>;
        drops: WeakMap<Element, DropData>;
    };
};
export default _default;
