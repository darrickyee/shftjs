const _GLOBAL = (function _init(obj) {
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

const listen = (el, eventType, listener, options) => {
    el.addEventListener(eventType, listener, options || {});
    return () => {
        el.removeEventListener(eventType, listener, options || {});
    };
};
function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
}
function matches(el, selectors) {
    if (!selectors || selectors.length === 0)
        return true;
    if (typeof selectors === 'string')
        selectors = [selectors];
    if (!(selectors instanceof Array))
        return false;
    return selectors.some(selector => el.matches(selector));
}
/**
 * Returns the proportion of `el` that overlaps with `other`.
 *
 * @param A
 * @param B
 */
function overlapPct(A, B) {
    if (!(A.getBoundingClientRect && B.getBoundingClientRect))
        return 0;
    const { left: l, right: r, top: t, bottom: b, height: h, width: w, } = A.getBoundingClientRect();
    const { left: otherL, right: otherR, top: otherT, bottom: otherB, } = B.getBoundingClientRect();
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

const DRAGS = new WeakMap();
const drag = (el) => {
    if (el instanceof Element && !DRAGS.has(el)) {
        const listener = new DragListener(el);
        el.addEventListener('mousedown', listener);
        DRAGS.set(el, listener);
    }
    return el;
};
const isDrag = (el) => DRAGS.has(el);
const undrag = (el) => {
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

/**
 * Add as listener to draggable's `dragstart` event
 * @param el Droppable that will react to draggable
 */
class DropListener {
    constructor(el) {
        this.el = el;
        this.remove = () => { };
        this.dropover = false;
    }
    get accepts() {
        return this.el.getAttribute('drop-accepts') || '';
    }
    get overlap() {
        return parseFloat(this.el.getAttribute('drop-overlap')) || 0.5;
    }
    canAccept(draggable) {
        return this.accepts ? draggable.matches(this.accepts) : true;
    }
    canDrop(draggable) {
        return overlapPct(draggable, this.el) >= this.overlap;
    }
    handleEvent({ detail: { shftTarget } }) {
        if (shftTarget && this.canAccept(shftTarget)) {
            // Set drop to open
            dispatch(this.el, 'dropopen', { relatedTarget: shftTarget });
            this.el.setAttribute('drop-open', '');
            // Listen for drag events
            this.remove = listen(shftTarget, 'drag', this.dragListener.bind(this));
            shftTarget.addEventListener('dragend', this.dragEndListener.bind(this), {
                once: true,
            });
        }
    }
    dragListener({ shftTarget }) {
        const dropover = this.canDrop(shftTarget);
        if (dropover !== this.dropover) {
            [shftTarget, this.el].forEach((el, i, els) => {
                dispatch(el, dropover ? 'dragenter' : 'dragleave', {
                    relatedTarget: els[1 - i],
                });
            });
            const attrFn = dropover ? 'setAttribute' : 'removeAttribute';
            this.el[attrFn]('drop-over', '');
            this.dropover = dropover;
        }
        if (dropover) {
            [shftTarget, this.el].forEach((el, i, els) => {
                dispatch(el, 'dragover', { relatedTarget: els[1 - i] });
            });
        }
    }
    dragEndListener({ shftTarget }) {
        this.remove();
        this.remove = () => { };
        this.el.removeAttribute('drop-open');
        this.el.removeAttribute('drop-over');
        dispatch(this.el, 'drop-close', { relatedTarget: shftTarget });
        if (this.canDrop(shftTarget)) {
            [shftTarget, this.el].forEach((el, i, els) => {
                dispatch(el, 'drop', { relatedTarget: els[1 - i] });
            });
        }
    }
}
let DROPS = [];
const listener = ({ shftTarget }) => {
    DROPS = DROPS.filter(el => el.isConnected);
    DROPS.forEach(el => {
        el.dispatchEvent(new CustomEvent('_dragstart', { detail: { shftTarget } }));
    });
};
const isDrop = (el) => DROPS.includes(el);
Object.assign(window, { DROPS });
function drop(el, options = {
    accepts: '',
    overlap: 0.5,
}) {
    if (el instanceof Element && !isDrop(el)) {
        ['accepts', 'overlap'].forEach(opt => {
            el.setAttribute(`drop-${opt}`, options[opt]);
        });
        el.addEventListener('_dragstart', new DropListener(el));
        document.addEventListener('dragstart', listener);
        DROPS = [...DROPS.filter(droppable => droppable.isConnected), el];
    }
    return el;
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
