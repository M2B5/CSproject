//code by matthew bowers mbowers2205@gmail.com.

let button;
let wave;
let pen;
let sim = 0;

let velocity;

function buttonFunc() {
  sim = abs(sim - 1);
}

function setup() {
  createCanvas(1050, 400);

  let col = color(25, 23, 200, 50);

  button = createButton("Change Sim");
  button.position(300, 400);
  button.style("background-color", col);
  button.size(150, 20);
  button.mouseClicked(buttonFunc);

  button = createButton("Change Wave");
  button.position(0, 400);
  button.style("background-color", col);
  button.size(150, 20);
  button.mouseClicked(changeWave);

  button = createButton("Lock length");
  button.position(150, 400);
  button.style("background-color", col);
  button.size(150, 20);
  button.mouseClicked(penLength);

  button = createButton("Pause Pendulum");
  button.position(150, 420);
  button.style("background-color", col);
  button.size(150, 20);
  button.mouseClicked(penPause);

  button = createButton("Sine/Cosine wave");
  button.position(0, 420);
  button.style("background-color", col);
  button.size(150, 20);
  button.mouseClicked(waveSin);

  button = createButton("Tan wave");
  button.position(0, 440);
  button.style("background-color", col);
  button.size(150, 20);
  button.mouseClicked(waveTan);

  button = createButton("Sec/Cosec wave");
  button.position(0, 460);
  button.style("background-color", col);
  button.size(150, 20);
  button.mouseClicked(waveSec);

  wave = new Wave();
  pen = new pendulum();
}

function draw() {
  if (sim == 0) {
    wave.calculateWave();
    wave.renderWave();
  }
  if (sim == 1) {
    pen.calculatePen();
    pen.renderPen();
  }
}

function changeWave() {
  if (wave.waveStyle == 2) {
    wave.waveStyle = 0;
  } else {
    wave.waveStyle += 1;
  }
}

function mousePressed() {
  //when the mouse is held down

  if (sim == 1) {
    //if its on the pendulum sim

    pen.clickedTest(); //test if pendulum was clicked on and if so set dragging to true
  }
}

function mouseReleased() {
  //if mouse was released

  pen.unclick(); //set pendulum to not being dragged
}

function penLength() {
  //function to lock length when lockLength button pressed

  pen.lockLength(); //function to lock length in Pendulum.js
}

function penPause() {
  if (pen.paused == true) {
    //if pen already paused

    pen.paused = false; //unpause pen
  } else {
    //if pen not paused
    //pause pen
    pen.paused = true;
    pen.alpha = 0;
    pen.omega = 0;
  }
}

function waveSin() {
  wave.waveStyle = 0;
}

function waveTan() {
  wave.waveStyle = 1;
}

function waveSec() {
  wave.waveStyle = 2;
}
