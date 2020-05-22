type ShftJsData = {
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

export const _GLOBAL: ShftJsData = (function _init(obj) {
    const data = obj['_SHFTJS'] || {};

    ['drags', 'drops'].forEach(type => {
        if (!data[type]) data[type] = new WeakMap();
    });

    return (obj['_SHFTJS'] = data);
})(window);

const EVENTINIT_KEYS = [
    /* EventInit */
    'bubbles',
    'cancelable',
    'composed',

    /* UiEventInit */
    'detail',
    'view',

    /* EventModifierInit */
    'altKey',
    'ctrlKey',
    'metaKey',
    'shiftKey',

    /* MouseEventInit */
    'button',
    'buttons',
    'clientX',
    'clientY',
    'movementX',
    'movementY',
    'relatedTarget',
    'screenX',
    'screenY',
];

export interface ShftEvent extends MouseEvent {
    shftTarget?: Element;
}

/**
 * Copies and returns `MouseEventInit` properties from an existing `MouseEvent`.
 * @param e
 * @param overrides
 */
export function eventInit(
    e: MouseEvent,
    overrides: object = {}
): MouseEventInit {
    const init = {};
    EVENTINIT_KEYS.forEach(key => {
        init[key] = e[key];
    });

    return Object.assign(init, overrides);
}

/**
 * Constructs and dispatches a custom `MouseEvent` with property `shftTarget` set to `element`.
 * @param element
 * @param typeArg
 * @param options
 * @returns The constructed event.
 */
export function dispatch(
    element: Element,
    typeArg: string,
    options: MouseEventInit = {}
): MouseEvent {
    const ev = new MouseEvent(typeArg, options) as ShftEvent;
    ev.shftTarget = element;
    element.dispatchEvent(ev);
    return ev;
}
