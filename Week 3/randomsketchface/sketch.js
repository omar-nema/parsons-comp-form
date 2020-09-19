

function preload() {

}

var eyeWidth, eyeHeight;

function setup() {
    createCanvas(500, 500)   
    background(240)
    eyeWidth = width / 8;
    eyeHeight = height /3;
}

function drawShape(x, y, w, h, numPoints, col){
    numPoints = Math.floor(numPoints/4 )
    push()
    strokeWeight(0.1);
    noFill();
    if (col){
        fill(col)
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


    drawShape(width/2, height/2, width*1.3, height*1.3, 20, 'darkgray')


    drawShape(centerEye1x, eyeHeight, random(40, 140), random(50,70), 20, 'black')
    drawShape(centerEye2x, eyeHeight, random(40, 150), random(50,70), 30, 'black')
    drawShape(centerNoseX, centerNoseY, 50, random(30, 90), 50, 'black')
    drawShape(centerMouthX, centerMouthY, random(200, 300), random(50, 100), 80, 'red')

   

}
