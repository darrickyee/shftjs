export declare const listen: (el: EventTarget, eventType: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => () => void;
export declare function clamp(value: number, min?: number, max?: number): number;
export declare function matches(el: Element, selectors: string | string[]): boolean;
/**
 * Returns the proportion of `el` that overlaps with `other`.
 *
 * @param A
 * @param B
 */
export declare function overlapPct(A: Element, B: Element): number;
export declare function overlapPx(A: Element, B: Element): void;
export declare function is(el: Element, type?: 'drag' | 'drop' | 'draggable' | 'droppable' | null): boolean;
export declare function clear(el: any): void;
export declare function canDrop(droppable: Element, dragged: Element): boolean;
export declare function _chain(...fns: Function[]): (arg: any) => any;
