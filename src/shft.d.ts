import { drop } from './drop';
import { is, matches, clear } from './util';
declare function defaultmove(e: MouseEvent): void;
declare const _default: {
    drag: (el: Element) => Element;
    drop: typeof drop;
    util: {
        clear: typeof clear;
        defaultmove: typeof defaultmove;
        is: typeof is;
        matches: typeof matches;
    };
    _GLOBAL: {
        drags: WeakMap<Element, any>;
        drops: WeakMap<Element, import("./core").DropData>;
    };
};
export default _default;
