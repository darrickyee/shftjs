interface DropData {
    accepts?: string | string[] | null;
    overlap?: number | null;
    content: WeakSet<Element>;
    ondragstart: (e: ShftEvent) => any;
    ondrag: (e: ShftEvent) => any;
    ondragend: (e: ShftEvent) => any;
}
interface ShftEvent extends MouseEvent {
    shftTarget?: Element;
}

declare function drop(el: Element, options?: {
    accepts: string;
    overlap: number;
}): Element;

declare function matches(el: Element, selectors: string | string[]): boolean;
declare function is(el: Element, type?: 'drag' | 'drop' | 'draggable' | 'droppable' | null): boolean;
declare function clear(el: any): void;

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
        drops: WeakMap<Element, DropData>;
    };
};

export default _default;
