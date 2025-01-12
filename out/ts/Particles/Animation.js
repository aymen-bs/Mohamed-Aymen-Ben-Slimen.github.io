"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = (function () {
    function Animation(speed, max, min, increasing) {
        if (increasing === void 0) { increasing = false; }
        this.speed = speed;
        this.max = max;
        this.min = min;
        this.increasing = increasing;
    }
    return Animation;
}());
exports.default = Animation;
