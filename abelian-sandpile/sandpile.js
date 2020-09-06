// pxltr2033 & Rafał Majewski @26.02.2020

let width = 500;
let height = 500;
let tiles = {};
	
let mouseClickValueChange = 500;
let frameCounter = 0;
let bckgColor = 100;
let tileSize = 5;

function setup() {
	cnv = createCanvas(width, height);
	background(bckgColor);
	frameRate(240);
	{
		for (let x = 0; x < width/tileSize; ++x) {
			tiles[x] = {};
			
			for (let y = 0; y < height/tileSize; ++y) {
				tiles[x][y] = new Tile(
					x*tileSize,
					y*tileSize,
					tileSize
				);
			}
		}
	}
}

//operator warunkowy - sprawdź to
const dx=(dir)=>(
	(dir == 1)?(1):((dir == 3)?(-1):(0))
);

const dy=(dir)=>(
	(dir == 0)?(-1):((dir == 2)?(1):(0))
);

function mouseDragged() {
	let positionX = Math.floor(mouseX/tileSize);
	let positionY = Math.floor(mouseY/tileSize);
	if (!tiles[positionX]) tiles[positionX]=[];
	if (!tiles[positionX][positionY]) tiles[positionX][positionY]=new Tile(positionX*tileSize, positionY*tileSize, tileSize);
	tiles[positionX][positionY].value+=mouseClickValueChange;
}

function mouseClicked() {
	let positionX = Math.floor(mouseX/tileSize);
	let positionY = Math.floor(mouseY/tileSize);
	if (!tiles[positionX]) tiles[positionX]=[];
	if (!tiles[positionX][positionY]) tiles[positionX][positionY]=new Tile(positionX*tileSize, positionY*tileSize, tileSize);
	tiles[positionX][positionY].value+=mouseClickValueChange;
}

function draw() {
	for (let x = 0; x < width/tileSize; ++x) {
		for (let y = 0; y < height/tileSize; ++y) {
			let tile = tiles[x][y];
			if (tile.value >= 4) {
				for (let i=0; i<4; ++i) {
					let neighborX=x+dx(i);
					let neighborY=y+dy(i);
					if (!tiles[neighborX]) tiles[neighborX]=[];
					if (!tiles[neighborX][neighborY]) tiles[neighborX][neighborY]=new Tile(neighborX*tileSize, neighborY*tileSize, tileSize);
					let neighbor=tiles[neighborX][neighborY];
					++neighbor.value;
					--tile.value;
				}
			}
			tiles[x][y].show();
		}
	}

	frameCounter++;
}

class Tile {
	constructor(x, y, size) {
		this.x =	  x;
		this.y =	  y;
		this.size =   size;
		this.value = 0;
	}

	show() {
		// 0 - czarny
		// 1 - niebieski
		// 2 - zielony
		// 3 - czerwony
		// >= 4 - biały

		let tileColor;
		if (this.value == 0) tileColor=color(0);
		else if (this.value == 1) tileColor=color(120, 50, 255);
		else if (this.value == 2) tileColor=color(50, 255, 120);
		else if (this.value == 3) tileColor=color(255, 120, 50);
		else tileColor=color(255);
		
		noStroke();
		fill(tileColor);
		rect(this.x, this.y, this.size, this.size);
	}
}
