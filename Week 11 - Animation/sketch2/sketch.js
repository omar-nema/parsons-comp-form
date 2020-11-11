var blobs = [];
var numBlobs = 4;

function setup() {
    createCanvas(400, 400)   
    b = new Blob(width/2, height/2);
    colorMode(HSB);

    for (var i=0; i<numBlobs; i++){
      blobs.push(new Blob());
    }
}


function createBlobImage(){

};


function draw() {

  background(230);

  let imgW = 400;
  let imgH = 400;
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
        var c = color(hue, 80, 80)
 
        img.set(x, y, c); 
      }
  }

  img.updatePixels();
  noSmooth(); 
  image (img, 0,0, imgW*imgScale, imgH*imgScale);

  for (var i=0; i<blobs.length; i++){

    blobs[i].show();
  }


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
    this.r = random(30, 80);
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