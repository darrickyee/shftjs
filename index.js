const _GLOBAL = (function _init(obj) {
    const data = obj._SHFTJS || {};
    ['drags', 'drops'].forEach(type => {
        if (!data[type])
            data[type] = new WeakMap();
    });
    return (obj._SHFTJS = data);
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
function eventInit(e, overrides = {}) {
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
function dispatch(element, typeArg, options = {}) {
    const ev = new MouseEvent(typeArg, options);
    ev.shftTarget = element;
    element.dispatchEvent(ev);
    return ev;
}

const { drags, drops } = _GLOBAL;
function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
}
function matches(el, selectors) {
    if (!selectors)
        return true;
    if (typeof selectors === 'string')
        selectors = [selectors];
    if (!(selectors instanceof Array))
        return false;
    return selectors.some(selector => el.matches(selector));
}
function overlapPct(el, other) {
    const { left: l, right: r, top: t, bottom: b, height: h, width: w } = el.getBoundingClientRect();
    const { left: otherL, right: otherR, top: otherT, bottom: otherB } = other.getBoundingClientRect();
    const overlapW = clamp(Math.min(r, otherR) - Math.max(l, otherL), 0, w);
    const overlapH = clamp(Math.min(b, otherB) - Math.max(t, otherT), 0, h);
    return (overlapW * overlapH) / (w * h);
}
function is(el, type) {
    const { drags, drops } = _GLOBAL;
    switch (type) {
        case 'drag':
        case 'draggable':
            return drags.has(el);
        case 'drop':
        case 'droppable':
            return drops.has(el);
        default:
            return drags.has(el) || drops.has(el);
    }
}
function clear(el) {
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
function canDrop(droppable, dragged) {
    const { accepts, overlap } = drops.get(droppable);
    return (matches(dragged, accepts) && overlapPct(dragged, droppable) > overlap);
}

const { drags: drags$1 } = _GLOBAL;
function drag(el) {
    if (is(el, 'drag'))
        return;
    const data = {
        onmousedown: _mousedownFn(el),
        onmousemove: _mousemoveFn(el),
        onmouseup: _mouseupFn(el)
    };
    el.addEventListener('mousedown', data.onmousedown);
    drags$1.set(el, data);
}
function _mousedownFn(el) {
    return (e) => {
        const { onmousemove, onmouseup } = drags$1.get(el);
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
        const { onmousemove } = drags$1.get(el);
        dispatch(el, 'dragend', eventInit(e));
        document.removeEventListener('mousemove', onmousemove);
    };
}

const { drops: drops$1 } = _GLOBAL;
function drop(el, options) {
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
    drops$1.set(el, data);
}
function _dragstartFn(el) {
    return (e) => {
        if (!drops$1.has(el))
            return;
        const dragged = e.shftTarget;
        const { accepts, ondrag, ondragend } = drops$1.get(el);
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
        const { accepts, content } = drops$1.get(el);
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
        const { ondrag } = drops$1.get(el);
        dispatch(el, 'dropclose', eventInit(e, { relatedTarget: dragged }));
        dragged.removeEventListener('drag', ondrag);
        if (canDrop(el, dragged)) {
            dispatch(el, 'drop', eventInit(e, { relatedTarget: dragged }));
        }
    };
}

function defaultmove(e) {
    const el = e.target;
    if (!['absolute', 'relative'].some(pos => pos === el.style.position))
        el.style.position = 'relative';
    ['left', 'top'].forEach(axis => {
        let pos = parseFloat(el.style[axis]) || 0;
        pos += axis === 'left' ? e.movementX : e.movementY;
        el.style[axis] = `${pos}px`;
    });
}
var shft = {
    drag,
    drop,
    util: { clear, defaultmove, is, matches },
    _GLOBAL
};

export default shft;
