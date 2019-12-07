export const _GLOBAL = (function _init(obj) {
    const data = obj._MOVEJS || {};
    ['drags', 'drops'].forEach(type => {
        if (!data[type])
            data[type] = new WeakMap();
    });
    return (obj._MOVEJS = data);
})(global);
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
    'screenY'
];
/**
 * Copies and returns `MouseEventInit` properties from an existing `MouseEvent`.
 * @param e
 * @param overrides
 */
export function _eventInit(e, overrides = {}) {
    const eventInit = {};
    EVENTINIT_KEYS.forEach(key => {
        eventInit[key] = e[key];
    });
    return Object.assign(eventInit, overrides);
}
/**
 * Constructs and dispatches a custom `MouseEvent` with property `moveTarget` set to `element`.
 * @param element
 * @param typeArg
 * @param options
 * @returns The constructed event.
 */
export function dispatch(element, typeArg, options = {}) {
    const ev = new MouseEvent(typeArg, options);
    ev.moveTarget = element;
    element.dispatchEvent(ev);
    return ev;
}
//# sourceMappingURL=core.js.map