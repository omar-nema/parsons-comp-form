

//noiseness in limb length, stroke weight, color, etc etc



function setup() {
    createCanvas(700, 700)   
    background(240);
    angleMode(DEGREES)
}


var maxHt = 130;
var xoff = 0;
var strokeCap = 5;
var recurse = 0.73;
var minHt = 2;
var numRecursions = Math.log(minHt/maxHt)/Math.log(recurse)
var maxStroke = 1   ;
var strokeGradation = 7/(numRecursions) * 2;
var angle = 15; 

var bigAngle = 25;

var numBranches = 1;

function generateCurveVertices(numVertices, range, htVal){
    inc = htVal/numVertices; 
    currVal = 0;
    vertices = [];
    for (i=0; i<numVertices+1; i++){
        // console.log(currVal);
        vertices.push({
            x: random(-range,range),
            y: currVal
        })
        currVal += inc;
    }
    return vertices;
}

function draw() {
  
    noLoop();
    background(240);
    
    strokeWeight(2);
    translate(width/2, height/2)


    translate(0,  maxHt)

    beginShape();
    curveVertex(0,0);
    curveVertex(random(-5, 5),maxHt/2)
    curveVertex(0,maxHt)
    endShape(CLOSE);
    
   
    angleInc = 360/numBranches;
    currAngle = 0;
    for (i=0; i<numBranches; i++){
        push ()
        branch(maxHt, angle, maxStroke) 
        pop ()
        currAngle += angleInc;
    }
  
}

var branchPts = [];
var noiseoff = 0;

function branch(ht, angle, strokeVal){
    ht *= recurse;
    noiseoff += 0.5;
    strokeWeight(2)
    if (ht > minHt){

        angle = map(noise(noiseoff), 0, 1, bigAngle*0.5, bigAngle*2)
        ht = map(noise(noiseoff), 0, 1, ht*0.95, ht*1.05)
        
        push ()
        rotate (angle)
        beginShape()
        vertices = generateCurveVertices(4, 4, -ht);
        vertices.forEach(function(d, i){
            curveVertex(d.x, d.y)
        })
        endShape(CLOSE)
        
        // beginShape()
        // curveVertex(0,0)
        // curveVertex(random(-2,2), -ht*.33)
        // curveVertex(random(-2,2), -ht*.5)
        // curveVertex(random(-2,2), -ht*.66)
        // curveVertex(0, -ht)
        // endShape(CLOSE)
        // line(0,0, 0, -ht)


        translate(0, -ht)
        strokeVal -= strokeGradation;
        branch(ht, angle, strokeVal)
        pop ()

        push ()
        rotate (-angle)
        // line(0,0, 0, -ht)
        beginShape()
        curveVertex(0,0)
        curveVertex(random(-2,2), -ht*.33)
        curveVertex(random(-2,-2), -ht*.66)
        curveVertex(0, -ht)
        endShape(CLOSE)
        translate(0, -ht)
        strokeVal -= strokeGradation;
        branch(ht, angle, strokeVal)
        pop ()
       
    } 
}

