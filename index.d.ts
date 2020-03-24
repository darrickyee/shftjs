interface DragData {
    onmousedown: (ev: MouseEvent) => any;
    onmousemove: (ev: MouseEvent) => any;
    onmouseup: (ev: MouseEvent) => any;
}
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

declare function drag(el: Element): void;

declare function drop(el: any, options?: {
    accepts?: string;
    overlap?: number;
}): void;

declare function matches(el: Element, selectors?: string | string[]): boolean;
declare function is(el: Element, type?: 'drag' | 'drop' | 'draggable' | 'droppable' | null): boolean;
declare function clear(el: any): void;

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
