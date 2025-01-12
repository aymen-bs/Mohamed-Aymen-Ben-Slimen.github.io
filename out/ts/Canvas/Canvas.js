"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Particles_1 = require("../Particles/Particles");
var Stars_1 = require("./Stars");
var WebPage_1 = require("../Modules/WebPage");
var canvas = new Particles_1.default('#particles', '2d');
canvas.setParticleSettings(Stars_1.Stars.Particles);
canvas.setInteractiveSettings(Stars_1.Stars.Interactive);
canvas.start();
var paused = false;
WebPage_1.ScrollHook.addEventListener('scroll', function () {
    if (WebPage_1.Sections.get('canvas').inView()) {
        if (paused) {
            paused = false;
            canvas.resume();
        }
    }
    else {
        if (!paused) {
            paused = true;
            canvas.pause();
        }
    }
}, {
    capture: true,
    passive: true
});
