export const _GLOBAL = (function _init(obj) {
    const data = obj['_SHFTJS'] || {};
    ['drags', 'drops'].forEach(type => {
        if (!data[type])
            data[type] = new WeakMap();
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
/**
 * Copies and returns `MouseEventInit` properties from an existing `MouseEvent`.
 * @param e
 * @param overrides
 */
export function eventInit(e, overrides = {}) {
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
export function dispatch(element, typeArg, options = {}) {
    const ev = new MouseEvent(typeArg, options);
    ev.shftTarget = element;
    element.dispatchEvent(ev);
    return ev;
}
//# sourceMappingURL=core.js.map