//code by matthew bowers mbowers2205@gmail.com, built from code by daniel schiffman https://shiffman.net/

class pendulum {
  constructor() {
    this.theta; //angle between normal position and the shaft.
    this.omega = 0; //angular velocity.
    this.alpha = 0; //angular acceleration.
    this.g = 1; //weight.
    this.L = 300; //length of pendulum shaft.
    this.pivot = 0; //fulcrum of pendulum.
    this.head = 0; //position of head as a vector.
    this.dragging = false;
    this.lockLength2 = false; //lockelength2 so it doesnt interfere with the function locklength.

    this.paused = false; //determes if the pendulum simulation is paused.

    this.lSlider; //sliders to affect aspects of the pendulum simulation, current aspects affected: length of the slider (only when locklength is enabled) and gravity.
    this.gSlider;

    this.setupPen(); //runs the setupPen function (seperate because I want the constructor to declare variables and the setup funciton to create sliders and do any one time calculations).
  }

  setupPen() {
    this.theta = PI / 4; //sets starting angle of pendulum.

    this.pivot = createVector(350, 0); //sets the location of the pivot.
    this.head = createVector; //the vector location of the head of the pendulum.

    this.lSlider = createSlider(100, 400, 300); //code for length slider.
    this.lSlider.position(900, 0);

    this.gSlider = createSlider(5, 15, 10); //code for gravity slider.
    this.gSlider.position(900, 50);
  }

  calculatePen() {
    if (this.lockLength2 == true) {
      //if lockelength is true, sets the value of length to be the value determined by the length slider.

      this.L = this.lSlider.value();
    }

    if (this.dragging == false) {
      //validation for if the pendulum is being dragged with the mouse.

      this.dragFalseCalc(); //does appropriate caluclations for the pendulum sim whilst it is not being dragged.
    } else {
      if (this.lockLength2 == true) {
        //does validation for if the length is locked and then does the appropriate calculations (if the length is locked the user will be unable to change the length of the pendulum by dragging it farther from the pivot).

        this.dragTrueLocTrue(); //does calculations for the pendulum being dragged whilst the length is locked
      } else {
        this.dragTrueLocFalse(); //does calculations for the pendulum being dragged without the length being locked
      }
    }
  }

  renderPen() {
    background(0);
    stroke(255);
    strokeWeight(5);

    if (this.dragging == false) {
      //if pendulum isnt being dragged

      fill(0); //fill with black colour
    } else {
      //if pendulum is being dragged

      fill(100); //fill with grey colour
    }

    line(this.pivot.x, this.pivot.y, this.head.x, this.head.y); //draws the pendulum in its new position
    ellipse(this.head.x, this.head.y, 64, 64);

    noStroke(); //draws text to label the sliders that can affect the pendulum
    fill(255, 255, 255);
    text("Length", 900, 35); //length slider
    text("Gravity", 900, 85); //gravity slider
  }

  clickedTest() {
    this.mouseDiff =
      (abs((mouseX - this.head.x) ^ 2) + abs((mouseY - this.head.y) ^ 2)) ^
      (1 / 2); //finds the distance between the center of the pendulum and the mouse

    if (this.mouseDiff < 32) {
      //if the mouse is on the pendulum

      this.dragging = true; //pendulum is being dragged
    }
  }

  unclick() {
    //when user no longer holding down mouse

    this.dragging = false; //user is no longer dragging
  }

  lockLength() {
    if (this.lockLength2 == false) {
      //if length isnt locked

      this.lockLength2 = true; //lock length
    } else {
      //if length is locked

      this.lockLength2 = false; //unlock length
    }
  }

  mouseLocX() {
    //function to stop pendulum being dragged off of the canvas in the x direction

    if (mouseX > 710) {
      //if x coordinate of mouse would make the pendulum go off the canvas (on the right)

      this.head.x = 710; //set the x coordinate of the pendulum to be the maximum value in that direction that would place the pendulum on the canvas
    } else {
      if (mouseX < 0) {
        //if x coordinate of mouse would make pendulum go off the cavas (on the left)

        this.head.x = 0; //set x coordinate of pendulum to the minimum x coordinate in that direction that would place the pendulum on the canvas
      } else {
        //if x coordinate of mouse places pendulum on the canvas

        this.head.x = mouseX; //set x coordinate of pendulum to the x coordinate of the mouse
      }
    }
  }

  mouseLocY() {
    //does the same as mouseLocX but in the y direction

    if (mouseY > 400) {
      this.head.y = 400;
    } else {
      if (mouseY < 0) {
        this.head.y = 0;
      } else {
        this.head.y = mouseY;
      }
    }
  }

  dragFalseCalc() {
    //calculation is the pendulum is not being dragged

    this.f = this.g * sin(this.theta); //calculate the appropriate component of the force due to gravity

    if (this.paused == false) {
      //if the sim is not paused

      this.alpha = (this.f / this.L) * -1; //update acceleration to be the force per unit length of the pendulum shaft (*-1 to direct it towards the normal)
    }

    this.omega += this.alpha; //increment the velocity by the acceleration
    this.theta += this.omega; //increment the angle by the angular velocity
    this.head.x = this.L * sin(this.theta) + this.pivot.x; //determine the x coordinate of the pendulum by the length of the pendulum, the angle of the rod and the x coordinate of the pivot
    this.head.y = this.L * cos(this.theta) + this.pivot.y; //determine the y coordinate of the pendulum by the lenfth of the pendulum, the angle of the rod and the y coordinate of the pivot
  }

  dragTrueLocTrue() {
    //calculations for if the pendulum is being dragged and the length is locked.

    this.alpha = 0; //set angular acceleration to 0
    this.omega = 0; //set andular velocity to 0
    this.theta = atan((this.pivot.x - mouseX) / (this.pivot.y - mouseY)); //set the angle of the pendulum using trigonometry based on the line between the pivot and the pendulum

    this.head.x = this.L * sin(this.theta) + this.pivot.x; //set the coordinates of the pendulum head based on the length of the pendulum and the angle of the pendulum
    this.head.y = this.L * cos(this.theta) + this.pivot.y;
  }

  dragTrueLocFalse() {
    //calculations for dragging the pendulum when the length isnt locked

    this.alpha = 0; //set no motion
    this.omega = 0;
    this.theta = atan((this.pivot.x - mouseX) / (this.pivot.y - mouseY)); //set theta with trig based on the line between the pivot and the mouse

    this.mouseLocX(); //set the coordinates of the pendulum to the coordinates of the mouse unless its out of range then set the coordinates to the closest in range coordinates
    this.mouseLocY();

    this.L = (this.head.x - this.pivot.x) / sin(this.theta); //set the length based on x coordinates of the pendulum and the angle between the pendulum and the normal
  }
}
