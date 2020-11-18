var blob1 = [];
var numBlobs = 4;

var blobs2 = []
var blobs3 = []

var minR ;
var maxR ;

function setup() {
    createCanvas(400, 400)   
    colorMode(HSB);

    
     minR = width/10;
     maxR = width/4;

   

    for (var i=0; i<numBlobs; i++){
      blob1.push(new Blob());
    }

    for (var i=0; i<numBlobs; i++){
      blobs2.push(new Blob());
    }

 

}


function createBlobImage(blobs){
  let imgW = 300;
  let imgH = 300;
  let img = createImage(imgW, imgH);
  let imgScale = min(width/imgW, height/imgH);

  for (var i=0; i<blobs.length; i++){
    blobs[i].update();
    blobs[i].show();
  }
  
  for (y=0; y<imgH; y++){
    for (x=0;x<imgW; x++){
        //brightness determined by total distance away from blobs
        let dsum = 0;
        for (var i=0; i<blobs.length; i++){
          let xd = blobs[i].x - x*imgScale;
          let yd = blobs[i].y - y*imgScale;
          let d = sqrt(xd*xd + yd*yd);
    
          dsum += 80*blobs[i].r/d;
        } 
 
        var hue = map(dsum, 0, 300, 210, 330)
        var c = color(hue, 80, 80, 1)
 
        img.set(x, y, c); 
      }
  }

  img.updatePixels();
  noSmooth(); 

  image (img, 0,0, imgW*imgScale, imgH*imgScale);
};



function draw() {

  background(230);
  
  createBlobImage(blob1);
  console.log(frameRate())

//  if (frameCount > 50){
//   saveFrame("t", frameCount, "jpg", 300);
//  }

 
  
//  console.log(frameRate())
//   if (frameCount > 300) {
//       noLoop();
//   }
 
}

// function mousePressed(){
//   console.log('hi')
//   saveFrames('out', 'png', 1, 300, data => {
//     print(data);
//   });
// }

function keyPressed() {
    if (key == "a") {
      saveCanvas(frameCount + ".png");
    }
}



// // saveFrame - a utility function to save the current frame out with a nicely formatted name
// // format: name_####.extension
// // name: prefix for file name
// // frameNumber: number for the frame, will be zero padded
// // extension: jpg or png, controls file name and image format
// // maxFrame: checked against frameNumber, frames beyond maxFrame are not saved
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

class Blob {

  constructor() {
    this.x = random(width*.2, width*.8);
    this.y = random(height*.2, height*.8);
    this.r = random(minR, maxR);
    

    // this.vel = createVector(5, 5);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1,4))
  }

  update(){
    this.x += this.vel.x;
    this.y += this.vel.y;

    if (this.x > width || this.x < 0){
      this.vel.x *= -1;
    }
    if (this.y > height || this.y < 0){
      this.vel.y *= -1;
    }    
  }

  show(){
  
    noFill();
    noStroke();

    circle(this.x, this.y, this.r, this.r)
  }
}