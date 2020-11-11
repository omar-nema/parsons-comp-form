
var drops = [];
var numDrops = 100;


function setup() {
    createCanvas(500, 500)   
    background(30);

    for (i=0; i<numDrops; i++){
      d = new Drop();
      d.init();
      drops.push(d);
    }
    
}



function draw() {

  
  {
    push ()
    fill(0, 50);
    rect(0,0, width, height)
    pop ()
  }
  

  for (var i=0; i<drops.length;i++){

    drop = drops[i];
    drop.show();
    
  }

 
}


function Drop(){

  this.init = function(){
    this.x = random(width),
    this.y =random(-width/3, 0),
    this.z = random(0, height),
    this.vel = random(2, 4);
    this.col = color(255);
    this.endR = 0;
  }

  this.update = function(){
    this.vel += this.vel/150;
    this.y += this.vel;
  };

  this.show = function(){

    if (this.y > height-100){
      this.end();
    } else {
      push ()
      noStroke();
      var col = color('#aaf0eb');
      col.setAlpha(map(this.y, 0, height, 100, 255))
      this.col = col;
      fill(col);
      rect(this.x, this.y, 1.5, 9);
      this.update();
      pop ()
    }
  };

  this.end = function(){
    push ();
    stroke(this.col);
    noFill();
    if (this.endR < 10){
      circle(this.x, this.y, this.endR, this.endR);
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