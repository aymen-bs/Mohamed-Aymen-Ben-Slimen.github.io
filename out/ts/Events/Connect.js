"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../Modules/DOM");
var WebPage_1 = require("../Modules/WebPage");
var Social_1 = require("../Classes/Elements/Social");
var Social_2 = require("../Data/Social");
DOM_1.DOM.load().then(function (document) {
    var card;
    for (var _i = 0, Data_1 = Social_2.Social; _i < Data_1.length; _i++) {
        var data = Data_1[_i];
        card = new Social_1.Social(data);
        card.appendTo(WebPage_1.SocialGrid);
    }
});
