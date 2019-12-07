import { _GLOBAL, _eventInit, DropData, ShftEvent, dispatch } from './core';
import { is, matches, canDrop } from './util';

const { drops } = _GLOBAL;

export function drop(el, options?: { accepts?: string; overlap?: number }) {
    if (is(el, 'drop')) return;

    const { accepts, overlap } = Object.assign({ accepts: null, overlap: 0.5 }, options || {});

    const data: DropData = {
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

function _dragstartFn(el: Element) {
    return (e: ShftEvent) => {
        if (!drops.has(el)) return;

        const dragged = e.moveTarget;
        const { accepts, ondrag, ondragend } = drops.get(el);

        if (matches(dragged, accepts)) {
            dispatch(el, 'dropopen', { relatedTarget: dragged });
            document.addEventListener('drag', ondrag);
            document.addEventListener('dragend', ondragend, { once: true });
        }
    };
}

function _dragFn(el: Element) {
    return (e: ShftEvent) => {
        const dragged = e.moveTarget;
        const { accepts, content } = drops.get(el);

        if (matches(dragged, accepts)) {
            if (canDrop(el, dragged)) {
                if (!content.has(dragged)) {
                    content.add(dragged);
                    dispatch(el, 'dragenter', _eventInit(e, { relatedTarget: dragged }));
                }

                dispatch(el, 'dragover', _eventInit(e, { relatedTarget: dragged }));
            } else {
                if (content.has(dragged)) {
                    content.delete(dragged);
                    dispatch(el, 'dragleave', _eventInit(e, { relatedTarget: dragged }));
                }
            }
        }
    };
}

function _dragendFn(el: Element) {
    return (e: ShftEvent) => {
        const dragged = e.moveTarget;
        const { ondrag } = drops.get(el);

        dispatch(el, 'dropclose', _eventInit(e, { relatedTarget: dragged }));
        document.removeEventListener('drag', ondrag);

        if (canDrop(el, dragged)) {
            dispatch(el, 'drop', _eventInit(e, { relatedTarget: dragged }));
        }
    };
}
