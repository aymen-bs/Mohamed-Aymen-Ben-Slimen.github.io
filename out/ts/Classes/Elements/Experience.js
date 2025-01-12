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
exports.Experience = void 0;
var JSX_1 = require("../../Definitions/JSX");
var Component_1 = require("../Component");
var Experience = (function (_super) {
    __extends(Experience, _super);
    function Experience() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Experience.prototype.update = function () { };
    Experience.prototype.createElement = function () {
        return (JSX_1.ElementFactory.createElement("div", { className: "card is-theme-secondary elevation-1 experience" },
            JSX_1.ElementFactory.createElement("div", { className: "content padding-2" },
                JSX_1.ElementFactory.createElement("div", { className: "header" },
                    JSX_1.ElementFactory.createElement("div", { className: "icon" },
                        JSX_1.ElementFactory.createElement("a", { href: this.data.link, target: "_blank" },
                            JSX_1.ElementFactory.createElement("img", { src: "./out/images/Experience/" + this.data.svg, alt: 'alt' }))),
                    JSX_1.ElementFactory.createElement("div", { className: "company" },
                        JSX_1.ElementFactory.createElement("a", { href: this.data.link, target: "_blank", className: "name is-size-6 is-bold-weight is-colored-link" }, this.data.company),
                        JSX_1.ElementFactory.createElement("p", { className: "location is-size-8 is-italic is-color-light" }, this.data.location)),
                    JSX_1.ElementFactory.createElement("div", { className: "role" },
                        JSX_1.ElementFactory.createElement("p", { className: "name is-size-7 is-bold-weight" }, this.data.position),
                        JSX_1.ElementFactory.createElement("p", { className: "date is-size-8 is-italic is-color-light" }, "(" + this.data.begin + " \u2014 " + this.data.end + ")"))),
                JSX_1.ElementFactory.createElement("hr", null),
                JSX_1.ElementFactory.createElement("div", { className: "content info" },
                    JSX_1.ElementFactory.createElement("p", { className: "description is-size-8 is-color-light is-italic is-justified is-quote" }, this.data.flavor),
                    JSX_1.ElementFactory.createElement("ul", { className: "job is-left-aligned is-size-7 xs-y-padding-between-1" }, this.data.roles.map(function (role) {
                        return JSX_1.ElementFactory.createElement("li", null, role);
                    }))))));
    };
    return Experience;
}(Component_1.DataComponent));
exports.Experience = Experience;
