let centerX;
let centerY;

let radius = 100;
let numPoints = 100;

let noiseAmount = 20;

function setup() {
  createCanvas(500, 500);
    
  angleMode(DEGREES);
  noStroke();
}

function drawBlob(centerX, centerY, shapeFactor){
    var negFactor = 1;
    

    pts = [];
    greenpts = [];
    for (let i = 0; i < numPoints; i++) {
      let angle = (360 / numPoints) * i;

      if (i % 10 == 0){
          negFactor = Math.round(Math.random()) * 2 - 1;
      }
   
      if (i % 5 == 0){
          if (negFactor == 1){
              radius = radius*random(0.8, 1);
              //radius = radius + random(radius/20)
          } else {
              radius = radius*random(1, 1.2);
              //radius = radius + random(radius/20)
          }
      
      }
  
      let x = cos(angle) * shapeFactor*radius + centerX;
      let y = sin(angle) * radius + centerY;
      //rotate(PI / random(20, 100))
  
      let xnoise = (noise(frameCount * 0.02 + i) - 0.5) * noiseAmount;
      let ynoise = (noise(frameCount * 0.02 + i) - 0.5) * noiseAmount;
      newPt = [x+xnoise, y+ynoise];
      pts.push(newPt)

      greenPt = [newPt[0]*0.9, newPt[1]*0.9];
      greenpts.push(greenPt);
  
      //curveVertex(x + xnoise, y + ynoise);
    }

    push();
    beginShape();
    fill(230);
    pts.forEach(function(d){
        curveVertex(d[0], d[1])
    })
    endShape(CLOSE);
    pop();

  
}


function draw() {
  background('#6ea2f5');
  noLoop();



  
    let shapeFactor = random(0.2, 1.5);

    //feed diff noise offsets
    centerX = width * random(0, 1);
    centerY = height * random(0, 1);
    drawBlob(centerX, centerY, shapeFactor);

    // centerX = width * random(0, 1);
    // centerY = height * random(0, 1);
    // drawBlob(centerX, centerY, shapeFactor);

    // centerX = width * random(0, 1);
    // centerY = height * random(0, 1);
    // drawBlob(centerX, centerY, shapeFactor);

    // centerX = width * random(0, 1);
    // centerY = height * random(0, 1);
    // drawBlob(centerX, centerY, shapeFactor);


   




}