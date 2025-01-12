"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebPage_1 = require("../Modules/WebPage");
document.addEventListener('scroll', function (event) {
    WebPage_1.MenuButton.updateContrast();
}, {
    capture: true,
    passive: true
});
WebPage_1.MenuButton.Hamburger.addEventListener('click', function () {
    WebPage_1.MenuButton.toggle();
});
var iter = WebPage_1.SectionToMenu.values();
var current = iter.next();
var _loop_1 = function (done) {
    var _a;
    var section;
    var anchor = void 0;
    _a = current.value, section = _a[0], anchor = _a[1];
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        section.element.scrollIntoView({
            behavior: 'smooth'
        });
    });
};
for (var done = false; !done; current = iter.next(), done = current.done) {
    _loop_1(done);
}
