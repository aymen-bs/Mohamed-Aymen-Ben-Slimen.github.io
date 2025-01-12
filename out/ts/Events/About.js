"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../Modules/DOM");
var WebPage_1 = require("../Modules/WebPage");
var About_1 = require("../Data/About");
var Qualities_1 = require("../Data/Qualities");
var Quality_1 = require("../Classes/Elements/Quality");
DOM_1.DOM.load().then(function (document) {
    WebPage_1.FlavorText.innerText = About_1.AboutMe;
});
DOM_1.DOM.load().then(function (document) {
    var object;
    for (var _i = 0, Qualities_2 = Qualities_1.Qualities; _i < Qualities_2.length; _i++) {
        var quality = Qualities_2[_i];
        object = new Quality_1.Quality(quality);
        object.appendTo(WebPage_1.QualitiesContainer);
    }
});
