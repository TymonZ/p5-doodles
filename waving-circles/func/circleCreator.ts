import p5 = require("p5")

import { Circle } from "../obj/Circle";

let circleArray: Circle[] = [];

function circleCreator(frame:number, density:number, x:number, y:number, color:p5.Color) {
    if (frame % density === 0) {
        const c = new Circle(x, y, color, 0, 1);
        circleArray.push(c);
    }
    return circleArray;
}

export { circleCreator }