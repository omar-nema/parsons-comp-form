
let numPoints = 100;
let noiseAmount = 7;
var shapes = [];
let treasureX, treasureY;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowBlur = 1;
  drawingContext.shadowColor = 'black';
  background('#0ecccc');

  generateBlobs();
  generateTreasure();
  cursor(CROSS)
}

function drawBlob(centerX, centerY, shapeFactor, noiseFactor, radius){
    var negFactor = 1;

    maxRadius = radius;
    radius = 0.8*radius;
    
    pts = [];
    for (let i = 0; i < numPoints; i++) {
      let angle = (360 / numPoints) * i;

      if (i % 10 == 0){
          negFactor = Math.round(Math.random()) * 2 - 1;
      }
   
      if (i % 5 == 0){
          if (negFactor == 1){
              radius -= radius*(random(0, .2));
              radius = min(maxRadius, radius);
              //radius = radius + random(radius/20)
          } else {
            radius += radius*(random(0, .2));
            radius = min(maxRadius, radius);
              //radius = radius + random(radius/20)
          }
      
      }
  
      let x = cos(angle) * radius*shapeFactor + centerX;
      let y = sin(angle) * radius + centerY;

      //rotate(PI / random(20, 100))
  
      let xnoise = (noise(noiseFactor * 0.02 + i) - 0.5) * noiseAmount;
      let ynoise = (noise(noiseFactor * 0.02 + i) - 0.5) * noiseAmount;
      noiseFactor += 0.1;
      newPt = [x+xnoise, y+ynoise];
      pts.push(newPt)

        // greenpts = [];
        //   greenPt = [newPt[0]*0.9, newPt[1]*0.9];
        //   greenpts.push(greenPt);
        //curveVertex(x + xnoise, y + ynoise);
    }
    push();
    beginShape();
    strokeWeight(2);
    noStroke()
    fill('#ffc369');
    pts.forEach(function(d){
        curveVertex(d[0], d[1])
    })
    endShape(CLOSE);
    rotate(random(-140, 140))
    pop();
  
}


function generateBlobs(){
    let numIslands = 100;

    //one initial big blob
    let noiseFactor = 1;
    rad = 220;
    centerX = width * random(0.1, 0.9);
    centerY = height * random(0.1, 0.9);
    let blob = {
        centerX: centerX,
        centerY: centerY,
        shapeFactor: random(0.5, 1),
        noiseFactor: random(0.5, 1),
        rad: rad
    }
    shapes.push(blob)
    drawBlob(blob.centerX, blob.centerY, blob.shapeFactor, blob.noiseFactor, blob.rad)
    noiseFactor += 100;

    for (i=0; i< numIslands; i++){
        shapeFactor = random(0.2, 1);
        centerX = width * random(0.1, .9);
        centerY = height * random(0.1, .9);
        rad = random(10, 100)

        var overlapping = false;
        shapes.forEach(function(d){
            dis = dist(d.centerX, d.centerY, centerX, centerY);
            if ((d.rad + rad) > dis){
                overlapping = true;
            }
        })
        if (!overlapping){
            blob = {
                centerX: centerX,
                centerY: centerY,
                shapeFactor: random(0.5, 1.5),
                noiseFactor: random(0.5, 1),
                rad: rad
            }
            shapes.push(blob)
            drawBlob(blob.centerX, blob.centerY, blob.shapeFactor, blob.noiseFactor, blob.rad)
            noiseFactor += 1000;
        }     
    }
}

function generateTreasure(){
    treasureIsland = shapes[0];
    treasureRad = treasureIsland.rad*0.3;
    treasureX = treasureIsland.centerX+random(-treasureRad, treasureRad);
    treasureY = treasureIsland.centerY+random(-treasureRad, treasureRad);
}


function draw() {
    
    //add treaure

    push();
    fill('red')
    drawingContext.shadowOffsetX = 0.2;
    drawingContext.shadowOffsetY = 0.2;
    drawingContext.shadowBlur = 1;
    drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
   // console.log(dist(mouseX, mouseY, treasureX, treasureY))
    if (dist(mouseX, mouseY, treasureX, treasureY) < 50){
        strokeWeight(0.5)
        circle(treasureX, treasureY,10)
    }
    pop();

}