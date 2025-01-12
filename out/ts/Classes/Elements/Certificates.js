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
exports.Certificates = void 0;
var JSX_1 = require("../../Definitions/JSX");
var Component_1 = require("../Component");
var DOM_1 = require("../../Modules/DOM");
var Certificates = (function (_super) {
    __extends(Certificates, _super);
    function Certificates() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.infoDisplayed = false;
        _this.tooltipLeft = true;
        return _this;
    }
    Certificates.prototype.created = function () {
        var _this = this;
        if (this.data.award) {
            window.addEventListener('resize', function () { return _this.checkTooltipSide(); }, { passive: true });
        }
    };
    Certificates.prototype.mounted = function () {
        if (this.data.award) {
            this.checkTooltipSide();
        }
    };
    Certificates.prototype.checkTooltipSide = function () {
        var tooltip = this.getReference('tooltip');
        var tooltipPos = tooltip.getBoundingClientRect().left;
        var screenWidth = DOM_1.DOM.getViewport().width;
        if (this.tooltipLeft !== (tooltipPos >= screenWidth / 2)) {
            this.tooltipLeft = !this.tooltipLeft;
            var add = this.tooltipLeft ? 'left' : 'top';
            var remove = this.tooltipLeft ? 'top' : 'left';
            tooltip.classList.remove(remove);
            tooltip.classList.add(add);
        }
    };
    Certificates.prototype.lessInfo = function () {
        this.infoDisplayed = false;
        this.update();
    };
    Certificates.prototype.toggleInfo = function () {
        this.infoDisplayed = !this.infoDisplayed;
        this.update();
    };
    Certificates.prototype.update = function () {
        if (this.infoDisplayed) {
            this.getReference('slider').setAttribute('opened', '');
        }
        else {
            this.getReference('slider').removeAttribute('opened');
        }
        this.getReference('infoText').innerHTML = (this.infoDisplayed ? 'Less' : 'More') + " Info";
    };
    Certificates.prototype.createElement = function () {
        var inlineStyle = {
            '--button-background-color': this.data.color
        };
        var imageStyle = {
            backgroundImage: "url(" + ("./out/images/Certificates/" + this.data.image) + ")"
        };
        return (JSX_1.ElementFactory.createElement("div", { className: "xs-12 sm-6 md-4" },
            this.data.award ?
                JSX_1.ElementFactory.createElement("div", { className: "award" },
                    JSX_1.ElementFactory.createElement("div", { className: "tooltip-container" },
                        JSX_1.ElementFactory.createElement("img", { src: "out/images/Projects/award.png", style: { transform: 'scale(1.5)' } }),
                        JSX_1.ElementFactory.createElement("span", { ref: "tooltip", className: "tooltip left is-size-8" }, this.data.award)))
                : null,
            JSX_1.ElementFactory.createElement("div", { className: "project card is-theme-secondary elevation-1 is-in-grid hide-overflow", style: inlineStyle },
                JSX_1.ElementFactory.createElement("div", { className: "image", style: imageStyle }),
                JSX_1.ElementFactory.createElement("div", { className: "content padding-2" },
                    JSX_1.ElementFactory.createElement("div", { className: "title" },
                        JSX_1.ElementFactory.createElement("p", { className: "name is-size-6 is-bold-weight", style: { color: this.data.color } }, this.data.name),
                        JSX_1.ElementFactory.createElement("p", { className: "type is-size-8" }, this.data.type),
                        JSX_1.ElementFactory.createElement("p", { className: "date is-size-8 is-color-light" }, this.data.date)),
                    JSX_1.ElementFactory.createElement("div", { className: "body" },
                        JSX_1.ElementFactory.createElement("p", { className: "flavor is-size-7" }, this.data.flavor)),
                    JSX_1.ElementFactory.createElement("div", { className: "slider is-theme-secondary", ref: "slider" },
                        JSX_1.ElementFactory.createElement("div", { className: "content padding-4" },
                            JSX_1.ElementFactory.createElement("div", { className: "title flex row xs-x-begin xs-y-center" },
                                JSX_1.ElementFactory.createElement("p", { className: "is-size-6 is-bold-weight" }, "Info"),
                                JSX_1.ElementFactory.createElement("div", { className: "close-btn-wrapper xs-x-self-end" },
                                    JSX_1.ElementFactory.createElement("button", { className: "btn close is-svg is-primary", tabindex: "-1", onClick: this.lessInfo.bind(this) },
                                        JSX_1.ElementFactory.createElement("i", { className: "fas fa-times" })))),
                            JSX_1.ElementFactory.createElement("div", { className: "body" },
                                JSX_1.ElementFactory.createElement("ul", { className: "details xs-y-padding-between-1 is-size-9" }, this.data.details.map(function (detail) {
                                    return JSX_1.ElementFactory.createElement("li", null, detail);
                                }))))),
                    JSX_1.ElementFactory.createElement("div", { className: "options is-theme-secondary xs-x-margin-between-1" },
                        this.data.repo ?
                            JSX_1.ElementFactory.createElement("a", { className: "code btn is-primary is-text is-custom", href: this.data.repo, target: "_blank", tabindex: "0" },
                                JSX_1.ElementFactory.createElement("i", { className: "fas fa-code" }),
                                JSX_1.ElementFactory.createElement("span", null, "See Code"))
                            : null,
                        this.data.external ?
                            JSX_1.ElementFactory.createElement("a", { className: "external btn is-primary is-text is-custom", href: this.data.external, target: "_blank", tabindex: "0" },
                                JSX_1.ElementFactory.createElement("i", { className: "fas fa-external-link-alt" }),
                                JSX_1.ElementFactory.createElement("span", null, "View Credentials"))
                            : null)))));
    };
    return Certificates;
}(Component_1.DataComponent));
exports.Certificates = Certificates;
