(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["shftjs"] = factory();
	else
		root["shftjs"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ts/shft.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../Program Files/nodejs/node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./ts/core.ts":
/*!********************!*\
  !*** ./ts/core.ts ***!
  \********************/
/*! exports provided: _GLOBAL, eventInit, dispatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_GLOBAL", function() { return _GLOBAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventInit", function() { return eventInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return dispatch; });
const _GLOBAL = (function _init(obj) {
    const data = obj._MOVEJS || {};
    ['drags', 'drops'].forEach(type => {
        if (!data[type])
            data[type] = new WeakMap();
    });
    return (obj._MOVEJS = data);
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../Program Files/nodejs/node_modules/webpack/buildin/global.js */ "../../../../../Program Files/nodejs/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./ts/drag.ts":
/*!********************!*\
  !*** ./ts/drag.ts ***!
  \********************/
/*! exports provided: drag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drag", function() { return drag; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./ts/core.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./ts/util.ts");


const { drags } = _core__WEBPACK_IMPORTED_MODULE_0__["_GLOBAL"];
function drag(el) {
    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["is"])(el, 'drag'))
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
            Object(_core__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(el, 'dragstart', Object(_core__WEBPACK_IMPORTED_MODULE_0__["eventInit"])(e));
            document.addEventListener('mousemove', onmousemove);
            document.addEventListener('mouseup', onmouseup, {
                once: true
            });
        }
    };
}
function _mousemoveFn(el) {
    return (e) => {
        Object(_core__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(el, 'drag', Object(_core__WEBPACK_IMPORTED_MODULE_0__["eventInit"])(e));
    };
}
function _mouseupFn(el) {
    return (e) => {
        const { onmousemove } = drags.get(el);
        Object(_core__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(el, 'dragend', Object(_core__WEBPACK_IMPORTED_MODULE_0__["eventInit"])(e));
        document.removeEventListener('mousemove', onmousemove);
    };
}


/***/ }),

/***/ "./ts/drop.ts":
/*!********************!*\
  !*** ./ts/drop.ts ***!
  \********************/
/*! exports provided: drop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drop", function() { return drop; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./ts/core.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./ts/util.ts");


const { drops } = _core__WEBPACK_IMPORTED_MODULE_0__["_GLOBAL"];
function drop(el, options) {
    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["is"])(el, 'drop'))
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
        if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["matches"])(dragged, accepts)) {
            Object(_core__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(el, 'dropopen', { relatedTarget: dragged });
            dragged.addEventListener('drag', ondrag);
            dragged.addEventListener('dragend', ondragend, { once: true });
        }
    };
}
function _dragFn(el) {
    return (e) => {
        const dragged = e.shftTarget;
        const { accepts, content } = drops.get(el);
        if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["matches"])(dragged, accepts)) {
            if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["canDrop"])(el, dragged)) {
                if (!content.has(dragged)) {
                    content.add(dragged);
                    Object(_core__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(el, 'dragenter', Object(_core__WEBPACK_IMPORTED_MODULE_0__["eventInit"])(e, { relatedTarget: dragged }));
                }
                Object(_core__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(el, 'dragover', Object(_core__WEBPACK_IMPORTED_MODULE_0__["eventInit"])(e, { relatedTarget: dragged }));
            }
            else {
                if (content.has(dragged)) {
                    content.delete(dragged);
                    Object(_core__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(el, 'dragleave', Object(_core__WEBPACK_IMPORTED_MODULE_0__["eventInit"])(e, { relatedTarget: dragged }));
                }
            }
        }
    };
}
function _dragendFn(el) {
    return (e) => {
        const dragged = e.shftTarget;
        const { ondrag } = drops.get(el);
        Object(_core__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(el, 'dropclose', Object(_core__WEBPACK_IMPORTED_MODULE_0__["eventInit"])(e, { relatedTarget: dragged }));
        dragged.removeEventListener('drag', ondrag);
        if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["canDrop"])(el, dragged)) {
            Object(_core__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(el, 'drop', Object(_core__WEBPACK_IMPORTED_MODULE_0__["eventInit"])(e, { relatedTarget: dragged }));
        }
    };
}


/***/ }),

/***/ "./ts/shft.ts":
/*!********************!*\
  !*** ./ts/shft.ts ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag */ "./ts/drag.ts");
/* harmony import */ var _drop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drop */ "./ts/drop.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./ts/util.ts");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core */ "./ts/core.ts");




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
/* harmony default export */ __webpack_exports__["default"] = ({
    drag: _drag__WEBPACK_IMPORTED_MODULE_0__["drag"],
    drop: _drop__WEBPACK_IMPORTED_MODULE_1__["drop"],
    util: { clear: _util__WEBPACK_IMPORTED_MODULE_2__["clear"], defaultmove, is: _util__WEBPACK_IMPORTED_MODULE_2__["is"], matches: _util__WEBPACK_IMPORTED_MODULE_2__["matches"] },
    _GLOBAL: _core__WEBPACK_IMPORTED_MODULE_3__["_GLOBAL"]
});


/***/ }),

/***/ "./ts/util.ts":
/*!********************!*\
  !*** ./ts/util.ts ***!
  \********************/
/*! exports provided: clamp, matches, overlapPct, is, clear, canDrop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return matches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "overlapPct", function() { return overlapPct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return clear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canDrop", function() { return canDrop; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./ts/core.ts");

const { drags, drops } = _core__WEBPACK_IMPORTED_MODULE_0__["_GLOBAL"];
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
    const { drags, drops } = _core__WEBPACK_IMPORTED_MODULE_0__["_GLOBAL"];
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
function clear(el) {
    const { drags, drops } = _core__WEBPACK_IMPORTED_MODULE_0__["_GLOBAL"];
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
    return matches(dragged, accepts) && overlapPct(dragged, droppable) > overlap;
}


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map