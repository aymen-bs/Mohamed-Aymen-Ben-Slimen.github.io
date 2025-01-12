"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../Modules/DOM");
var WebPage_1 = require("../Modules/WebPage");
var Experience_1 = require("../Classes/Elements/Experience");
var Experience_2 = require("../Data/Experience");
DOM_1.DOM.load().then(function (document) {
    var ExperienceSection = WebPage_1.Sections.get('experience').element;
    var card;
    for (var _i = 0, Data_1 = Experience_2.Experience; _i < Data_1.length; _i++) {
        var data = Data_1[_i];
        card = new Experience_1.Experience(data);
        card.appendTo(ExperienceSection);
    }
});
