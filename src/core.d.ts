declare type ShftJsData = {
    drags: WeakMap<Element, DragData>;
    drops: WeakMap<Element, DropData>;
};
export interface DragData {
    onmousedown: (ev: MouseEvent) => any;
    onmousemove: (ev: MouseEvent) => any;
    onmouseup: (ev: MouseEvent) => any;
}
export interface DropData {
    accepts?: string | string[] | null;
    overlap?: number | null;
    content: WeakSet<Element>;
    ondragstart: (e: ShftEvent) => any;
    ondrag: (e: ShftEvent) => any;
    ondragend: (e: ShftEvent) => any;
}
export declare const _GLOBAL: ShftJsData;
export interface ShftEvent extends MouseEvent {
    shftTarget?: Element;
}
/**
 * Copies and returns `MouseEventInit` properties from an existing `MouseEvent`.
 * @param e
 * @param overrides
 */
export declare function eventInit(e: MouseEvent, overrides?: object): MouseEventInit;
/**
 * Constructs and dispatches a custom `MouseEvent` with property `shftTarget` set to `element`.
 * @param element
 * @param typeArg
 * @param options
 * @returns The constructed event.
 */
export declare function dispatch(element: Element, typeArg: string, options?: MouseEventInit): MouseEvent;
export {};
