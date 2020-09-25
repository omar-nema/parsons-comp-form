


//random landmarks


function setup() {
    createCanvas(500, 500)   
    background(240);

    createCanvas(windowWidth, windowHeight);
  
    centerX = width / 2;
    centerY = height / 2;
    
    angleMode(DEGREES);
    noStroke();

}

//noise




function draw() {
    background(255);
    noLoop();
  
    centerX = width/2;
    centerY = height/2;

    //used to ensure squiggle has some volume
    boundInnerX = 150;
    boundInnerY = 150;    
    boundOuterX = 300;
    boundOuterY = 300;    


    pts = [];
    firstPtX = random(boundInnerX, boundInnerY);
    firstPtY = random(boundInnerX, boundInnerY);

    noFill();
    stroke('black')
    rectMode(CENTER)
    translate(centerX, centerY)
    console.log(centerX, centerY)
    rect(0,0, boundInnerX, boundInnerY);
    rect(0,0, boundOuterX, boundOuterY);

    let numPoints = 100;
    let noiseoff = 0.1;

    for (i=0; i < numPoints/4; i++){

    }

    for (i=0; i<numPoints; i++){
        // if ( i== 0){
        //     newPtX = firstPtX + 10*noise(noiseoff);
        //     newPtY = firstPtY + 10*noise(noiseoff);
        // } else {
        //     newPtX = pts[i-1][0] + 10*noise(noiseoff);
        //     newPtY = pts[i-1][0] + 10*noise(noiseoff);
        // }

        //numPts by Quadrant

        //noise interpolation between points
        //noise is good for squiggles but not overall shape

        randneg1 = parseInt(random(0,1));
        randneg2 = parseInt(random(0,1));
        if (randneg1 == 0){
            newPtX = random()
        } else {
            
        }
        diffX = boundOuterX - boundInnerX;
        diffY = boundOuterY - boundInnerY;

        newPtX = random(-boundOuterX/2, boundOuterX/2);
        newPtY = random(boundOuterY/2 , boundInnerY/2);

        newPt = [newPtX, newPtY];
        pts.push(newPt)

        noiseoff += 0.01;
    }
    console.log(pts)

    ptSorted = pts.sort(function(a, b){
        return atan2(a[1], a[0]) - atan2(b[1], b[0])
    })
    


    noFill();
    stroke('black');
    strokeWeight(2);
    pts.forEach(function(d,i){
        strokeWeight(10)
        point(d[0], d[1])
    })
    console.log(ptSorted);

    beginShape();
    strokeWeight(0.5)
    
    ptSorted.forEach(function(d,i){
        vertex(d[0], d[1])
    })
    endShape();
  
    

    endShape(CLOSE);

 
}
