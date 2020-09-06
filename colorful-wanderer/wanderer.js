//canvas
let size 				= 600;
let bckgColor 			= 100;

// tiles
let tiles 				= [];
let tileSize 			= size / 32;
let positionX 			= Math.floor(size / tileSize / 2);
let positionY 			= Math.floor(size / tileSize / 2);

//tile colourer
let isColour 			= true;
let isColourRandom 		= true;
let isMidiControlled 	= false;
let tileRed 			= 0;
let tileGreen 			= 0;
let tileBlue 			= 0;

//frames
let frameCounter 		= 0;

//MIDI
let clockSignal 		= 0;
let noteValue 			= 0;

{ //MIDI stuff
	const getMIDIMessage=(midiMessage)=>{
		let command = midiMessage.data[0];
		noteValue = midiMessage.data[1];

		if(command == 145) { //note on
			tilesColourer();
			//console.log(noteValue);
		}
		if(command == 129) { //note off

		}

		// for(let i = 0; i < midiMessage.data.length; i++) {
		// 	console.log(midiMessage.data[i]);
		// }
	};

	navigator.requestMIDIAccess().then((midiAccess)=>{
			for (let input of midiAccess.inputs.values()) {
				input.onmidimessage=getMIDIMessage;
			}
		}, ()=>{
			alert('Could not access your MIDI devices.');
		});
}

function setup() {
	//basic setup
	cnv = createCanvas(size, size);
	background(bckgColor);
	frameRate(30);

	{ //tiles setup
		for (let x = 0; x < size/tileSize; ++x) {
			tiles[x] = [];
			
			for (let y = 0; y < size/tileSize; ++y) {
				tiles[x][y] = new Tile(
					x*tileSize,
					y*tileSize,
					tileSize,
					color(0)
				);
			}
		}

		tiles[positionX][positionY].color = color(0); //first tile setup
		tiles[positionX][positionY].timesWereChanged++;
	}

}

function draw() {
	//show tiles
	for (let x = 0; x < tiles.length; ++x) {
		for (let y = 0; y < tiles[x].length; ++y) {
			//tilesColourer();
			tiles[x][y].show();
		}
	}

	tilesColourer();

	frameCounter++;
}

{	//dx and dy functions used in tilesColourer()
	function dx(dir) {
		if(dir == 1) 		return 1;
		else if(dir == 3) 	return -1;
		else 				return 0;
	}	
	function dy(dir) {
		if(dir == 0) 		return -1;
		else if(dir == 2) 	return 1;
		else 				return 0;
	}
}

function tilesColourer() {
	let dir;
	if(isColour == true) {
		if(isColourRandom == false) {
			if(tileBlue < 255) {
				tileRed = 255 - tiles[positionX][positionY].timesWereChanged * 30;
				tileGreen = tiles[positionX][positionY].timesWereChanged * 10;
				tileBlue = tiles[positionX][positionY].timesWereChanged * 40
			}
			else {
				tileRed -= tiles[positionX][positionY].timesWereChanged * 40;
				tileGreen = tiles[positionX][positionY].timesWereChanged * 15;
				tileBlue = 255 - tiles[positionX][positionY].timesWereChanged * 5;
			}
		
			if(tileRed <= -100) {
				tiles[positionX][positionY].timesWereChanged = 0;
			}
	
			tiles[positionX][positionY].tileColor(tileRed, tileGreen, tileBlue);
		}
		else {
			tiles[positionX][positionY].color = createRandomColor();
		}
	}
	else {
		tiles[positionX][positionY].tileColor(255, 255, 255);
	}

	console.log("RGB", tileRed, "    ", tileGreen, "    ", tileBlue);
	console.log("Times Were Changed", tiles[positionX][positionY].timesWereChanged);

	if(isMidiControlled == true) {
		dir = noteValue % 4;
	}
	else {
		dir = Math.floor(Math.random() * 4);
	}
	positionX += dx(dir);
	positionY += dy(dir);
	positionX = (positionX + tiles.length) % tiles.length;
	positionY = (positionY + tiles[0].length) % tiles.length;

	tiles[positionX][positionY].timesWereChanged++;

	tiles[positionX][positionY].tileColor(255,255,255);
}

function createRandomColor() {
	return color(
		Math.floor(Math.random()*256),
		Math.floor(Math.random()*256),
		Math.floor(Math.random()*256),
	)
}

class Tile {
	constructor(x, y, size, color) {
		this.x 					= x;
		this.y 					= y;
		this.size			  	= size;
		this.color            	= color;
		this.timesWereChanged 	= 0;
		this.r;
		this.g;
		this.b;
	}

	tileColor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.color = color(this.r, this.g, this.b);
	}

	show() {
		noStroke();
		fill(this.color);
		rect(this.x, this.y, this.size, this.size);
	}
}
