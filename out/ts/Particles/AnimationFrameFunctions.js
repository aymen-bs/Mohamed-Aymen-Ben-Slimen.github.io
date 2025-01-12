"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationFrameFunctions = void 0;
var AnimationFrameFunctions;
(function (AnimationFrameFunctions) {
    function requestAnimationFrame() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
    }
    AnimationFrameFunctions.requestAnimationFrame = requestAnimationFrame;
    function cancelAnimationFrame() {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            clearTimeout;
    }
    AnimationFrameFunctions.cancelAnimationFrame = cancelAnimationFrame;
})(AnimationFrameFunctions = exports.AnimationFrameFunctions || (exports.AnimationFrameFunctions = {}));
