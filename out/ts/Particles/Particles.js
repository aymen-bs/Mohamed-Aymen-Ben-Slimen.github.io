"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimationFrameFunctions_1 = require("./AnimationFrameFunctions");
var DOM_1 = require("../Modules/DOM");
var Coordinate_1 = require("./Coordinate");
var Particle_1 = require("./Particle");
var Particles = (function () {
    function Particles(cssQuery, context) {
        this.state = 'stopped';
        this.pixelRatioLimit = 8;
        this.pixelRatio = 1;
        this.particles = new Array();
        this.mouse = {
            position: new Coordinate_1.default(0, 0),
            over: false
        };
        this.handleResize = null;
        this.animationFrame = null;
        this.mouseEventsAttached = false;
        this.canvas = DOM_1.DOM.getFirstElement(cssQuery);
        if (this.canvas === null) {
            throw "Canvas ID " + cssQuery + " not found.";
        }
        this.ctx = this.canvas.getContext(context);
        window.requestAnimationFrame = AnimationFrameFunctions_1.AnimationFrameFunctions.requestAnimationFrame();
        window.cancelAnimationFrame = AnimationFrameFunctions_1.AnimationFrameFunctions.cancelAnimationFrame();
        this.particleSettings = {
            number: 350,
            density: 1000,
            color: '#FFFFFF',
            opacity: 1,
            radius: 5,
            shape: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            move: {
                speed: 0.4,
                direction: 'bottom',
                straight: true,
                random: true,
                edgeBounce: false,
                attract: false
            },
            events: {
                resize: true,
                hover: false,
                click: false
            },
            animate: {
                opacity: false,
                radius: false
            }
        };
        this.interactiveSettings = {
            hover: {
                bubble: {
                    distance: 75,
                    radius: 7,
                    opacity: 1
                },
                repulse: {
                    distance: 100,
                }
            },
            click: {
                add: {
                    number: 4
                },
                remove: {
                    number: 2
                }
            }
        };
    }
    Particles.prototype.initialize = function () {
        this.trackMouse();
        this.initializePixelRatio(window.devicePixelRatio >= this.pixelRatioLimit ? this.pixelRatioLimit - 2 : window.devicePixelRatio);
        this.setCanvasSize();
        this.clear();
        this.removeParticles();
        this.createParticles();
        this.distributeParticles();
    };
    Particles.prototype.trackMouse = function () {
        var _this = this;
        if (this.mouseEventsAttached) {
            return;
        }
        if (this.particleSettings.events) {
            if (this.particleSettings.events.hover) {
                this.canvas.addEventListener('mousemove', function (event) {
                    _this.mouse.position.x = event.offsetX * _this.pixelRatio;
                    _this.mouse.position.y = event.offsetY * _this.pixelRatio;
                    _this.mouse.over = true;
                });
                this.canvas.addEventListener('mouseleave', function () {
                    _this.mouse.position.x = null;
                    _this.mouse.position.y = null;
                    _this.mouse.over = false;
                });
            }
            if (this.particleSettings.events.click) {
            }
        }
        this.mouseEventsAttached = true;
    };
    Particles.prototype.initializePixelRatio = function (newRatio) {
        if (newRatio === void 0) { newRatio = window.devicePixelRatio; }
        var multiplier = newRatio / this.pixelRatio;
        this.width = this.canvas.offsetWidth * multiplier;
        this.height = this.canvas.offsetHeight * multiplier;
        if (this.particleSettings.radius instanceof Array) {
            this.particleSettings.radius = this.particleSettings.radius.map(function (r) { return r * multiplier; });
        }
        else {
            if (typeof this.particleSettings.radius === 'number') {
                this.particleSettings.radius *= multiplier;
            }
        }
        if (this.particleSettings.move) {
            this.particleSettings.move.speed *= multiplier;
        }
        if (this.particleSettings.animate && this.particleSettings.animate.radius) {
            this.particleSettings.animate.radius.speed *= multiplier;
        }
        if (this.interactiveSettings.hover) {
            if (this.interactiveSettings.hover.bubble) {
                this.interactiveSettings.hover.bubble.radius *= multiplier;
                this.interactiveSettings.hover.bubble.distance *= multiplier;
            }
            if (this.interactiveSettings.hover.repulse) {
                this.interactiveSettings.hover.repulse.distance *= multiplier;
            }
        }
        this.pixelRatio = newRatio;
    };
    Particles.prototype.checkZoom = function () {
        if (window.devicePixelRatio !== this.pixelRatio && window.devicePixelRatio < this.pixelRatioLimit) {
            this.stopDrawing();
            this.initialize();
            this.draw();
        }
    };
    Particles.prototype.setCanvasSize = function () {
        var _this = this;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        if (this.particleSettings.events && this.particleSettings.events.resize) {
            this.handleResize = function () {
                _this.checkZoom();
                _this.width = _this.canvas.offsetWidth * _this.pixelRatio;
                _this.height = _this.canvas.offsetHeight * _this.pixelRatio;
                _this.canvas.width = _this.width;
                _this.canvas.height = _this.height;
                if (!_this.particleSettings.move) {
                    _this.removeParticles();
                    _this.createParticles();
                    _this.drawParticles();
                }
                _this.distributeParticles();
            };
            window.addEventListener('resize', this.handleResize);
        }
    };
    Particles.prototype.getFill = function () {
        return this.ctx.fillStyle;
    };
    Particles.prototype.setFill = function (color) {
        this.ctx.fillStyle = color;
    };
    Particles.prototype.setStroke = function (stroke) {
        this.ctx.strokeStyle = stroke.color.toString();
        this.ctx.lineWidth = stroke.width;
    };
    Particles.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Particles.prototype.draw = function () {
        this.drawParticles();
        if (this.particleSettings.move)
            this.animationFrame = window.requestAnimationFrame(this.draw.bind(this));
    };
    Particles.prototype.stopDrawing = function () {
        if (this.handleResize) {
            window.removeEventListener('resize', this.handleResize);
            this.handleResize = null;
        }
        if (this.animationFrame) {
            window.cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    };
    Particles.prototype.drawPolygon = function (center, radius, sides) {
        var diagonalAngle = 360 / sides;
        diagonalAngle *= Math.PI / 180;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(center.x, center.y);
        this.ctx.rotate(diagonalAngle / (sides % 2 ? 4 : 2));
        this.ctx.moveTo(radius, 0);
        var angle;
        for (var s = 0; s < sides; s++) {
            angle = s * diagonalAngle;
            this.ctx.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
        }
        this.ctx.fill();
        this.ctx.restore();
    };
    Particles.prototype.drawParticle = function (particle) {
        var opacity = particle.getOpacity();
        var radius = particle.getRadius();
        this.setFill(particle.color.toString(opacity));
        this.ctx.beginPath();
        if (typeof (particle.shape) === 'number') {
            this.drawPolygon(particle.position, radius, particle.shape);
        }
        else {
            switch (particle.shape) {
                default:
                case 'circle':
                    this.ctx.arc(particle.position.x, particle.position.y, radius, 0, Math.PI * 2, false);
                    break;
            }
        }
        this.ctx.closePath();
        if (particle.stroke.width > 0) {
            this.setStroke(particle.stroke);
            this.ctx.stroke();
        }
        this.ctx.fill();
    };
    Particles.prototype.getNewPosition = function () {
        return new Coordinate_1.default(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
    };
    Particles.prototype.checkPosition = function (particle) {
        if (this.particleSettings.move) {
            if (this.particleSettings.move.edgeBounce) {
                if (particle.edge('left').x < 0)
                    particle.position.x += particle.getRadius();
                else if (particle.edge('right').x > this.width)
                    particle.position.x -= particle.getRadius();
                if (particle.edge('top').y < 0)
                    particle.position.y += particle.getRadius();
                else if (particle.edge('bottom').y > this.height)
                    particle.position.y -= particle.getRadius();
            }
        }
        return true;
    };
    Particles.prototype.distributeParticles = function () {
        if (this.particleSettings.density && typeof (this.particleSettings.density) === 'number') {
            var area = this.canvas.width * this.canvas.height / 1000;
            area /= this.pixelRatio * 2;
            var particlesPerArea = area * this.particleSettings.number / this.particleSettings.density;
            var missing = particlesPerArea - this.particles.length;
            if (missing > 0) {
                this.createParticles(missing);
            }
            else {
                this.removeParticles(Math.abs(missing));
            }
        }
    };
    Particles.prototype.createParticles = function (number, position) {
        if (number === void 0) { number = this.particleSettings.number; }
        if (position === void 0) { position = null; }
        if (!this.particleSettings)
            throw 'Particle settings must be initalized before a particle is created.';
        var particle;
        for (var p = 0; p < number; p++) {
            particle = new Particle_1.default(this.particleSettings);
            if (position) {
                particle.setPosition(position);
            }
            else {
                do {
                    particle.setPosition(this.getNewPosition());
                } while (!this.checkPosition(particle));
            }
            this.particles.push(particle);
        }
    };
    Particles.prototype.removeParticles = function (number) {
        if (number === void 0) { number = null; }
        if (!number) {
            this.particles = new Array();
        }
        else {
            this.particles.splice(0, number);
        }
    };
    Particles.prototype.updateParticles = function () {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var particle = _a[_i];
            if (this.particleSettings.move) {
                particle.move(this.particleSettings.move.speed);
                if (!this.particleSettings.move.edgeBounce) {
                    if (particle.edge('right').x < 0) {
                        particle.setPosition(new Coordinate_1.default(this.width + particle.getRadius(), Math.random() * this.height));
                    }
                    else if (particle.edge('left').x > this.width) {
                        particle.setPosition(new Coordinate_1.default(-1 * particle.getRadius(), Math.random() * this.height));
                    }
                    if (particle.edge('bottom').y < 0) {
                        particle.setPosition(new Coordinate_1.default(Math.random() * this.width, this.height + particle.getRadius()));
                    }
                    else if (particle.edge('top').y > this.height) {
                        particle.setPosition(new Coordinate_1.default(Math.random() * this.width, -1 * particle.getRadius()));
                    }
                }
                if (this.particleSettings.move.edgeBounce) {
                    if (particle.edge('left').x < 0 || particle.edge('right').x > this.width) {
                        particle.velocity.flip(true, false);
                    }
                    if (particle.edge('top').y < 0 || particle.edge('bottom').y > this.height) {
                        particle.velocity.flip(false, true);
                    }
                }
            }
            if (this.particleSettings.animate) {
                if (this.particleSettings.animate.opacity) {
                    if (particle.opacity >= particle.opacityAnimation.max) {
                        particle.opacityAnimation.increasing = false;
                    }
                    else if (particle.opacity <= particle.opacityAnimation.min) {
                        particle.opacityAnimation.increasing = true;
                    }
                    particle.opacity += particle.opacityAnimation.speed * (particle.opacityAnimation.increasing ? 1 : -1);
                    if (particle.opacity < 0) {
                        particle.opacity = 0;
                    }
                }
                if (this.particleSettings.animate.radius) {
                    if (particle.radius >= particle.radiusAnimation.max) {
                        particle.radiusAnimation.increasing = false;
                    }
                    else if (particle.radius <= particle.radiusAnimation.min) {
                        particle.radiusAnimation.increasing = true;
                    }
                    particle.radius += particle.radiusAnimation.speed * (particle.radiusAnimation.increasing ? 1 : -1);
                    if (particle.radius < 0) {
                        particle.radius = 0;
                    }
                }
            }
            if (this.particleSettings.events) {
                if (this.particleSettings.events.hover === 'bubble' && this.interactiveSettings.hover && this.interactiveSettings.hover.bubble) {
                    particle.bubble(this.mouse, this.interactiveSettings.hover.bubble);
                }
            }
        }
    };
    Particles.prototype.drawParticles = function () {
        this.clear();
        this.updateParticles();
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var particle = _a[_i];
            this.drawParticle(particle);
        }
    };
    Particles.prototype.setParticleSettings = function (settings) {
        if (this.state !== 'stopped') {
            throw 'Cannot change settings while Canvas is running.';
        }
        else {
            this.particleSettings = settings;
        }
    };
    Particles.prototype.setInteractiveSettings = function (settings) {
        if (this.state !== 'stopped') {
            throw 'Cannot change settings while Canvas is running.';
        }
        else {
            this.interactiveSettings = settings;
        }
    };
    Particles.prototype.start = function () {
        if (this.particleSettings === null)
            throw 'Particle settings must be initalized before Canvas can start.';
        if (this.state !== 'stopped')
            throw 'Canvas is already running.';
        this.state = 'running';
        this.initialize();
        this.draw();
    };
    Particles.prototype.pause = function () {
        if (this.state === 'stopped') {
            throw 'No Particles to pause.';
        }
        this.state = 'paused';
        this.moveSettings = this.particleSettings.move;
        this.particleSettings.move = false;
    };
    Particles.prototype.resume = function () {
        if (this.state === 'stopped') {
            throw 'No Particles to resume.';
        }
        this.state = 'running';
        this.particleSettings.move = this.moveSettings;
        this.draw();
    };
    Particles.prototype.stop = function () {
        this.state = 'stopped';
        this.stopDrawing();
    };
    return Particles;
}());
exports.default = Particles;
