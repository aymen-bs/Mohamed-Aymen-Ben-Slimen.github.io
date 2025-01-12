"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../../Modules/DOM");
var Section = (function () {
    function Section(element) {
        this.element = element;
    }
    Section.prototype.inView = function () {
        return DOM_1.DOM.inVerticalWindowView(this.element);
    };
    Section.prototype.getID = function () {
        return this.element.id;
    };
    Section.prototype.inMenu = function () {
        return !this.element.classList.contains('no-menu');
    };
    return Section;
}());
exports.default = Section;
