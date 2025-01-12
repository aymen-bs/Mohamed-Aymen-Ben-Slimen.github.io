"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../Modules/DOM");
var WebPage_1 = require("../Modules/WebPage");
var Project_1 = require("../Classes/Elements/Project");
var Projects_1 = require("../Data/Projects");
DOM_1.DOM.load().then(function () {
    var ProjectsContainer = WebPage_1.Sections.get('projects').element.querySelector('.projects-container');
    var card;
    for (var _i = 0, Data_1 = Projects_1.Projects; _i < Data_1.length; _i++) {
        var data = Data_1[_i];
        card = new Project_1.Project(data);
        card.appendTo(ProjectsContainer);
    }
});
