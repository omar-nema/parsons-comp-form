

function preload() {

}

let rows = 5;
let cols = rows;

let unitHeight;
let unitWidth;

function setup() {
    createCanvas(700, 700)   
    background(250)
    unitHeight = height/rows;
    unitWidth = width/cols;
}



function draw() {
    noLoop();
    randomSeed(10)

    for (x=0; x < cols; x++){
        minX = unitWidth*x
        maxX = minX + unitWidth;
        for (y=0; y< rows; y++){
            minY = unitHeight*y
            maxY = minY + unitHeight;

            strokeWeight(0.2);
            fill(random(255), random(255), random(255))
            fill(random(255))
            // blendMode(BURN)
            // blendMode(HARD_LIGHT)
            blendMode(BLEND)
            //point(random(currX, maxX), random(currY, maxY))

            createShape(minX, minY, maxX, maxY, random(3, 7), .97)

            //rand effects
            push()
            
            pop()



            //polygon(random(minX, maxX), random(minY, maxY), random(1, 3), random(3,8))
            
            
            // polygon(random(currX, maxX), random(currY, maxY), random(2, 15), random(3,8))
            // polygon(random(currX, maxX), random(currY, maxY), random(1, 3), random(3,8))
            // polygon(random(currX, maxX), random(currY, maxY), random(1, 3), random(3,8))
            // polygon(random(currX, maxX), random(currY, maxY), random(1, 3), random(3,8))
            //polygon(random(currX, maxX), random(currY, maxY), random(5, 90), random(3,8))
        }
    }

}

function createShape(minX, minY, maxX, maxY, numpts){    
    beginShape();
    for (i=0; i< numpts; i++){
        vertex(random(minX, maxX), random(minY, maxY))
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
