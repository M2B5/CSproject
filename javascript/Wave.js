//code by matthew bowers mbowers2205@gmail.com, built from code by daniel schiffman https://shiffman.net/

class Wave {
  constructor() {
    this.waveStyle = 0; //determines the type of wave to render.
    this.xspacing = 16; //difference between x coordinates.
    this.theta = 0.0; //the phase position of the wave.
    this.amplitude = 70.0; //amplitude of wave
    this.wavelength = 500.0; //wavelength of wave
    this.dx; //amount to increment x by when populating the yValues array
    this.yvalues; //array containing the height of each ellipse along the wave
    this.rad = 16; //radius of the ellipses in the wave (I have now realised its the diameter but it doesnt make a difference to the code so I dont need to rename them)

    this.xSlider; //the following are sliders to change aspects about the wave, current aspects in order of appearance: xSpacing, wave speed, wave amplitude
    this.speedSlider;
    this.ampSlider;

    this.red = 10; //the following creates variables and slider for the colour of the ellipses
    this.green = 10;
    this.blue = 10;
    this.radSlider;
    this.redSlider;
    this.greenSlder;
    this.blueSlider;

    this.height = height; //sets this.height to be equal to the height of the canvas, I have made this into its own variable so that if I want a different wave height I dont have to change the whole code.

    this.setupWave(); //runs the setupWave function (I have these seprate because I want the constructor to declare variables and I want the setup function to setup sliders and do any one time calculations).
  }

  setupWave() {
    //this funciton will setup sliders and do one time validation.

    this.redSlider = createSlider(0, 10, 0); //next sliders are to determine the RGB colours of the wave.
    this.redSlider.position(750, 0);

    this.greenSlder = createSlider(0, 10, 0);
    this.greenSlder.position(750, 50);

    this.blueSlider = createSlider(0, 10, 0);
    this.blueSlider.position(750, 100);

    this.radSlider = createSlider(1, 31, 16); //slider to determine the radius of the ellipses in the wave.
    this.radSlider.position(750, 150);

    this.speedSlider = createSlider(-2, 6, 2); //slider to determine the speed at which the wave moves.
    this.speedSlider.position(750, 200);

    this.xSlider = createSlider(1, 21, 11); //determines the spacing of the waves ellipses down the x axis.
    this.xSlider.position(750, 250);

    this.ampSlider = createSlider(-50, 50, 0); //determins the amplitude of the wave.
    this.ampSlider.position(750, 300);

    this.dx = (this.xspacing / this.wavelength) * 2 * PI; //value of dx is 2pi multiplied by the ratio of xspacing and wavelength.
    this.yvalues = new Array(1000);
  }

  calculateWave() {
    background(0);

    this.theta += 0.02 + this.speedSlider.value() / 100; //increments theta by dx + the value of the speed slider, increasing theta moves the wave futher through its phase so doing it in greater increments speeds up the wave.

    this.x = this.theta; //sets a variable to theta so that it can be incremented without afecting theta.
    this.amplitude = 70 + this.ampSlider.value(); //amplitude = 70 + ampslider's value, amplitude slider can subtract up to 50 so must add a value greater than 60 to create a disinguishable wave.

    if (this.waveStyle == 0) {
      //validation to determine the type of wave to render.

      for (let i = 0; i < this.yvalues.length; i++) {
        //loops the whole yValues array.

        this.yvalues[i] = sin(this.x) * this.amplitude; //calculates the location in the waves phase that the ellipse is at and then multiplies it by amplitude, can just multiply as max value of sinx is 1.
        this.x += this.dx; //increments x by dx, theta determines the location in phase of the first ellipse, must increment wave by dx to get the location of the next ellipse in the phase of the wave.
      }
    }
    if (this.waveStyle == 1) {
      //same thing for tan wave.

      for (let x = 0; x < this.yvalues.length; x++) {
        this.yvalues[x] = (1 / tan(this.x)) * this.amplitude; //not sure why but using tanx gave me a cot wave so I used the reciprocal instead.
        this.x += this.dx;
      }
    }
    if (this.waveStyle == 2) {
      //same thing for sec wave.

      for (let i = 0; i < this.yvalues.length; i++) {
        this.yvalues[i] = (1 / sin(this.x)) * this.amplitude; //secx == 1/sinx.
        this.x += this.dx;
      }
    }
  }

  renderWave() {
    fill(255, 0, 0); //following code is to label the sliders.
    text("Red", 750, 35);

    fill(0, 255, 0);
    text("Green", 750, 85);

    fill(0, 0, 255);
    text("Blue", 750, 135);

    fill(255, 255, 255);
    text("Radius", 750, 185);

    text("speed", 750, 235);
    text("wavelength", 750, 285);
    text("amplitude", 750, 335);

    for (let i = 0; i < this.yvalues.length; i++) {
      //loops through all yValues and draws the appropriate ellipses.

      this.red = this.redSlider.value(); //sets required variables based on appropriate sliders.
      this.green = this.greenSlder.value();
      this.blue = this.blueSlider.value();
      this.rad = this.radSlider.value();
      this.xspacing = this.xSlider.value();

      if (this.red == 0 && this.green == 0 && this.blue == 0) {
        //validation: if red, green and blue are all 0 then sets the colour to be white *

        stroke(0);
        strokeWeight(1);
        fill(250, 250, 250);
        ellipse(
          i * this.xspacing,
          this.height / 2 + this.yvalues[i],
          this.rad,
          this.rad
        ); //x value its number along the x axis multiplied by the space between the ellipses along the x axis.
        //y value is the height/2 (the middle of the canvas) + the value from the array yValues.
      } else {
        //* otherwise set the colour to be an RGB value using the variables red, green and blue.

        stroke(0);
        strokeWeight(1);
        fill(this.red * 25, this.green * 25, this.blue * 25);
        ellipse(
          i * this.xspacing,
          this.height / 2 + this.yvalues[i],
          this.rad,
          this.rad
        );
      }
    }
  }
}
