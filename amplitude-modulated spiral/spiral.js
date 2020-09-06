let song;

let amplitude = new p5.Amplitude();
let fft = new p5.FFT();

let audCont = false;

// basicSetup()
let fps = 60;
let canvasSize = 500;

// draw()
let frameCounter = 0;

// drawLines()
let radius = 0;
let angle = 0;
let x1;
let x2;

function touchStarted() {
  if (getAudioContext().state !== 'running') {
      getAudioContext().resume();

      audCont = true;
      console.log('audio context resume');
  }
}

function preload() {
  song = loadSound("1.wav");
}

function setup() {
  
  cnv = createCanvas(canvasSize, canvasSize);
  frameRate(fps);

  x1 = radius*cos(angle) + width/2;
  y1 = radius*sin(angle) + height/2;
  
  backgroundColor = color(75, 150, 200);
  background(backgroundColor);

  song.loop();
}

function draw() {
  frameRate(fps);

  audioLevel = amplitude.getLevel();
  radius = audioLevel * 80 + frameCounter / 15;
  if(song.isPlaying()) {
    drawLines();

  }
  
}

function mouseClicked() {
  if (song.isPlaying()){
    song.pause();
  }
  else {
    song.play();
  }
}

function drawLines() {

  frameCounter++;
  angle = frameCounter*3.141592/180;

  x2 = radius*cos(angle) + width/2;
  y2 = radius*sin(angle) + height/2;
  
  c = color(255);
  stroke(c);
  line(x1, y1, x2, y2);
  
  x1 = x2;
  y1 = y2;
}
