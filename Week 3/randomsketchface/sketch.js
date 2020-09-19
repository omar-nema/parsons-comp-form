

function preload() {

}

var eyeWidth, eyeHeight;

function setup() {
    createCanvas(500, 500)   
    background(240)
    eyeWidth = width / 8;
    eyeHeight = height /3;


}

function drawShape(x, y, w, h, numPoints, col, str){
    numPoints = Math.floor(numPoints/4 )
    push()
    noFill();
    strokeWeight(1)
    if (col){
        fill(col)
    } 
    if (str){
        strokeWeight(str)
    } else {
        noStroke()
    }
    translate(x, y);
    bounds = [];
    bounds.push([-w/2, 0]);
    bounds.push([0, -h/2]);
    bounds.push([w/2, 0]);
    bounds.push([0, h/2]);            

    x1 = bounds[0][0];
    x2 = bounds[1][0];


    y1 = bounds[0][1];
    y2 = bounds[1][1];

    beginShape();
    curveTightness(1)
    bounds.forEach(function(d, i){
        var lowerBound = i;
        var upperBound;
        if (i == bounds.length-1){
            upperBound = 0;
        } else {
            upperBound = lowerBound + 1;
        }
        x1 = bounds[lowerBound][0];
        x2 = bounds[upperBound][0];

        y1 = bounds[lowerBound][1];
        y2 = bounds[upperBound][1];

        for (z=0; z< numPoints; z++){
            currX = random(x1, x2);
            currY = random(y1, y2);
            x1 = currX;
            y1 = currY;
            curveVertex(x1, y1)
        }
    
    

    })
    endShape(CLOSE);

    pop()
}


function draw() {

    noLoop();

    centerEye1x = width/3; 
    centerEye2x = 2*width/3;

    centerNoseX = width/2;
    centerNoseY = height/2;

    centerMouthX = width/2;
    centerMouthY = height*3/4;

    drawShape(width/2, height/2, width*1.5, height*1.2, 20, random(200, 230))
    drawShape(width*2/3, height/4, width*1.5, height*1.2, 20, random(150, 230))
    drawShape(width, 0, width*2, height*3, 20, random(160, 200))
    // push()
    
    // triangle(50, height*1/10, width/2, height/4, width*9/10, height/10);
    // rotate(-PI /2)
    // pop();

    shearX(PI / random(50, 100))
    shearY(PI / random(50, 100))

    push()
    rotate(PI / random(70, 100))
    drawShape(centerEye1x, eyeHeight, random(40, 140), random(50,130), 100, random(50, 100))
    drawShape(centerEye1x, eyeHeight, random(40, 100), random(50,130), 100, random(70, 100))
    drawShape(centerEye1x, eyeHeight, random(40, 50), random(30,130), 100, random(50, 70))
    pop();


    push()
    rotate(PI / random(70, 100))
    drawShape(centerEye2x, eyeHeight, random(40, 140), random(50,130), 100, random(0, 50))
    drawShape(centerEye2x, eyeHeight, random(40, 100), random(50,130), 100, random(50, 100))
    drawShape(centerEye2x, eyeHeight, random(40, 50), random(30,130), 100, random(50, 200))
    pop();

    drawShape(centerNoseX, centerNoseY, random(40, 80), random(15, 40), 50, random(50, 200))

    push();
    rotate(PI / random(30, 50))
    drawShape(centerMouthX, centerMouthY, random(200, 300), random(50, 100), 80, color(random(0, 100)))
    drawShape(centerMouthX, centerMouthY, random(200, 300), random(50, 100), 80, color(random(100,  205), 0, 0))
    // drawShape(centerMouthX, centerMouthY, random(100, 200), random(50, 100), 80, color(random(230,  255), 0, 0))
 
    pop();

}
