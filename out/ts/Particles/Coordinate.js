"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Coordinate = (function () {
    function Coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
    Coordinate.prototype.distance = function (coord) {
        var dx = coord.x - this.x;
        var dy = coord.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Coordinate.prototype.toString = function () {
        return this.x + "x" + this.y;
    };
    return Coordinate;
}());
exports.default = Coordinate;
