"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementFactory = void 0;
var ElementFactory;
(function (ElementFactory) {
    var Fragment = '<></>';
    function createElement(tagName, attributes) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        if (tagName === Fragment) {
            return document.createDocumentFragment();
        }
        var element = document.createElement(tagName);
        if (attributes) {
            for (var _a = 0, _b = Object.keys(attributes); _a < _b.length; _a++) {
                var key = _b[_a];
                var attributeValue = attributes[key];
                if (key === 'className') {
                    element.setAttribute('class', attributeValue);
                }
                else if (key === 'style') {
                    if (typeof attributeValue === 'object') {
                        element.setAttribute('style', JStoCSS(attributeValue));
                    }
                    else {
                        element.setAttribute('style', attributeValue);
                    }
                }
                else if (key.startsWith('on') && typeof attributeValue === 'function') {
                    element.addEventListener(key.substring(2).toLowerCase(), attributeValue);
                }
                else {
                    if (typeof attributeValue === 'boolean' && attributeValue) {
                        element.setAttribute(key, '');
                    }
                    else {
                        element.setAttribute(key, attributeValue);
                    }
                }
            }
        }
        for (var _c = 0, children_1 = children; _c < children_1.length; _c++) {
            var child = children_1[_c];
            appendChild(element, child);
        }
        return element;
    }
    ElementFactory.createElement = createElement;
    function appendChild(parent, child) {
        if (typeof child === 'undefined' || child === null) {
            return;
        }
        if (Array.isArray(child)) {
            for (var _i = 0, child_1 = child; _i < child_1.length; _i++) {
                var value = child_1[_i];
                appendChild(parent, value);
            }
        }
        else if (typeof child === 'string') {
            parent.appendChild(document.createTextNode(child));
        }
        else if (child instanceof Node) {
            parent.appendChild(child);
        }
        else if (typeof child === 'boolean') {
        }
        else {
            parent.appendChild(document.createTextNode(String(child)));
        }
    }
    ElementFactory.appendChild = appendChild;
    function JStoCSS(cssObject) {
        var cssString = "";
        var rule;
        var rules = Object.keys(cssObject);
        for (var i = 0; i < rules.length; i++, cssString += ' ') {
            rule = rules[i];
            cssString += rule.replace(/([A-Z])/g, function (upper) { return "-" + upper[0].toLowerCase(); }) + ": " + cssObject[rule] + ";";
        }
        return cssString;
    }
})(ElementFactory = exports.ElementFactory || (exports.ElementFactory = {}));
