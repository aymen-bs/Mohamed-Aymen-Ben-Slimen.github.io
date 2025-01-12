"use strict";
var DOM_1 = require("../../../Modules/DOM");
var Helpers;
(function (Helpers) {
    function loadOnFirstAppearance(hook, className) {
        if (className === void 0) { className = 'preload'; }
        return new Promise(function (resolve, reject) {
            hook.classList.add(className);
            DOM_1.DOM.onFirstAppearance(hook, function () {
                hook.classList.remove(className);
                resolve();
            }, { offset: 0.5 });
        });
    }
    Helpers.loadOnFirstAppearance = loadOnFirstAppearance;
})(Helpers || (Helpers = {}));
module.exports = Helpers;
