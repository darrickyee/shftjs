import { eventInit, dispatch } from './core';
import { is, listen } from './util';

const DRAGS = new WeakMap<Element, DragListener>();

export const drag = (el: Element) => {
    if (el instanceof Element && !DRAGS.has(el)) {
        const listener = new DragListener(el);
        el.addEventListener('mousedown', listener);
        DRAGS.set(el, listener);
    }

    return el;
};

export const isDrag = (el: Element) => DRAGS.has(el);

export const undrag = (el: Element) => {
    el.removeEventListener('mousedown', DRAGS.get(el));
    DRAGS.delete(el);
};

Object.assign(window, { isDrag, undrag });

class DragListener {
    el: Element;

    constructor(el: Element) {
        this.el = el;
    }

    handleEvent(e: MouseEvent) {
        if (e.buttons === 1) {
            dispatch(this.el, 'dragstart', eventInit(e));
            this.el.setAttribute('is-dragging', '');

            const remove = listen(document, 'mousemove', e => {
                dispatch(this.el, 'drag', eventInit(e as MouseEvent));
            });

            document.addEventListener(
                'mouseup',
                e => {
                    remove();
                    this.el.removeAttribute('is-dragging');
                    dispatch(this.el, 'dragend', eventInit(e));
                },
                { once: true }
            );
        }
    }
}
