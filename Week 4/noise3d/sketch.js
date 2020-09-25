
var cols = 10;
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



var noiseRange = 100;
var noiseInc = 0.2;

var yGlobal = 0;

function draw() {
  
    background(240); 
    fill (140);
    strokeWeight(0.5);

    yGlobal -= 0.1;
    var yoff = yGlobal;
    
    
    for (var y=0; y < rows; y++){  
        var xoff = 0.2;
        for (var x=0; x<cols; x++){
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -noiseRange, noiseRange);
            xoff += noiseInc;
        }
        yoff += noiseInc;   
    }
   
    unitWidth = width / cols;
    unitHeight = height/rows;
    rotateX(PI / 3) //looks cool without this
    translate(-width/2, -height/2, 0);

    for (var y=0; y<rows; y++){
        beginShape(TRIANGLE_STRIP)
        for (var x=0; x < cols; x++){  
            vertex(x*unitWidth, y*unitHeight, terrain[x][y]);
            vertex(x*unitWidth, (y+1)*unitHeight, terrain[x][y+1]);
        }
        endShape();
    }


}
