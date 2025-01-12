"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = (function () {
    function Color(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    Color.fromRGB = function (r, g, b) {
        if (r >= 0 && r < 256 && g >= 0 && g < 256 && b >= 0 && b < 256) {
            return new Color(r, g, b);
        }
        else {
            return null;
        }
    };
    Color.fromObject = function (obj) {
        return Color.fromRGB(obj.r, obj.g, obj.b);
    };
    Color.fromHex = function (hex) {
        return Color.fromObject(Color.hexToRGB(hex));
    };
    Color.hexToRGB = function (hex) {
        var result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    Color.prototype.toString = function (opacity) {
        if (opacity === void 0) { opacity = 1; }
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + opacity + ")";
    };
    return Color;
}());
exports.default = Color;
