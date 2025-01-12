"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
var Events;
(function (Events) {
    var NewEvent = (function () {
        function NewEvent(name, detail) {
            if (detail === void 0) { detail = null; }
            this.name = name;
            this.detail = detail;
        }
        return NewEvent;
    }());
    Events.NewEvent = NewEvent;
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.events = new Set();
            this.listeners = new Map();
        }
        EventDispatcher.prototype.register = function (name) {
            this.events.add(name);
        };
        EventDispatcher.prototype.unregister = function (name) {
            this.events.delete(name);
        };
        EventDispatcher.prototype.subscribe = function (element, callback) {
            this.listeners.set(element, callback);
        };
        EventDispatcher.prototype.unsubscribe = function (element) {
            this.listeners.delete(element);
        };
        EventDispatcher.prototype.dispatch = function (name, detail) {
            if (detail === void 0) { detail = null; }
            if (!this.events.has(name)) {
                return false;
            }
            var event = new NewEvent(name, detail);
            var it = this.listeners.values();
            var callback;
            while (callback = it.next().value) {
                callback(event);
            }
            return true;
        };
        return EventDispatcher;
    }());
    Events.EventDispatcher = EventDispatcher;
})(Events = exports.Events || (exports.Events = {}));
