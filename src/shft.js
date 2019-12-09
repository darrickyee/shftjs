import { drag } from './drag';
import { drop } from './drop';
import { is, matches, clear } from './util';
import { _GLOBAL } from './core';
function defaultmove(e) {
    const el = e.target;
    if (!['absolute', 'relative'].includes(el.style.position))
        el.style.position = 'relative';
    ['left', 'top'].forEach(axis => {
        let pos = parseFloat(el.style[axis]) || 0;
        pos += axis === 'left' ? e.movementX : e.movementY;
        el.style[axis] = `${pos}px`;
    });
}
export default {
    drag,
    drop,
    util: { clear, defaultmove, is, matches },
    _GLOBAL
};
//# sourceMappingURL=shft.js.map