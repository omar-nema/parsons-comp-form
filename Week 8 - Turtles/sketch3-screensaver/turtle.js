// Turtle
// Basic turtle graphics implementation:
// https://en.wikipedia.org/wiki/Turtle_graphics
// For more info on Javascript OOP:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
//
// The turtle's coordinate system uses pixels for distance and degrees for rotations
// 0 degrees is straight right (east); positive degrees are clockwise

// Turtle constructor
// takes optional x, y starting coordinates (default is center of sketch)
function Turtle(x, y, z) {
    // assign default values to x and y if they were not passed
    if (typeof x === "undefined") {
      x = width * 0.5;
    }
    if (typeof y === "undefined") {
      y = height * 0.5;
    }
    this.x = x;
    this.y = y;
    this.z = z;
    this.bearingRadians = 0;
    this.isPenDown = true;
    this._stateStack = [];
  }
  
  // moveTo instantly transports the turtle to the provided x, y location, drawing a line if pen is down
  Turtle.prototype.moveTo = function (newX, newY, newZ) {
    if (this.isPenDown) {
      line(this.x, this.y, this.z, newX, newY, newZ);
    }
    this.x = newX;
    this.y = newY;
    this.z = newZ;
  };
  
  // moveForward moves the turtle along its current bearing, drawing a line if pen is down
  Turtle.prototype.moveForward = function (distance) {
    var newX = this.x + cos(this.bearingRadians) * distance;
    var newY = this.y + sin(this.bearingRadians) * distance;
    if (abs(newX) >  width*.8){
      newX = this.x;
    } 
    if (abs(newY) > width*.8){
      newY = this.z;
    }         
 
    this.moveTo(newX, newY, this.z);
  };

  Turtle.prototype.moveUp = function (distance) {

    var newZ = this.z + distance;
    if (abs(newZ) > 200){
      newZ = this.z;
    } 
    
    this.moveTo(this.x, this.y, newZ);
  }

  // moveBackward moves the turtle backward from its current bearing, drawing a line if pen is down
  Turtle.prototype.moveBackward = function (distance) {
    this.moveForward(-distance);
  };
  
  // turnTo changes the turtle's bearing to the provided angle in degrees
  Turtle.prototype.turnTo = function (angleDegrees) {
    this.bearingRadians = radians(angleDegrees);
  };

  
  // turnRight rotates the turtle's bearing clockwise by the provided angle in degrees
  Turtle.prototype.turnRight = function (amountDegrees) {
    this.bearingRadians += radians(amountDegrees);
  };
  
  // turnLeft rotates the turtle's bearing counter-clockwise by the provided angle in degrees
  Turtle.prototype.turnLeft = function (amountDegrees) {
    this.bearingRadians -= radians(amountDegrees);
  };
  
  // penUp tells the turtle to move without drawing
  Turtle.prototype.penUp = function () {
    this.isPenDown = false;
  };
  
  // penDown tells the turtle to draw a line when it moves
  Turtle.prototype.penDown = function () {
    this.isPenDown = true;
  };
  
  // pushState records the turtle's current state (position, bearing, etc.) to a stack so that changes can be undone easily
  Turtle.prototype.pushState = function () {
    this._stateStack.push({
      x: this.x,
      y: this.y,
      z: this.z,
      bearingRadians: this.bearingRadians,
      isPenDown: this.isPenDown
    });
  };
  
  // popState restores the turtle's state to the top recorded state on the stack
  Turtle.prototype.popState = function () {
    if (this._stateStack.length === 0) {
      console.error(
        "Turtle: No states left on stack. Make sure your calls to .pushState and .popState are balanced."
      );
      return;
    }
    var state = this._stateStack.pop();
    this.x = state.x;
    this.y = state.y;
    this.z = state.z;
    this.bearingRadians = state.bearingRadians;
    this.isPenDown = state.isPenDown;
  };
  
  // image draws and image centered on the turtle's current location and alligned with the turtle's rotation (forward = up)
  Turtle.prototype.image = function (i, w, h) {
    // w, h are optional parameters to this function and to p5's image
    // p5's image function will draw the image at its "normal" size if w and h are undefined
  
    push();
    translate(this.x, this.y);
    rotate(this.bearingRadians + PI * 0.5);
    imageMode(CENTER);
    image(i, 0, 0, w, h);
    pop();
  };