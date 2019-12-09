import { _GLOBAL, eventInit, dispatch } from './core';
import { is, matches, canDrop } from './util';
const { drops } = _GLOBAL;
export function drop(el, options) {
    if (is(el, 'drop'))
        return;
    const { accepts, overlap } = Object.assign({ accepts: null, overlap: 0.5 }, options || {});
    const data = {
        content: new WeakSet(),
        ondragstart: _dragstartFn(el),
        ondrag: _dragFn(el),
        ondragend: _dragendFn(el),
        accepts,
        overlap
    };
    document.addEventListener('dragstart', data.ondragstart);
    drops.set(el, data);
}
function _dragstartFn(el) {
    return (e) => {
        if (!drops.has(el))
            return;
        const dragged = e.shftTarget;
        const { accepts, ondrag, ondragend } = drops.get(el);
        if (matches(dragged, accepts)) {
            dispatch(el, 'dropopen', { relatedTarget: dragged });
            dragged.addEventListener('drag', ondrag);
            dragged.addEventListener('dragend', ondragend, { once: true });
        }
    };
}
function _dragFn(el) {
    return (e) => {
        const dragged = e.shftTarget;
        const { accepts, content } = drops.get(el);
        if (matches(dragged, accepts)) {
            if (canDrop(el, dragged)) {
                if (!content.has(dragged)) {
                    content.add(dragged);
                    dispatch(el, 'dragenter', eventInit(e, { relatedTarget: dragged }));
                }
                dispatch(el, 'dragover', eventInit(e, { relatedTarget: dragged }));
            }
            else {
                if (content.has(dragged)) {
                    content.delete(dragged);
                    dispatch(el, 'dragleave', eventInit(e, { relatedTarget: dragged }));
                }
            }
        }
    };
}
function _dragendFn(el) {
    return (e) => {
        const dragged = e.shftTarget;
        const { ondrag } = drops.get(el);
        dispatch(el, 'dropclose', eventInit(e, { relatedTarget: dragged }));
        dragged.removeEventListener('drag', ondrag);
        if (canDrop(el, dragged)) {
            dispatch(el, 'drop', eventInit(e, { relatedTarget: dragged }));
        }
    };
}
//# sourceMappingURL=drop.js.map