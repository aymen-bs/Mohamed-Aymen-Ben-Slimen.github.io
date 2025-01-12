"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebPage_1 = require("../Modules/WebPage");
var DOM_1 = require("../Modules/DOM");
DOM_1.DOM.load().then(function (document) {
    if (!DOM_1.DOM.isIE()) {
        WebPage_1.Logo.Outer.classList.remove('preload');
        setTimeout(function () {
        }, 400);
    }
    else {
        WebPage_1.Logo.Outer.className = 'outer';
        setTimeout(function () {
            WebPage_1.Logo.Inner.className = 'inner';
        }, 400);
    }
});
