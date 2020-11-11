var blob1 = [];
var numBlobs = 4;

var blobs2 = []
var blobs3 = []

function setup() {
    createCanvas(400, 400)   
    colorMode(HSB);

    for (var i=0; i<numBlobs; i++){
      blob1.push(new Blob());
    }

    for (var i=0; i<numBlobs; i++){
      blobs2.push(new Blob());
    }

 

}


function createBlobImage(blobs){
  let imgW = 200;
  let imgH = 200;
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
 
        var hue = map(dsum, 0, 300, 150, 360)
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
  //createBlobImage(blobs2);

 
}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}



class Blob {

  constructor() {
    this.x = random(width*.2, width*.8);
    this.y = random(height*.2, height*.8);
    this.r = random(50, 100);
    

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