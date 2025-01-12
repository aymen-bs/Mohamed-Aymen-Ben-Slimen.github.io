"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
var DOM_1 = require("../../Modules/DOM");
var EventDispatcher_1 = require("../../Modules/EventDispatcher");
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super.call(this) || this;
        _this.open = false;
        _this.RGBRegExp = /(rgb\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3})\))|(rgba\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3}), (0(?:\.[0-9]{1,2})?)\))/g;
        _this.Container = DOM_1.DOM.getFirstElement('header.menu');
        _this.Hamburger = DOM_1.DOM.getFirstElement('header.menu .hamburger');
        _this.register('toggle');
        return _this;
    }
    Menu.prototype.toggle = function () {
        this.open = !this.open;
        this.open ? this.openMenu() : this.closeMenu();
        this.dispatch('toggle', { open: this.open });
    };
    Menu.prototype.openMenu = function () {
        this.Container.setAttribute('open', '');
        this.darken();
    };
    Menu.prototype.closeMenu = function () {
        var _this = this;
        this.Container.removeAttribute('open');
        setTimeout(function () { return _this.updateContrast(); }, 750);
    };
    Menu.prototype.darken = function () {
        this.Hamburger.classList.remove('light');
    };
    Menu.prototype.lighten = function () {
        this.Hamburger.classList.add('light');
    };
    Menu.prototype.updateContrast = function () {
        if (!this.open) {
            var backgroundColor = this.getBackgroundColor();
            this.changeContrast(backgroundColor);
        }
    };
    Menu.prototype.getBackgroundColor = function () {
        var elementsFromPoint = document.elementsFromPoint ? 'elementsFromPoint' : 'msElementsFromPoint';
        var _a = this.Hamburger.getBoundingClientRect(), top = _a.top, left = _a.left;
        var elements = document[elementsFromPoint](left, top);
        var length = elements.length;
        var RGB = [];
        var background, regExResult;
        var styles;
        for (var i = 1; i < length; ++i, this.RGBRegExp.lastIndex = 0) {
            styles = window.getComputedStyle(elements[i]);
            background = styles.background || styles.backgroundColor + styles.backgroundImage;
            while (regExResult = this.RGBRegExp.exec(background)) {
                if (regExResult[1]) {
                    RGB = regExResult.slice(2, 5).map(function (val) { return parseInt(val); });
                    return RGB;
                }
                else if (regExResult[5]) {
                    RGB = regExResult.slice(6, 10).map(function (val) { return parseInt(val); });
                    if (!RGB.every(function (val) { return val === 0; })) {
                        return RGB;
                    }
                }
            }
        }
        return RGB;
    };
    Menu.prototype.changeContrast = function (RGB) {
        var contrast, luminance;
        if (RGB.length === 3) {
            contrast = RGB.map(function (val) { return val / 255; }).map(function (val) {
                return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
            });
            luminance = 0.2126 * contrast[0] + 0.7152 * contrast[1] + 0.0722 * contrast[2];
            if (luminance > 0.179) {
                this.darken();
            }
            else {
                this.lighten();
            }
        }
        else {
            this.darken();
        }
    };
    return Menu;
}(EventDispatcher_1.Events.EventDispatcher));
exports.Menu = Menu;
