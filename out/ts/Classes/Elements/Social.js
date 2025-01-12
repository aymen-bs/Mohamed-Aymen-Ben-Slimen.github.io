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
exports.Social = void 0;
var JSX_1 = require("../../Definitions/JSX");
var Component_1 = require("../Component");
var Social = (function (_super) {
    __extends(Social, _super);
    function Social() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Social.prototype.update = function () { };
    Social.prototype.createElement = function () {
        return (JSX_1.ElementFactory.createElement("div", { className: "social" },
            JSX_1.ElementFactory.createElement("a", { className: "btn is-svg is-primary", href: this.data.link, target: "_blank" },
                JSX_1.ElementFactory.createElement("i", { className: this.data.faClass }))));
    };
    return Social;
}(Component_1.DataComponent));
exports.Social = Social;
