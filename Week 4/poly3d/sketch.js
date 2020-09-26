let rows = 10;
let cols = rows;
let unitHeight;
let unitWidth;
let shapeModes;


var shapeArray = [];

function setup() {
    createCanvas(700, 700, WEBGL)   
    background(255)
    unitHeight = height/rows;
    unitWidth = width/cols;

    initShapes();
}

function getColor(){
    return random(255);
}

function initShapes(){
    
    for (x=0; x < cols; x++){
        minX = unitWidth*x ;
        maxX = minX + unitWidth;
        for (y=0; y< rows; y++){
            minY = unitHeight*y ;
            maxY = minY + unitHeight ;
            numpts = random(3, 10);
            currShape =[];
            for (i=0; i< numpts; i++){
                shapeObj = {x: random(minX, maxX), y: random(minY, maxY), z: 0}
                currShape.push(shapeObj)
            }
            shapeArray.push(currShape);
        }
    }
}

var noiseoff = 0;
var noiseoff = 0;
var noiseRange = 30;
var noiseInc = 0.01;


var yTrans = 0;

function draw() {
    randomSeed(5)
    background('#87CEEB')

    

    // noLoop();

    rotateX(PI / 3)
    translate(-width/2, -height/2)
    noiseoff += noiseInc;

    push ()
    
    fill('green');
    noStroke();
    rect(0,0, width, height)

    pop ()


    shapeArray.forEach(function(shape){
        beginShape();
        push ();
        shearX(PI / 90)
        fill(getColor());
        shape.forEach(function(d, i){
            // d.x += -2;
         
            vertex(d.x, d.y, map(noise(noiseoff*i), 0, 1, noiseRange/2, noiseRange*2));
            //vertex(d.x, d.y, map(noise(xoff, yoff), 0, 1, noiseRange/2, noiseRange*2));
            

            //noiseoff += 0.01;
        })
        pop ();
        endShape(CLOSE);
        
        
    })


}

function createShape(minX, minY, maxX, maxY, numpts){    
    beginShape();
    for (i=0; i< numpts; i++){
        vertex(random(minX, maxX), random(minY, maxY), map(noise(i), 0, 1, -noiseRange, noiseRange))
    }
    endShape(CLOSE)
}

//regular polygon code from: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, z, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy, z);
    }
    endShape(CLOSE);
  }