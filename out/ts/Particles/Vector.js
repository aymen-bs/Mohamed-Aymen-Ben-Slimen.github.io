"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.flip = function (x, y) {
        if (x === void 0) { x = true; }
        if (y === void 0) { y = true; }
        if (x) {
            this.x *= -1;
        }
        if (y) {
            this.y *= -1;
        }
    };
    Vector.prototype.magnitude = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    Vector.prototype.angle = function () {
        return Math.tan(this.y / this.x);
    };
    return Vector;
}());
exports.default = Vector;
