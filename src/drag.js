import { eventInit, dispatch } from './core';
import { listen } from './util';
const DRAGS = new WeakMap();
export const drag = (el) => {
    if (el instanceof Element && !DRAGS.has(el)) {
        const listener = new DragListener(el);
        el.addEventListener('mousedown', listener);
        DRAGS.set(el, listener);
    }
    return el;
};
export const isDrag = (el) => DRAGS.has(el);
export const undrag = (el) => {
    el.removeEventListener('mousedown', DRAGS.get(el));
    DRAGS.delete(el);
};
Object.assign(window, { isDrag, undrag });
class DragListener {
    constructor(el) {
        this.el = el;
    }
    handleEvent(e) {
        if (e.buttons === 1) {
            dispatch(this.el, 'dragstart', eventInit(e));
            this.el.setAttribute('is-dragging', '');
            const remove = listen(document, 'mousemove', e => {
                dispatch(this.el, 'drag', eventInit(e));
            });
            document.addEventListener('mouseup', e => {
                remove();
                this.el.removeAttribute('is-dragging');
                dispatch(this.el, 'dragend', eventInit(e));
            }, { once: true });
        }
    }
}
//# sourceMappingURL=drag.js.map