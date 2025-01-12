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
exports.Quality = void 0;
var JSX_1 = require("../../Definitions/JSX");
var Component_1 = require("../Component");
var Quality = (function (_super) {
    __extends(Quality, _super);
    function Quality(data) {
        return _super.call(this, data) || this;
    }
    Quality.prototype.update = function () { };
    Quality.prototype.createElement = function () {
        return (JSX_1.ElementFactory.createElement("div", { className: "xs-12 sm-4" },
            JSX_1.ElementFactory.createElement("i", { className: "icon " + this.data.faClass }),
            JSX_1.ElementFactory.createElement("p", { className: "quality is-size-5 is-uppercase" }, this.data.name),
            JSX_1.ElementFactory.createElement("p", { className: "desc is-light-weight is-size-6" }, this.data.description)));
    };
    return Quality;
}(Component_1.DataComponent));
exports.Quality = Quality;
