import { _GLOBAL, eventInit, dispatch } from './core';
import { is } from './util';
const { drags } = _GLOBAL;
export function drag(el) {
    if (is(el, 'drag'))
        return;
    const data = {
        onmousedown: _mousedownFn(el),
        onmousemove: _mousemoveFn(el),
        onmouseup: _mouseupFn(el)
    };
    el.addEventListener('mousedown', data.onmousedown);
    drags.set(el, data);
}
function _mousedownFn(el) {
    return (e) => {
        const { onmousemove, onmouseup } = drags.get(el);
        if (e.buttons === 1) {
            dispatch(el, 'dragstart', eventInit(e));
            document.addEventListener('mousemove', onmousemove);
            document.addEventListener('mouseup', onmouseup, {
                once: true
            });
        }
    };
}
function _mousemoveFn(el) {
    return (e) => {
        dispatch(el, 'drag', eventInit(e));
    };
}
function _mouseupFn(el) {
    return (e) => {
        const { onmousemove } = drags.get(el);
        dispatch(el, 'dragend', eventInit(e));
        document.removeEventListener('mousemove', onmousemove);
    };
}
//# sourceMappingURL=drag.js.map