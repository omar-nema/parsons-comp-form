
var drops = [];
var numDrops = 3000;


function setup() {
    createCanvas(600, 600, WEBGL);
    angleMode(DEGREES);
    background(0);
    for (i=0; i<numDrops; i++){
      d = new Drop();
      d.init();
      drops.push(d);
    }
    
}



function draw() {

  background(10);
  orbitControl();


  {
    push ();
    rotateX(-90);
    translate(0,0, height/2);
    fill(20)
    plane(width, height, 3, 3);
    pop();
  }
 

  translate(-width/2, -height/2)
  for (var i=0; i<drops.length;i++){
    drop = drops[i];
    drop.show();
    
  }
  // if (frameCount > 100 && frameCount < 300){
  //   saveFrame("EXPORT", frameCount, "jpg", 300);
  // }


 
 
}


function Drop(){

  this.init = function(){
    this.x = random(width),
    this.y =random(-width, 0),
    this.z = random(-.9*height/2, .9*height/2),
    this.len = random(2, 4);
    this.vel = random(3, 6);
    this.col = color(255);
    this.endR = 0;
  }

  this.update = function(){
    this.vel += this.vel/100;
    this.y += this.vel;
  };

  this.show = function(){

    if (this.y > height - 5){
      this.end();
    } else {
      push ()
      noStroke();
      var col = color('#bdeffc');
      col.setAlpha(map(this.y, 0, height, 30, 250));
      this.col = col;
      fill(col);
      translate(0,0, this.z)
      rect(this.x, this.y, .2, this.len);
      this.update();
      pop ()
    }
  };

  this.end = function(){
    push ();
    noStroke();
    col = this.col;
    col.setAlpha(30);
    fill(col)
    if (this.endR < 10){
      translate(this.x,this.y, this.z)
      rotateX(-90);
      circle(0, 0, this.endR, this.endR);
      this.endR += 1;
    } else {
      this.init();
    }
    pop ();
  }

 


}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}


// saveFrame - a utility function to save the current frame out with a nicely formatted name
// format: name_####.extension
// name: prefix for file name
// frameNumber: number for the frame, will be zero padded
// extension: jpg or png, controls file name and image format
// maxFrame: checked against frameNumber, frames beyond maxFrame are not saved
function saveFrame(name, frameNumber, extension, maxFrame) {
  // don't save frames once we reach the max
  if (maxFrame && frameNumber > maxFrame) {
    return;
  }

  if (!extension) {
    extension = "png";
  }
  // remove the decimal part (just in case)
  frameNumber = floor(frameNumber);
  // zero-pad the number (e.g. 13 -> 0013);
  var paddedNumber = ("0000" + frameNumber).substr(-4, 4);

  save(name + "_" + paddedNumber + "." + extension);
}