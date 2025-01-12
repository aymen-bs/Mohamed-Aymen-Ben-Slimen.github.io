"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVG = void 0;
var SVG;
(function (SVG) {
    SVG.svgns = 'http://www.w3.org/2000/svg';
    SVG.xlinkns = 'http://www.w3.org/1999/xlink';
    SVG.loadSVG = function (url) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('GET', url + ".svg", true);
            request.onload = function () {
                var parser = new DOMParser();
                var parsedDocument = parser.parseFromString(request.responseText, 'image/svg+xml');
                resolve(parsedDocument.querySelector('svg'));
            };
            request.onerror = function () {
                reject("Failed to read SVG.");
            };
            request.send();
        });
    };
})(SVG = exports.SVG || (exports.SVG = {}));
