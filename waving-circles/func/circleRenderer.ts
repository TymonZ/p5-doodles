import p5 = require("p5")

import { Circle } from "../obj/Circle";

function circleRenderer(p5:p5, circleArray:Circle[]) {
    for (let i = 0; i < circleArray.length; i++) {
        const c = circleArray[i];

        if (c.size < 300) {
            c.size += 1;
        } else {
            circleArray.shift();
        }
        c.show(p5);        
    }
}

export { circleRenderer }