"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation_1 = require("./Animation");
var Color_1 = require("./Color");
var Coordinate_1 = require("./Coordinate");
var Stroke_1 = require("./Stroke");
var Vector_1 = require("./Vector");
var Particle = (function () {
    function Particle(settings) {
        this.opacityAnimation = null;
        this.radiusAnimation = null;
        this.color = this.createColor(settings.color);
        this.opacity = this.createOpacity(settings.opacity);
        this.velocity = this.createVelocity(settings.move);
        this.shape = this.createShape(settings.shape);
        this.stroke = this.createStroke(settings.stroke);
        this.radius = this.createRadius(settings.radius);
        if (settings.animate) {
            if (settings.animate.opacity) {
                this.opacityAnimation = this.animateOpacity(settings.animate.opacity);
            }
            if (settings.animate.radius) {
                this.radiusAnimation = this.animateRadius(settings.animate.radius);
            }
        }
        this.bubbled = {
            opacity: 0,
            radius: 0
        };
    }
    Particle.prototype.createColor = function (color) {
        if (typeof color === 'string') {
            if (color === 'random') {
                return Color_1.default.fromRGB(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
            }
            else {
                return Color_1.default.fromHex(color);
            }
        }
        else if (typeof color === 'object') {
            if (color instanceof Color_1.default) {
                return color;
            }
            else if (color instanceof Array) {
                return this.createColor(color[Math.floor(Math.random() * color.length)]);
            }
            else {
                return Color_1.default.fromObject(color);
            }
        }
        return Color_1.default.fromRGB(0, 0, 0);
    };
    Particle.prototype.createOpacity = function (opacity) {
        if (typeof opacity === 'object') {
            if (opacity instanceof Array) {
                return this.createOpacity(opacity[Math.floor(Math.random() * opacity.length)]);
            }
        }
        else if (typeof opacity === 'string') {
            if (opacity === 'random') {
                return Math.random();
            }
        }
        else if (typeof opacity === 'number') {
            if (opacity >= 0) {
                return opacity;
            }
        }
        return 1;
    };
    Particle.prototype.createVelocity = function (move) {
        if (typeof move === 'boolean') {
            if (!move) {
                return new Vector_1.default(0, 0);
            }
        }
        else if (typeof move === 'object') {
            var velocity = void 0;
            switch (move.direction) {
                case 'top':
                    velocity = new Vector_1.default(0, -1);
                    break;
                case 'top-right':
                    velocity = new Vector_1.default(0.7, -0.7);
                    break;
                case 'right':
                    velocity = new Vector_1.default(1, 0);
                    break;
                case 'bottom-right':
                    velocity = new Vector_1.default(0.7, 0.7);
                    break;
                case 'bottom':
                    velocity = new Vector_1.default(0, 1);
                    break;
                case 'bottom-left':
                    velocity = new Vector_1.default(-0.7, 0.7);
                    break;
                case 'left':
                    velocity = new Vector_1.default(-1, 0);
                    break;
                case 'top-left':
                    velocity = new Vector_1.default(-0.7, -0.7);
                    break;
                default:
                    velocity = new Vector_1.default(0, 0);
                    break;
            }
            if (move.straight) {
                if (move.random) {
                    velocity.x *= Math.random();
                    velocity.y *= Math.random();
                }
            }
            else {
                velocity.x += Math.random() - 0.5;
                velocity.y += Math.random() - 0.5;
            }
            return velocity;
        }
        return new Vector_1.default(0, 0);
    };
    Particle.prototype.createShape = function (shape) {
        if (typeof shape === 'object') {
            if (shape instanceof Array) {
                return this.createShape(shape[Math.floor(Math.random() * shape.length)]);
            }
        }
        else if (typeof shape === 'string') {
            var sides = parseInt(shape.substring(0, shape.indexOf('-')));
            if (!isNaN(sides)) {
                return this.createShape(sides);
            }
            return shape;
        }
        else if (typeof shape === 'number') {
            if (shape >= 3) {
                return shape;
            }
        }
        return 'circle';
    };
    Particle.prototype.createStroke = function (stroke) {
        if (typeof stroke === 'object') {
            if (typeof stroke.width === 'number') {
                if (stroke.width > 0) {
                    return new Stroke_1.default(stroke.width, this.createColor(stroke.color));
                }
            }
        }
        return new Stroke_1.default(0, Color_1.default.fromRGB(0, 0, 0));
    };
    Particle.prototype.createRadius = function (radius) {
        if (typeof radius === 'object') {
            if (radius instanceof Array) {
                return this.createRadius(radius[Math.floor(Math.random() * radius.length)]);
            }
        }
        else if (typeof radius === 'string') {
            if (radius === 'random') {
                return Math.random();
            }
        }
        else if (typeof radius === 'number') {
            if (radius >= 0) {
                return radius;
            }
        }
        return 5;
    };
    Particle.prototype.parseSpeed = function (speed) {
        if (speed > 0) {
            return speed;
        }
        return 0.5;
    };
    Particle.prototype.animateOpacity = function (animation) {
        if (animation) {
            var max = this.opacity;
            var min = this.createOpacity(animation.min);
            var speed = this.parseSpeed(animation.speed) / 100;
            if (!animation.sync) {
                speed *= Math.random();
            }
            this.opacity *= Math.random();
            return new Animation_1.default(speed, max, min);
        }
        return null;
    };
    Particle.prototype.animateRadius = function (animation) {
        if (animation) {
            var max = this.radius;
            var min = this.createRadius(animation.min);
            var speed = this.parseSpeed(animation.speed) / 100;
            if (!animation.sync) {
                speed *= Math.random();
            }
            this.opacity *= Math.random();
            return new Animation_1.default(speed, max, min);
        }
        return null;
    };
    Particle.prototype.setPosition = function (position) {
        this.position = position;
    };
    Particle.prototype.move = function (speed) {
        this.position.x += this.velocity.x * speed;
        this.position.y += this.velocity.y * speed;
    };
    Particle.prototype.getRadius = function () {
        return this.radius + this.bubbled.radius;
    };
    Particle.prototype.getOpacity = function () {
        return this.opacity + this.bubbled.opacity;
    };
    Particle.prototype.edge = function (dir) {
        switch (dir) {
            case 'top':
                return new Coordinate_1.default(this.position.x, this.position.y - this.getRadius());
            case 'right':
                return new Coordinate_1.default(this.position.x + this.getRadius(), this.position.y);
            case 'bottom':
                return new Coordinate_1.default(this.position.x, this.position.y + this.getRadius());
            case 'left':
                return new Coordinate_1.default(this.position.x - this.getRadius(), this.position.y);
            default:
                return this.position;
        }
    };
    Particle.prototype.intersecting = function (particle) {
        return this.position.distance(particle.position) < this.getRadius() + particle.getRadius();
    };
    Particle.prototype.bubble = function (mouse, settings) {
        var distance = this.position.distance(mouse.position);
        var ratio = 1 - distance / settings.distance;
        if (ratio >= 0 && mouse.over) {
            this.bubbled.opacity = ratio * (settings.opacity - this.opacity);
            this.bubbled.radius = ratio * (settings.radius - this.radius);
        }
        else {
            this.bubbled.opacity = 0;
            this.bubbled.radius = 0;
        }
    };
    return Particle;
}());
exports.default = Particle;
