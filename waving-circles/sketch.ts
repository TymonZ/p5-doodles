// npm run sketch

import * as p5 from 'p5';

import 'p5/lib/addons/p5.sound';

import { circleCreator } from './func/circleCreator';

import { circleRenderer } from './func/circleRenderer';

var sketch = (p5: p5) => {
	const width: 	number = 600;
	const height: 	number = 600;
	const FPS:		number = 60;

	let frame: 	number = 0;

	let bgrColor: 	p5.Color = p5.color(10, 30, 60);
	let crcColor:	p5.Color = p5.color(255, 255, 255);

	let cnv: p5.Renderer;

	p5.setup = () => {
		cnv = p5.createCanvas(width, height);
		p5.background(bgrColor);
		p5.frameRate(FPS);
	}

	p5.draw = () => {
		let circleArray = circleCreator(frame, 60, width/2, height/2, crcColor);

		p5.background(bgrColor);
		circleRenderer(p5, circleArray);

		p5.rect(150, 150, 300, 300);

		p5.circle(p5.mouseX, p5.mouseY, 30);

		frame++;
	}

	
}

new p5(sketch);