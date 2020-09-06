var particles = [];
var frameCounter;
var fps = 60;
var fpsDelta = 1/fps;

var colorArray = [
	Math.floor(3*Math.random()),
	Math.floor(3*Math.random()),
	Math.floor(3*Math.random())
];

function mouseClicked(){

	colorArray = [
		Math.floor(3*Math.random()),
		Math.floor(3*Math.random()),
		Math.floor(3*Math.random())
	];

	background(255);

}

function setup() {
	createCanvas(500, 500);
	frameRate(fps);
	background(255);

	frameCounter = 0;
}

function draw() {

	if(frameCounter % (0.5 * fps) == 0){

		p = new Particle(random(0, 500), random(0, 500));
		particles.push(p)
		
		
	}

	for (let j = 0; j < particles.length; j++){
		let d = dist(particles[j].x, particles[j].y, mouseX, mouseY);

		let xyz = (particles[j].currentVelocity/210)*255;
		//let color1 = color(d, 255-xyz, 255-xyz);
		let colorArray2 = [d, xyz, 255-xyz];
		let color1 = color(
			colorArray2[colorArray[0]],
			colorArray2[colorArray[1]],
			colorArray2[colorArray[2]]
		);

		particles[j].show(7, color1, 126);
		particles[j].particleDelta();
	}

	frameCounter++;
}

class Particle {

	constructor(x, y) {
		this.x = x || 250;
		this.y = y || 250;
		this.alpha = 255;
		this.maxVelocity = 210;
		this.currentVelocity;
		this.angle = 0;
	}

	particleDelta(){
		let angleMouse = Math.atan2(mouseY-this.y, mouseX-this.x)
		let d = dist(this.x, this.y, mouseX, mouseY);
		d = Math.pow(d, 0.2)
		d = Math.max(1, d);

		if ((this.x-mouseX)*Math.sin(this.angle) > (this.y-mouseY)*Math.cos(this.angle)){
			this.angle+=0.03;
		}
		else{
		this.angle-=0.03;
		}

		this.currentVelocity = this.maxVelocity / d;
		this.x=this.x+Math.cos(this.angle)*this.currentVelocity * fpsDelta;
		this.y=this.y+Math.sin(this.angle)*this.currentVelocity * fpsDelta;
	}

	show(particleSize, particleColor) {
		noStroke(particleSize);
		fill(particleColor);

		ellipse(this.x, this.y, particleSize, particleSize)
	}

}
