
var cols = 2;
var rows = cols;
var unitWidth, unitHeight;

var terrain = [];

function setup() {
    createCanvas(700, 700, WEBGL)  
    noFill();
    //create 2d array
    for (var x=0; x<cols; x++){
        terrain[x] = [];
        for (var y=0; y < rows; y++){  
            terrain[x][y] = 0;
        }
    }

}

var noiseRange = 20;
var noiseInc = 0.2;
var yGlobal = 0;

function draw() {
  
    background(10); 
    stroke('white')
    strokeWeight(0.5);
    noLoop();

    yGlobal -= 0.05;
    var yoff = yGlobal;
    var xoff = 0;
    for (var y=0; y < rows; y++){  
        
        for (var x=0; x<cols; x++){
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, 0, noiseRange);
            xoff += noiseInc;
        }
        yoff += noiseInc;   
    }
   
    unitWidth = width / cols;
    unitHeight = height/rows;
    rotateX(PI /2.5);
    //rotateAmt += 0.01;
 
    translate(-width/2, -height/4, 0);

    // fill(
    //     map(terrain[x][y], 0, 1, 0, 50),
    //     map(terrain[x][y], 0, 1, 0, 200),
    //     map(terrain[x][y], 0, 1, 0, 255)
    //   );
    stroke(150)
    noStroke();
    fillNum = 50;
    for (var y=0; y<rows; y++){
        beginShape(TRIANGLE_STRIP)
        fill(0,0,255, fillNum)
        console.log(fillNum)
        fillNum+= 4;
        for (var x=0; x < cols; x++){  
            vertex(x*unitWidth, y*unitHeight, terrain[x][y]);
            vertex(x*unitWidth, (y+1)*unitHeight, terrain[x][y+1]);

        }
        endShape();
    }

}
