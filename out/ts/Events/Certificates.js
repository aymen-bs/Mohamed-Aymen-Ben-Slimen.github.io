"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../Modules/DOM");
var WebPage_1 = require("../Modules/WebPage");
var Certificates_1 = require("../Classes/Elements/Certificates");
var Certificates_2 = require("../Data/Certificates");
DOM_1.DOM.load().then(function () {
    var CertificatesContainer = WebPage_1.Sections.get('certificates').element.querySelector('.certificates-container');
    var card;
    for (var _i = 0, Data_1 = Certificates_2.Certificates; _i < Data_1.length; _i++) {
        var data = Data_1[_i];
        card = new Certificates_1.Certificates(data);
        card.appendTo(CertificatesContainer);
    }
});
