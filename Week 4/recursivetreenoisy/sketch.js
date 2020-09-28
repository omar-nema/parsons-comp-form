

//noiseness in limb length, stroke weight, color, etc etc



function setup() {
    createCanvas(700, 700, WEBGL)   
    background(240);
    angleMode(DEGREES)
}


var maxHt = 80;

var xoff = 0;
var strokeCap = 5;
var recurse = 0.85;
var minHt = 0.5;
var numRecursions = Math.log(minHt/maxHt)/Math.log(recurse)
var maxStroke = 7;
var strokeGradation = 7/(numRecursions) * 2;

var angle = 17; 


var numBranches = 15;

function draw() {
  
    noLoop();
    background(240);
    
  
    // translate(width/2, height/1.5)
    // translate(-width/2, -height/2)
    // rotateX(PI /3)

    // push ()
    
    // translate(-width/2, -height/2)
    // rotateX(PI /3)
    // 
    // pop ();


    push ()
    rotateX(50)
    noStroke();
    fill ('#34eb71')
    translate(-width/2, -height/2)
    rect(0,0, width, height)
    pop ();

    push ()
    translate(0, 50, 90);
    rotateX(-10)
   

    stroke('#964b00')
    strokeWeight(maxStroke);
    line(0,0, 0, -maxHt)
    translate(0, -maxHt)



    angleInc = 360/numBranches;
    currAngle = 0;
    for (i=0; i<numBranches; i++){
        push ()
        rotateY(currAngle)
        branch(maxHt, random(angle*0.95, angle*1.05), maxStroke) 
        pop ()
        console.log(currAngle)
        currAngle += angleInc;
    }
    
  
}




function branch(ht, angle, strokeVal){
    ht *= recurse;
    
    if (ht > minHt){

        push ()
        //needs to be thicker on the bottom
        // strokeWeight(map(noise(xoff), 0, 1, 0.1, maxStroke))
        strokeWeight(strokeVal);
        rotate (angle)
        line(0,0, 0, -ht)
        translate(0, -ht)
        xoff += 0.1;
        strokeVal -= strokeGradation;
        branch(ht, angle, strokeVal)
        pop ()
       
    }
 
}

