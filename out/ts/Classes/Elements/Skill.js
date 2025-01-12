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
exports.Skill = exports.SkillCategory = void 0;
var SVG_1 = require("../../Modules/SVG");
var JSX_1 = require("../../Definitions/JSX");
var Component_1 = require("../Component");
var SkillCategory;
(function (SkillCategory) {
    SkillCategory[SkillCategory["Programming"] = 1] = "Programming";
    SkillCategory[SkillCategory["Scripting"] = 2] = "Scripting";
    SkillCategory[SkillCategory["Web"] = 4] = "Web";
    SkillCategory[SkillCategory["Server"] = 8] = "Server";
    SkillCategory[SkillCategory["Database"] = 16] = "Database";
    SkillCategory[SkillCategory["DevOps"] = 32] = "DevOps";
    SkillCategory[SkillCategory["Framework"] = 64] = "Framework";
    SkillCategory[SkillCategory["DataScience"] = 128] = "DataScience";
    SkillCategory[SkillCategory["Other"] = 256] = "Other";
})(SkillCategory = exports.SkillCategory || (exports.SkillCategory = {}));
var Skill = (function (_super) {
    __extends(Skill, _super);
    function Skill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Skill.prototype.getCategory = function () {
        return this.data.category;
    };
    Skill.prototype.update = function () { };
    Skill.prototype.created = function () {
        var _this = this;
        SVG_1.SVG.loadSVG("./out/images/Skills/" + this.data.svg).then(function (svg) {
            svg.setAttribute('class', 'icon');
            var hexagon = _this.getReference('hexagon');
            hexagon.parentNode.insertBefore(svg, hexagon);
        });
    };
    Skill.prototype.createElement = function () {
        if (!Skill.HexagonSVG) {
            throw 'Cannot create Skill element without being initialized.';
        }
        return (JSX_1.ElementFactory.createElement("li", { className: 'skill tooltip-container' },
            JSX_1.ElementFactory.createElement("div", { className: 'hexagon-container', style: { color: this.data.color } },
                JSX_1.ElementFactory.createElement("span", { className: 'tooltip top is-size-7' }, this.data.name),
                Skill.HexagonSVG.cloneNode(true))));
    };
    Skill.initialize = function () {
        return new Promise(function (resolve, reject) {
            if (Skill.HexagonSVG) {
                resolve(true);
            }
            else {
                SVG_1.SVG.loadSVG('./out/images/Content/Hexagon').then(function (element) {
                    element.setAttribute('class', 'hexagon');
                    element.setAttribute('ref', 'hexagon');
                    Skill.HexagonSVG = element;
                    resolve(true);
                })
                    .catch(function (err) {
                    resolve(false);
                });
            }
        });
    };
    return Skill;
}(Component_1.DataComponent));
exports.Skill = Skill;
Skill.initialize();
