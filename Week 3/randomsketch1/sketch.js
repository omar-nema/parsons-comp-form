

function preload() {

}

let rows = 10;
let cols = rows;

let unitHeight;
let unitWidth;
let shapeModes;

function setup() {
    createCanvas(700, 600)   
    background(255)
    unitHeight = height/rows;
    unitWidth = width/cols;

    shapeModes = [TRIANGLE_STRIP,  QUAD_STRIP, LINES, TRIANGLES]

    drawingContext.shadowOffsetX = 1;
    drawingContext.shadowOffsetY = -1;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = 'rgba(90,90,90, 0.4)';
}


colr = [1,4, 3, 9]
function getColor(){
    colorMode(HSB, 100);
    colBase = parseInt(random(45, 60));
    console.log(colBase)
    return color(colBase, 100, 90);
}


function draw() {
    noLoop();
    randomSeed(5)
    overlapfactor = 3;
    
    for (x=0; x < cols; x++){
        minX = unitWidth*x - unitWidth/overlapfactor;
        maxX = minX + unitWidth + unitWidth/overlapfactor;

        for (y=0; y< rows; y++){
            minY = unitHeight*y - unitHeight/overlapfactor;
            maxY = minY + unitHeight + unitHeight/overlapfactor;
        
            push()
            strokeWeight(4)
            fill(getColor());
            createShape(minX, minY, maxX, maxY, random(3, 7), .97)
           
            pop();


            push();
            fill(getColor())
            strokeWeight(2)
            polygon(random(minX, maxX), random(minY, maxY), random(3, 10), random(3,12))
            polygon(random(minX, maxX), random(minY, maxY), random(3, 9), random(1,5))
            pop();
            //createShape(minX, minY, maxX, maxY, random(3, 7), .97)

            //rand effects
            // push()
            // shearX(PI / random(3, 5))
            // shearY(PI / random(3, 5))
            // pop()       
            
            // polygon(random(currX, maxX), random(currY, maxY), random(2, 15), random(3,8))
            // polygon(random(currX, maxX), random(currY, maxY), random(1, 3), random(3,8))
            // polygon(random(currX, maxX), random(currY, maxY), random(1, 3), random(3,8))
            // polygon(random(currX, maxX), random(currY, maxY), random(1, 3), random(3,8))
            //polygon(random(currX, maxX), random(currY, maxY), random(5, 90), random(3,8))
        }
    }

}



function createShape(minX, minY, maxX, maxY, numpts){    

    beginShape(random(shapeModes));
    //beginShape(QUADS)
    for (i=0; i< numpts; i++){
        vertex(random(minX, maxX), random(minY, maxY))
    }
    endShape(CLOSE)
}

function createCurvedShape(minX, minY, maxX, maxY, numpts){    
    beginShape();
    curveTightness(random(1,5));
    for (i=0; i< numpts; i++){
        curveVertex(random(minX, maxX), random(minY, maxY))
    }
    endShape(CLOSE)
}

//regular polygon code from: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
