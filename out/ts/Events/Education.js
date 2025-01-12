"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../Modules/DOM");
var WebPage_1 = require("../Modules/WebPage");
var Education_1 = require("../Classes/Elements/Education");
var Education_2 = require("../Data/Education");
DOM_1.DOM.load().then(function (document) {
    var EducationSection = WebPage_1.Sections.get('education').element;
    var card;
    for (var _i = 0, Data_1 = Education_2.Education; _i < Data_1.length; _i++) {
        var data = Data_1[_i];
        card = new Education_1.Education(data);
        card.appendTo(EducationSection);
    }
});
