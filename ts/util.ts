import { _GLOBAL } from './core';

const { drags, drops } = _GLOBAL;

export const listen = (
    el: EventTarget,
    eventType: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
) => {
    el.addEventListener(eventType, listener, options || {});
    return () => {
        el.removeEventListener(eventType, listener, options || {});
    };
};

export function clamp(value: number, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
}

export function matches(el: Element, selectors: string | string[]) {
    if (!selectors || selectors.length === 0) return true;

    if (typeof selectors === 'string') selectors = [selectors];

    if (!(selectors instanceof Array)) return false;

    return selectors.some(selector => el.matches(selector));
}

/**
 * Returns the proportion of `el` that overlaps with `other`.
 *
 * @param A
 * @param B
 */
export function overlapPct(A: Element, B: Element) {
    if (!(A.getBoundingClientRect && B.getBoundingClientRect)) return 0;
    const {
        left: l,
        right: r,
        top: t,
        bottom: b,
        height: h,
        width: w,
    } = A.getBoundingClientRect();
    const {
        left: otherL,
        right: otherR,
        top: otherT,
        bottom: otherB,
    } = B.getBoundingClientRect();
    const overlapW = clamp(Math.min(r, otherR) - Math.max(l, otherL), 0, w);
    const overlapH = clamp(Math.min(b, otherB) - Math.max(t, otherT), 0, h);
    return (overlapW * overlapH) / (w * h);
}

export function overlapPx(A: Element, B: Element) {
    if (A && B && [A, B].every(el => el.getBoundingClientRect)) {
        
    }


}

export function is(
    el: Element,
    type?: 'drag' | 'drop' | 'draggable' | 'droppable' | null
) {
    const { drags, drops } = _GLOBAL;
    switch (type) {
        case 'drag':
        case 'draggable':
            return drags.has(el);
            break;
        case 'drop':
        case 'droppable':
            return drops.has(el);
            break;
        default:
            return drags.has(el) || drops.has(el);
    }
}

export function clear(el) {
    const { drags, drops } = _GLOBAL;

    if (drags.has(el)) {
        const { onmousedown, onmousemove, onmouseup } = drags.get(el);
        el.removeEventListener('mousedown', onmousedown);
        document.removeEventListener('mousemove', onmousemove);
        document.removeEventListener('mouseup', onmouseup);
    }

    if (drops.has(el)) {
        const { ondragstart, ondrag, ondragend } = drops.get(el);
        document.removeEventListener('dragstart', ondragstart);
        document.removeEventListener('drag', ondrag);
        document.removeEventListener('dragend', ondragend);
    }
}

export function canDrop(droppable: Element, dragged: Element) {
    const accepts = dragged.getAttribute('drop-accepts') || '';
    const overlap = parseFloat(dragged.getAttribute('drop-overlap')) || 0.5;

    return (
        matches(dragged, accepts) && overlapPct(dragged, droppable) > overlap
    );
}

export function _chain(...fns: Function[]) {
    return arg => fns.reduce((result, fn) => fn(result), arg);
}
