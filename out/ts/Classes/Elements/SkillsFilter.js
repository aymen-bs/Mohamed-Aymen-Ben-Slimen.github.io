"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsFilter = void 0;
var JSX_1 = require("../../Definitions/JSX");
var DOM_1 = require("../../Modules/DOM");
var Skill_1 = require("./Skill");
var WebPage_1 = require("../../Modules/WebPage");
var Skills_1 = require("../../Data/Skills");
var SkillsFilter = (function () {
    function SkillsFilter() {
        var _this = this;
        this.filter = 0;
        this.active = false;
        this.top = false;
        this.maxHeight = 224;
        this.optionElements = new Map();
        this.skillElements = [];
        this.usingArrowKeys = false;
        this.lastSelected = null;
        this.Container = DOM_1.DOM.getFirstElement('section#skills .skills-filter');
        this.Dropdown = this.Container.querySelector('.dropdown');
        this.SelectedOptionsDisplay = this.Dropdown.querySelector('.selected-options .display');
        this.Menu = this.Dropdown.querySelector('.menu');
        this.MenuOptions = this.Menu.querySelector('.options');
        this.CategoryMap = Object.entries(Skill_1.SkillCategory)
            .filter(function (_a) {
            var key = _a[0], val = _a[1];
            return !isNaN(Number(key));
        })
            .reduce(function (obj, _a) {
            var _b;
            var key = _a[0], val = _a[1];
            return __assign(__assign({}, obj), (_b = {}, _b[key] = val, _b));
        }, {});
        DOM_1.DOM.load().then(function (document) {
            Skill_1.Skill.initialize().then(function () {
                _this.initialize();
                _this.createSkillElements();
                _this.createOptions();
                _this.update();
                _this.createEventListeners();
            });
        });
    }
    SkillsFilter.prototype.initialize = function () {
        this.Menu.style.maxHeight = this.maxHeight + "px";
        this.checkPosition();
    };
    SkillsFilter.prototype.createOptions = function () {
        var _this = this;
        Object.entries(this.CategoryMap).forEach(function (_a) {
            var key = _a[0], val = _a[1];
            var element = JSX_1.ElementFactory.createElement("li", { className: "is-size-7" }, val);
            _this.optionElements.set(element, Number(key));
            _this.MenuOptions.appendChild(element);
        });
    };
    SkillsFilter.prototype.createSkillElements = function () {
        for (var _i = 0, Skills_2 = Skills_1.Skills; _i < Skills_2.length; _i++) {
            var skill = Skills_2[_i];
            this.skillElements.push(new Skill_1.Skill(skill));
        }
    };
    SkillsFilter.prototype.update = function () {
        var _this = this;
        for (var i = WebPage_1.SkillsGrid.children.length - 1; i >= 0; --i) {
            WebPage_1.SkillsGrid.removeChild(WebPage_1.SkillsGrid.children.item(i));
        }
        if (this.filter === 0) {
            this.skillElements.forEach(function (skill) { return skill.appendTo(WebPage_1.SkillsGrid); });
            this.SelectedOptionsDisplay.innerText = 'None';
        }
        else {
            this.skillElements.filter(function (skill) { return (skill.getCategory() & _this.filter) !== 0; })
                .forEach(function (skill) { return skill.appendTo(WebPage_1.SkillsGrid); });
            var text = Object.entries(this.CategoryMap).filter(function (_a) {
                var key = _a[0], val = _a[1];
                return (_this.filter & Number(key)) !== 0;
            })
                .map(function (_a) {
                var key = _a[0], val = _a[1];
                return val;
            }).join(', ');
            this.SelectedOptionsDisplay.innerText = text;
        }
    };
    SkillsFilter.prototype.createEventListeners = function () {
        var _this = this;
        document.addEventListener('click', function (event) {
            if (_this.optionElements.has(event.target)) {
                _this.toggleOption(event.target);
            }
            else {
                var path = DOM_1.DOM.getPathToRoot(event.target);
                if (path.indexOf(_this.Dropdown) === -1) {
                    _this.close();
                }
                else {
                    _this.active ? _this.close() : _this.open();
                }
            }
        }, {
            passive: true,
        });
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 32) {
                var path = DOM_1.DOM.getPathToRoot(document.activeElement);
                if (path.indexOf(_this.Dropdown) !== -1) {
                    if (_this.active && _this.usingArrowKeys) {
                        _this.toggleOption(_this.lastSelected);
                    }
                    _this.toggle();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            else if (_this.active) {
                if (event.keyCode === 37 || event.keyCode === 38) {
                    _this.moveArrowSelection(-1);
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (event.keyCode === 39 || event.keyCode === 40) {
                    _this.moveArrowSelection(1);
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
        this.MenuOptions.addEventListener('mouseover', function (event) {
            if (_this.lastSelected) {
                _this.usingArrowKeys = false;
                _this.lastSelected.classList.remove('hover');
            }
        });
        this.Dropdown.addEventListener('blur', function (event) {
            if (_this.active) {
                _this.close();
            }
        });
        WebPage_1.ScrollHook.addEventListener('scroll', function (event) {
            _this.checkPosition();
        }, {
            passive: true,
        });
    };
    SkillsFilter.prototype.close = function () {
        this.active = false;
        this.Dropdown.classList.remove('active');
    };
    SkillsFilter.prototype.open = function () {
        this.active = true;
        this.Dropdown.classList.add('active');
        if (this.lastSelected) {
            this.lastSelected.classList.add('hover');
        }
    };
    SkillsFilter.prototype.toggle = function () {
        this.active ? this.close() : this.open();
    };
    SkillsFilter.prototype.toggleOption = function (option) {
        var bit = this.optionElements.get(option);
        if ((this.filter & bit) !== 0) {
            option.classList.remove('selected');
        }
        else {
            option.classList.add('selected');
        }
        this.filter ^= bit;
        this.lastSelected = option;
        this.update();
    };
    SkillsFilter.prototype.moveArrowSelection = function (dir) {
        if (!this.lastSelected) {
            this.lastSelected = this.MenuOptions.firstElementChild;
            this.lastSelected.classList.add('hover');
        }
        else {
            if (this.usingArrowKeys) {
                this.lastSelected.classList.remove('hover');
                if (dir < 0) {
                    this.lastSelected = (this.lastSelected.previousElementSibling || this.MenuOptions.lastElementChild);
                }
                else {
                    this.lastSelected = (this.lastSelected.nextElementSibling || this.MenuOptions.firstElementChild);
                }
            }
            else {
                this.usingArrowKeys = true;
            }
            this.lastSelected.classList.add('hover');
            if (!DOM_1.DOM.inOffsetView(this.lastSelected, { ignoreX: true, whole: true })) {
                DOM_1.DOM.scrollContainerToViewWholeChild(this.Menu, this.lastSelected, { ignoreX: true, smooth: true });
            }
        }
        this.usingArrowKeys = true;
    };
    SkillsFilter.prototype.checkPosition = function () {
        if (DOM_1.DOM.pixelsAboveScreenBottom(this.Dropdown) <= this.maxHeight) {
            if (!this.top) {
                this.top = true;
                this.Dropdown.classList.add('top');
            }
        }
        else {
            if (this.top) {
                this.top = false;
                this.Dropdown.classList.remove('top');
            }
        }
    };
    return SkillsFilter;
}());
exports.SkillsFilter = SkillsFilter;
