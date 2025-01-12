"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebPage_1 = require("../Modules/WebPage");
WebPage_1.MenuButton.subscribe(WebPage_1.Main, function (event) {
    if (event.name === 'toggle') {
        if (event.detail.open) {
            WebPage_1.Main.setAttribute('shifted', '');
        }
        else {
            WebPage_1.Main.removeAttribute('shifted');
        }
    }
});
WebPage_1.ScrollHook.addEventListener('scroll', function (event) {
    var _a;
    var section;
    var anchor;
    var iter = WebPage_1.SectionToMenu.values();
    var current = iter.next();
    for (var done = false; !done; current = iter.next(), done = current.done) {
        _a = current.value, section = _a[0], anchor = _a[1];
        if (section.inView()) {
            anchor.setAttribute('selected', '');
        }
        else {
            anchor.removeAttribute('selected');
        }
    }
}, {
    capture: true,
    passive: true
});
