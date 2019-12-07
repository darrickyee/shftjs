export declare function clamp(value: number, min?: number, max?: number): number;
export declare function matches(el: Element, selectors?: string | string[]): boolean;
export declare function overlapPct(el: Element, other: Element): number;
export declare function is(el: Element, type?: 'drag' | 'drop' | 'draggable' | 'droppable' | null): boolean;
export declare function clear(el: any): void;
export declare function canDrop(droppable: Element, dragged: Element): boolean;
