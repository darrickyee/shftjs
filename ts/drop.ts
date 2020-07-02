import { eventInit, ShftEvent, dispatch } from './core';
import { listen, overlapPct } from './util';

/**
 * Add as listener to draggable's `dragstart` event
 * @param el Droppable that will react to draggable
 */
class DropListener {
    el: Element;
    remove: () => void;
    dropover: boolean;

    constructor(el: Element) {
        this.el = el;
        this.remove = () => {};
        this.dropover = false;
    }

    get accepts() {
        return this.el.getAttribute('drop-accepts') || '';
    }

    get overlap() {
        return parseFloat(this.el.getAttribute('drop-overlap')) || 0.5;
    }

    canAccept(draggable: Element) {
        return this.accepts ? draggable.matches(this.accepts) : true;
    }

    canDrop(draggable: Element) {
        return overlapPct(draggable, this.el) >= this.overlap;
    }

    handleEvent({ detail: { shftTarget } }: CustomEvent) {
        if (shftTarget && this.canAccept(shftTarget)) {
            // Set drop to open
            dispatch(this.el, 'dropopen', { relatedTarget: shftTarget });
            this.el.setAttribute('drop-open', '');

            // Listen for drag events
            this.remove = listen(
                shftTarget,
                'drag',
                this.dragListener.bind(this)
            );
            shftTarget.addEventListener(
                'dragend',
                this.dragEndListener.bind(this),
                {
                    once: true,
                }
            );
        }
    }

    dragListener({ shftTarget }: ShftEvent) {
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

    dragEndListener({ shftTarget }: ShftEvent) {
        this.remove();
        this.remove = () => {};

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

let DROPS: Element[] = [];

const listener = ({ shftTarget }: ShftEvent) => {
    DROPS = DROPS.filter(el => el.isConnected);
    DROPS.forEach(el => {
        el.dispatchEvent(
            new CustomEvent('_dragstart', { detail: { shftTarget } })
        );
    });
};

export const isDrop = (el: Element) => DROPS.includes(el);

export const undrop = (el: Element) => {
    DROPS = DROPS.filter(
        droppable => droppable.isConnected && el !== droppable
    );
};

Object.assign(window, { DROPS });

export function drop(
    el: Element,
    options = {
        accepts: '',
        overlap: 0.5,
    }
) {
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
