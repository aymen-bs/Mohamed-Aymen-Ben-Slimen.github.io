"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../Modules/DOM");
DOM_1.DOM.load().then(function (document) {
    DOM_1.DOM.getFirstElement('#connect .footer .copyright .year').innerText = new Date().getFullYear().toString();
});
