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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Education = void 0;
var JSX_1 = require("../../Definitions/JSX");
var Component_1 = require("../Component");
var DOM_1 = require("../../Modules/DOM");
var Education = (function (_super) {
    __extends(Education, _super);
    function Education() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Education.prototype.update = function () { };
    Education.prototype.created = function () {
        var _this = this;
        DOM_1.DOM.onFirstAppearance(this.element, function () {
            _this.setProgress();
        }, { timeout: 500, offset: 0.3 });
    };
    Education.prototype.setProgress = function () {
        var completed = this.data.credits.completed / this.data.credits.total * 100 + "%";
        var taking = (this.data.credits.completed + this.data.credits.taking) / this.data.credits.total * 100 + "%";
        this.getReference('completedTrack').style.width = completed;
        this.getReference('takingTrack').style.width = taking;
        var completedMarker = this.getReference('completedMarker');
        var takingMarker = this.getReference('takingMarker');
        completedMarker.style.opacity = '1';
        completedMarker.style.left = completed;
        takingMarker.style.opacity = '1';
        takingMarker.style.left = taking;
    };
    Education.prototype.createElement = function () {
        var inlineStyle = {
            '--progress-bar-color': this.data.color
        };
        return (JSX_1.ElementFactory.createElement("div", { className: "card is-theme-secondary elevation-1 education", style: __assign(__assign({}, inlineStyle), { marginTop: '30px' }) },
            JSX_1.ElementFactory.createElement("div", { className: "content padding-2" },
                JSX_1.ElementFactory.createElement("div", { className: "body" },
                    JSX_1.ElementFactory.createElement("div", { className: "header flex row sm-wrap md-nowrap xs-x-center" },
                        JSX_1.ElementFactory.createElement("a", { className: "icon xs-auto", href: this.data.link, target: "_blank" },
                            JSX_1.ElementFactory.createElement("img", { src: "out/images/Education/" + this.data.image })),
                        JSX_1.ElementFactory.createElement("div", { className: "about xs-full" },
                            JSX_1.ElementFactory.createElement("div", { className: "institution flex row xs-x-center xs-y-center md-x-begin" },
                                JSX_1.ElementFactory.createElement("a", { className: "name xs-full md-auto is-center-aligned is-bold-weight is-size-6 is-colored-link", href: this.data.link, target: "_blank" }, this.data.name),
                                JSX_1.ElementFactory.createElement("p", { className: "location md-x-self-end is-italic is-size-8 is-color-light" }, this.data.location)),
                            JSX_1.ElementFactory.createElement("div", { className: "degree flex row xs-x-center xs-y-center md-x-begin" },
                                JSX_1.ElementFactory.createElement("p", { className: "name xs-full md-auto is-center-aligned is-bold-weight is-size-7 is-color-light" }, this.data.degree),
                                JSX_1.ElementFactory.createElement("p", { className: "date md-x-self-end is-italic is-size-8 is-color-light" },
                                    "(",
                                    this.data.start,
                                    " \u2014 ",
                                    this.data.end,
                                    ")")))),
                    JSX_1.ElementFactory.createElement("div", { className: "progress flex row xs-nowrap xs-y-center progress-bar-hover-container" },
                        JSX_1.ElementFactory.createElement("div", { className: "progress-bar" },
                            JSX_1.ElementFactory.createElement("div", { className: "completed marker", style: { opacity: 0 }, ref: "completedMarker" },
                                JSX_1.ElementFactory.createElement("p", { className: "is-size-8" }, this.data.credits.completed)),
                            JSX_1.ElementFactory.createElement("div", { className: "taking marker", style: { opacity: 0 }, ref: "takingMarker" },
                                JSX_1.ElementFactory.createElement("p", { className: "is-size-8" }, this.data.credits.completed + this.data.credits.taking)),
                            JSX_1.ElementFactory.createElement("div", { className: "track" }),
                            JSX_1.ElementFactory.createElement("div", { className: "buffer", ref: "takingTrack" }),
                            JSX_1.ElementFactory.createElement("div", { className: "fill", ref: "completedTrack" })),
                        JSX_1.ElementFactory.createElement("p", { className: "credits is-size-8 xs-auto" },
                            this.data.credits.completed,
                            " %")),
                    JSX_1.ElementFactory.createElement("div", { className: "info content padding-x-4 padding-y-2" },
                        this.data.notes.map(function (note) {
                            return JSX_1.ElementFactory.createElement("p", { className: "is-light-color is-size-8 is-italic" }, note);
                        }),
                        JSX_1.ElementFactory.createElement("hr", null),
                        JSX_1.ElementFactory.createElement("div", { className: "courses" },
                            JSX_1.ElementFactory.createElement("p", { className: "is-bold-weight is-size-6" }, "Coursework"),
                            JSX_1.ElementFactory.createElement("ul", { className: "flex row is-size-7" }, this.data.courses.map(function (course) {
                                return JSX_1.ElementFactory.createElement("li", { className: "xs-12 md-6" }, course);
                            }))))))));
    };
    return Education;
}(Component_1.DataComponent));
exports.Education = Education;
