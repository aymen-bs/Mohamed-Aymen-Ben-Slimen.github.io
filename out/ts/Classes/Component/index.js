"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Components;
(function (Components) {
    var Helpers;
    (function (Helpers) {
        function runIfDefined(_this, method, data) {
            if (_this[method] && _this[method] instanceof Function) {
                _this[method](data);
            }
        }
        Helpers.runIfDefined = runIfDefined;
        function attachInterface(_this, name) {
            Reflect.defineProperty(_this, name, {
                value: Interface[name],
                configurable: false,
                writable: false
            });
        }
        Helpers.attachInterface = attachInterface;
    })(Helpers || (Helpers = {}));
    var Interface;
    (function (Interface) {
        function appendTo(parent) {
            var _this_1 = this;
            parent.appendChild(this.element);
            setTimeout(function () {
                if (!_this_1._mounted) {
                    Events.dispatch(_this_1, 'mounted', { parent: parent });
                    _this_1._mounted = true;
                }
            }, 0);
        }
        Interface.appendTo = appendTo;
    })(Interface || (Interface = {}));
    var Events;
    (function (Events) {
        function dispatch(_this, event, data) {
            Helpers.runIfDefined(_this, event, data);
        }
        Events.dispatch = dispatch;
    })(Events || (Events = {}));
    var __Base = (function () {
        function __Base() {
            this.element = null;
        }
        return __Base;
    }());
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            var _this_1 = _super.call(this) || this;
            _this_1.element = null;
            _this_1._mounted = false;
            _this_1._setupInterface();
            return _this_1;
        }
        Component.prototype._setupInterface = function () {
            Helpers.attachInterface(this, 'appendTo');
        };
        Component.prototype.appendTo = function (parent) { };
        Component.prototype.getReference = function (ref) {
            return this.element.querySelector("[ref=\"" + ref + "\"]") || null;
        };
        return Component;
    }(__Base));
    var Initialize;
    (function (Initialize) {
        function __Initialize() {
            this.element = this.createElement();
            Events.dispatch(this, 'created');
        }
        function Main(_this) {
            (__Initialize.bind(_this))();
        }
        Initialize.Main = Main;
    })(Initialize || (Initialize = {}));
    var HTMLComponent = (function (_super) {
        __extends(HTMLComponent, _super);
        function HTMLComponent() {
            var _this_1 = _super.call(this) || this;
            Initialize.Main(_this_1);
            return _this_1;
        }
        return HTMLComponent;
    }(Component));
    Components.HTMLComponent = HTMLComponent;
    var DataComponent = (function (_super) {
        __extends(DataComponent, _super);
        function DataComponent(data) {
            var _this_1 = _super.call(this) || this;
            _this_1.data = data;
            Initialize.Main(_this_1);
            return _this_1;
        }
        return DataComponent;
    }(Component));
    Components.DataComponent = DataComponent;
})(Components || (Components = {}));
module.exports = Components;
