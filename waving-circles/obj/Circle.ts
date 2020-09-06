import p5 = require("p5");

class Circle {
    x:          number;
    y:          number;
    color:      p5.Color;
    size:       number;
    strokeSize: number;

    constructor(x:number, y:number, color:p5.Color, size:number, strokeSize:number) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.strokeSize = strokeSize;
    }

    show(p5:p5) {
        p5.circle(this.x, this.y, this.size);
        p5.noFill();
        p5.strokeWeight(this.strokeSize);
        p5.stroke(this.color);
    }
}

export { Circle }