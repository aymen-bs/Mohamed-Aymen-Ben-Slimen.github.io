"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialGrid = exports.SkillsGrid = exports.QualitiesContainer = exports.FlavorText = exports.Background = exports.SectionToMenu = exports.Sections = exports.SkillsFilterObject = exports.MenuButton = exports.Logo = exports.ScrollHook = exports.MainScroll = exports.Main = exports.Body = void 0;
var DOM_1 = require("./DOM");
var Section_1 = require("../Classes/Elements/Section");
var Menu_1 = require("../Classes/Elements/Menu");
var SkillsFilter_1 = require("../Classes/Elements/SkillsFilter");
exports.Body = DOM_1.DOM.getFirstElement('body');
exports.Main = DOM_1.DOM.getFirstElement('main');
exports.MainScroll = DOM_1.DOM.getFirstElement('main .scroll');
exports.ScrollHook = DOM_1.DOM.isIE() ? window : exports.MainScroll;
exports.Logo = {
    Outer: DOM_1.DOM.getFirstElement('header.logo .image img.outer'),
    Inner: DOM_1.DOM.getFirstElement('header.logo .image img.inner')
};
exports.MenuButton = new Menu_1.Menu();
exports.SkillsFilterObject = new SkillsFilter_1.SkillsFilter();
exports.Sections = new Map();
for (var _i = 0, _a = Array.from(DOM_1.DOM.getElements('section')); _i < _a.length; _i++) {
    var element = _a[_i];
    exports.Sections.set(element.id, new Section_1.default(element));
}
exports.SectionToMenu = new Map();
for (var _b = 0, _c = Array.from(DOM_1.DOM.getElements('header.navigation .sections a')); _b < _c.length; _b++) {
    var anchor = _c[_b];
    var id = anchor.getAttribute('href').substr(1);
    if (exports.Sections.get(id) && exports.Sections.get(id).inMenu()) {
        exports.SectionToMenu.set(id, [exports.Sections.get(id), anchor]);
    }
}
exports.Background = DOM_1.DOM.getFirstElement('bg');
exports.FlavorText = DOM_1.DOM.getFirstElement('section#about .flavor');
exports.QualitiesContainer = DOM_1.DOM.getFirstElement('section#about .qualities');
exports.SkillsGrid = DOM_1.DOM.getFirstElement('section#skills .hex-grid');
exports.SocialGrid = DOM_1.DOM.getFirstElement('section#connect .social-icons');
