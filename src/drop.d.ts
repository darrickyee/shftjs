export declare const isDrop: (el: Element) => boolean;
export declare const undrop: (el: Element) => void;
export declare function drop(el: Element, options?: {
    accepts: string;
    overlap: number;
}): Element;
