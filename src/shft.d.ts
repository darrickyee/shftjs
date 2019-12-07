import { drag } from './drag';
import { drop } from './drop';
import { is, matches, clear } from './util';
declare function defaultmove(e: DragEvent): void;
declare const _default: {
    drag: typeof drag;
    drop: typeof drop;
    util: {
        clear: typeof clear;
        defaultmove: typeof defaultmove;
        is: typeof is;
        matches: typeof matches;
    };
};
export default _default;
