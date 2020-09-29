function setup() {
    createCanvas(700, 700)   
    background(240);
    angleMode(DEGREES)
}


var maxHt = 160;
var xoff = 0;
var strokeCap = 5;
var recurse = 0.66;
var minHt = 3;
var numRecursions = Math.log(minHt/maxHt)/Math.log(recurse)
var maxStroke = 1   ;
var strokeGradation = 7/(numRecursions) * 2;
var bigAngle = 25;
var numBranches = 4;

var noiseRange = 3;

var branchPts = [];
var noiseoff = 0;
var runNum;
var maxRotation = 10;

function generateCurveVertices(numVertices, range, htVal, index){
    inc = htVal/numVertices; 
    currVal = 0;
    vertices = [];
    for (i=0; i<numVertices+1; i++){

        vertices.push({
            x: map(noise((index+1)*(i+1)), 0, 1, -range, range),
            y: currVal
        })
        currVal += inc;
    }
    return vertices;
}

function draw() {
  
    noLoop();
    runNum = 0;
    noiseoff += 0.1;

    background(255)
    fill (0, 100)
    stroke(0, 100)

   

    strokeWeight(1);

    
    translate(width/2, height/2)

    translate(0,  maxHt)

    //initial line
    beginShape();
    vertices = generateCurveVertices(4, noiseRange, maxHt, runNum);
    vertices.forEach(function(d, i){
        curveVertex(d.x, d.y)
    })   
    endShape(CLOSE);
    runNum ++;
    
    //recursion
    angleInc = 360/numBranches;
    currAngle = 0;
    currTrans = 0;
    for (z=0; z<numBranches; z++){
        push ()
        // rotate(currAngle)
        translate(currTrans, 0)
        branch(maxHt, maxStroke) 
        pop ()
        currAngle += angleInc;
        currTrans += 2;
    }
  
}



function branch(ht, strokeVal){
    ht *= recurse;
    runNum ++;
    if (ht > minHt){

        fill (0, random(0, 150))
        stroke(0, random(50, 150))

        // angle = map(noise(noiseoff), 0, 1, bigAngle*0.5, bigAngle*2)
        // ht = map(noise(noiseoff), 0, 1, ht*0.7, ht*1.2)

        angle = bigAngle;
        push ()
        rotate (angle)
        
        beginShape()
        rotate(map(noise(noiseoff), 0, 1, 0, maxRotation))
        vertices = generateCurveVertices(4, noiseRange, -ht, runNum);
        vertices.forEach(function(d, i){
            curveVertex(d.x, d.y)
        })
        endShape(CLOSE)
        translate(0, -ht)
        strokeVal -= strokeGradation;
        branch(ht, strokeVal)
        pop ()

        push ()
        rotate (-angle)
        beginShape()
        rotate(map(noise(noiseoff+5000), 0, 1, 0, maxRotation))
        vertices = generateCurveVertices(4, noiseRange, -ht, runNum);
        vertices.forEach(function(d, i){
            curveVertex(d.x, d.y)
        })
        endShape(CLOSE)
        translate(0, -ht)
        strokeVal -= strokeGradation;
        branch(ht, strokeVal)
        pop ()
       
    } 
}

