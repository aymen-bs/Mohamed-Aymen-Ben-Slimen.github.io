"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOM = void 0;
var DOM;
(function (DOM) {
    function getElements(query) {
        return document.querySelectorAll(query);
    }
    DOM.getElements = getElements;
    function getFirstElement(query) {
        return this.getElements(query)[0];
    }
    DOM.getFirstElement = getFirstElement;
    function getViewport() {
        return {
            height: Math.max(window.innerHeight, document.documentElement.clientHeight),
            width: Math.max(window.innerWidth, document.documentElement.clientWidth)
        };
    }
    DOM.getViewport = getViewport;
    function getCenterOfViewport() {
        var _a = getViewport(), height = _a.height, width = _a.width;
        return {
            x: width / 2,
            y: height / 2
        };
    }
    DOM.getCenterOfViewport = getCenterOfViewport;
    function isIE() {
        return window.navigator.userAgent.match(/(MSIE|Trident)/) !== null;
    }
    DOM.isIE = isIE;
    function load() {
        return new Promise(function (resolve, reject) {
            if (document.readyState === 'complete') {
                resolve(document);
            }
            else {
                var callback_1 = function () {
                    document.removeEventListener('DOMContentLoaded', callback_1);
                    resolve(document);
                };
                document.addEventListener('DOMContentLoaded', callback_1);
            }
        });
    }
    DOM.load = load;
    function boundingClientRectToObject(rect) {
        return {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            x: rect.x ? rect.x : 0,
            y: rect.y ? rect.y : 0
        };
    }
    function onPage(element) {
        var rect = element.getBoundingClientRect();
        return !Object.values(boundingClientRectToObject(rect)).every(function (val) { return val === 0; });
    }
    DOM.onPage = onPage;
    function getDOMName(element) {
        var str = element.tagName.toLowerCase();
        if (element.id) {
            str += '#' + element.id;
        }
        if (element.className) {
            str += '.' + element.className.replace(/ /g, '.');
        }
        return str;
    }
    DOM.getDOMName = getDOMName;
    function getDOMPath(element) {
        if (!element) {
            return [];
        }
        var path = [element];
        while (element = element.parentElement) {
            if (element.tagName.toLowerCase() === 'html') {
                break;
            }
            path.unshift(element);
        }
        return path;
    }
    DOM.getDOMPath = getDOMPath;
    function getDOMPathNames(element) {
        var path = getDOMPath(element);
        if (path.length === 0) {
            return [];
        }
        return path.map(function (element) { return getDOMName(element); });
    }
    DOM.getDOMPathNames = getDOMPathNames;
    function getCSSSelector(element, condense) {
        if (condense === void 0) { condense = true; }
        var names = getDOMPathNames(element);
        if (!condense || names.length <= 6) {
            return names.join(' > ');
        }
        var length = names.length;
        var begin = names.slice(0, 3);
        var end = names.slice(length - 3, length);
        return begin.join(' > ') + " > ... > " + end.join(' > ');
    }
    DOM.getCSSSelector = getCSSSelector;
    function getChildOffsetPosForContainer(container, child, caller) {
        if (caller === void 0) { caller = ''; }
        var offsetTop = 0;
        var offsetLeft = 0;
        var curr = child;
        while (curr && curr !== container) {
            offsetTop += curr.offsetTop;
            offsetLeft += curr.offsetLeft;
            curr = (curr.offsetParent);
        }
        if (!curr) {
            throw new Error((caller ? caller + " => " : '') + "\"" + getCSSSelector(child) + "\" does not contain \"" + getCSSSelector(container) + "\" as an offset parent. Check that the container has \"position: relative\" set or that it is in the DOM path.");
        }
        return { offsetTop: offsetTop, offsetLeft: offsetLeft };
    }
    DOM.getChildOffsetPosForContainer = getChildOffsetPosForContainer;
    function lines(top1, size1, top2, size2, offset) {
        return [
            top1 - offset,
            top1 - offset + size1,
            top2,
            top2 + size2,
        ];
    }
    function xyOffset(xOffset, yOffset, width, height) {
        if (xOffset && xOffset <= 1) {
            xOffset = width * xOffset;
        }
        else {
            xOffset = 0;
        }
        if (yOffset && yOffset <= 1) {
            yOffset = height * yOffset;
        }
        else {
            yOffset = 0;
        }
        return { xOffset: xOffset, yOffset: yOffset };
    }
    function inOffsetView(child, settings) {
        if (settings === void 0) { settings = {}; }
        var container;
        var offsetTop;
        var offsetLeft;
        if (!settings.container) {
            container = child.offsetParent;
            if (!container) {
                throw new Error('inOffsetView(child, ...) => child.offsetParent cannot be null. Check that it is in a container with "position: relative" set.');
            }
            offsetTop = child.offsetTop;
            offsetLeft = child.offsetLeft;
        }
        else {
            var result = getChildOffsetPosForContainer(settings.container, child, 'inOffsetView(child, ...)');
            offsetTop = result.offsetTop;
            offsetLeft = result.offsetLeft;
        }
        var childRect = child.getBoundingClientRect();
        if (Object.values(boundingClientRectToObject(childRect)).every(function (val) { return val === 0; })) {
            return false;
        }
        var containerRect = container.getBoundingClientRect();
        var _a = xyOffset(settings.xOffset, settings.yOffset, containerRect.width, containerRect.height), xOffset = _a.xOffset, yOffset = _a.yOffset;
        var x = true;
        var y = true;
        if (!settings.ignoreY) {
            var _b = lines(container.scrollTop, containerRect.height, offsetTop, childRect.height, yOffset), containerTopLine = _b[0], containerBottomLine = _b[1], childTopLine = _b[2], childBottomLine = _b[3];
            y = settings.whole ?
                childBottomLine < containerBottomLine
                    && childTopLine > containerTopLine
                : childBottomLine > containerTopLine
                    && childTopLine < containerBottomLine;
        }
        if (!settings.ignoreX) {
            var _c = lines(container.scrollLeft, containerRect.width, offsetLeft, childRect.width, xOffset), containerLeftLine = _c[0], containerRightLine = _c[1], childLeftLine = _c[2], childRightLine = _c[3];
            x = settings.whole ?
                childRightLine < containerRightLine
                    && childLeftLine > containerLeftLine
                : childRightLine > containerLeftLine
                    && childLeftLine < containerRightLine;
        }
        return x && y;
    }
    DOM.inOffsetView = inOffsetView;
    function scrollTo(container, left, top, settings) {
        if (settings === void 0) { settings = {}; }
        if (isIE()) {
            container.scrollLeft = left;
            container.scrollTop = top;
        }
        else {
            container.scrollTo({
                left: left,
                top: top,
                behavior: settings.smooth ? 'smooth' : 'auto',
            });
        }
    }
    function scrollContainerToViewWholeChild(container, child, settings) {
        if (settings === void 0) { settings = {}; }
        var result = getChildOffsetPosForContainer(container, child, 'scrollContainerToViewChildWhole(...)');
        var offsetTop = result.offsetTop;
        var offsetLeft = result.offsetLeft;
        var containerRect = container.getBoundingClientRect();
        var childRect = child.getBoundingClientRect();
        var _a = xyOffset(settings.xOffset, settings.yOffset, containerRect.width, containerRect.height), xOffset = _a.xOffset, yOffset = _a.yOffset;
        var _b = lines(container.scrollTop, containerRect.height, offsetTop, childRect.height, yOffset), containerTopLine = _b[0], containerBottomLine = _b[1], childTopLine = _b[2], childBottomLine = _b[3];
        var _c = lines(container.scrollLeft, containerRect.width, offsetLeft, childRect.width, xOffset), containerLeftLine = _c[0], containerRightLine = _c[1], childLeftLine = _c[2], childRightLine = _c[3];
        var x = container.scrollLeft;
        var y = container.scrollTop;
        if (!settings.ignoreY) {
            var above = childTopLine < containerTopLine;
            var below = childBottomLine > containerBottomLine;
            if (above && !below) {
                y = childTopLine;
            }
            else if (!above && below) {
                y += childBottomLine - containerBottomLine;
            }
        }
        if (!settings.ignoreX) {
            var left = childLeftLine < containerLeftLine;
            var right = childRightLine > containerRightLine;
            if (left && !right) {
                x = childLeftLine;
            }
            else if (!left && right) {
                x += childRightLine - containerRightLine;
            }
        }
        scrollTo(container, x, y, settings);
    }
    DOM.scrollContainerToViewWholeChild = scrollContainerToViewWholeChild;
    function inVerticalWindowView(element, offset) {
        if (offset === void 0) { offset = 0; }
        var rect = element.getBoundingClientRect();
        if (Object.values(boundingClientRectToObject(rect)).every(function (val) { return val === 0; })) {
            return false;
        }
        var viewHeight = getViewport().height;
        if (offset <= 1) {
            offset = viewHeight * offset;
        }
        return (rect.bottom + offset) >= 0 && (rect.top + offset - viewHeight) < 0;
    }
    DOM.inVerticalWindowView = inVerticalWindowView;
    function pixelsBelowScreenTop(element) {
        return element.getBoundingClientRect().top;
    }
    DOM.pixelsBelowScreenTop = pixelsBelowScreenTop;
    function pixelsAboveScreenBottom(element) {
        var rect = element.getBoundingClientRect();
        var viewHeight = getViewport().height;
        return viewHeight - rect.bottom;
    }
    DOM.pixelsAboveScreenBottom = pixelsAboveScreenBottom;
    function onFirstAppearance(element, callback, setting) {
        var timeout = setting ? setting.timeout : 0;
        var offset = setting ? setting.offset : 0;
        if (inVerticalWindowView(element, offset)) {
            setTimeout(callback, timeout);
        }
        else {
            var eventCallback_1 = function (event) {
                if (inVerticalWindowView(element, offset)) {
                    setTimeout(callback, timeout);
                    document.removeEventListener('scroll', eventCallback_1, {
                        capture: true
                    });
                }
            };
            document.addEventListener('scroll', eventCallback_1, {
                capture: true,
                passive: true
            });
        }
    }
    DOM.onFirstAppearance = onFirstAppearance;
    function getPathToRoot(element) {
        var path = [];
        var curr = element;
        while (curr) {
            path.push(curr);
            curr = curr.parentElement;
        }
        if (path.indexOf(window) === -1 && path.indexOf(document) === -1) {
            path.push(document);
        }
        if (path.indexOf(window) === -1) {
            path.push(window);
        }
        return path;
    }
    DOM.getPathToRoot = getPathToRoot;
})(DOM = exports.DOM || (exports.DOM = {}));
