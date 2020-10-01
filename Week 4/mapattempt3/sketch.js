
let numPoints = 100;
let noiseAmount = 7;
var shapes = [];
let treasureX, treasureY;


var terrain = [];
var cols = 60;
var rows = cols;


var terrainNoiseRange = 10;
var terrainNoise = 0;

function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowBlur = 1;
  drawingContext.shadowColor = 'black';
  background('white');

  for (var x=0; x< cols; x++){
      terrain[x] =[];
      terrainNoise += 0.1;
      for (var y=0; y< rows; y++){
        terrain[x][y] = map(noise(x,y, terrainNoise), 0,1, 0, terrainNoiseRange);
        terrainNoise += 0.01;
      }
  }

  randomSeed(10)


  rotateX(15)   
  translate(-width/2, -height/2, 0);

  generateTerrain();
  generateBlobs();
  generateTreasure();

  cursor(CROSS)
}

function plotTree(x, y){

    push ()
    fill('black')
    stroke('brown')
    strokeWeight(3);
    line(x,y,0,x,y, 30)
   
    translate(x,y, 30)
    strokeWeight(1)
    fill('white')
    stroke('green')
    sphere (4)
  
    pop ()

}

function drawBlob(centerX, centerY, shapeFactor, noiseFactor, radius, type){
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
    }
    if (radius > 30){
        for (i=0; i< 30; i++){
            rlimit = radius / 2;
            treex = centerX - random(-rlimit, rlimit);
            treey = centerY - random(-rlimit, rlimit);
            plotTree(treex, treey);
        }
    }
 
    

    push();
    beginShape();
    strokeWeight(5);
    // noStroke()
    var zHeight = 15;
    if (type == 'land'){
        fill('#ffc369');
    } else if (type == 'grass') {
        fc = color('#228B22')
        fc.setAlpha(random(150, 255));
        fill(fc)
        strokeWeight(0.5);
        stroke(fc)
        
        zHeight = 22;
    }
    
    pts.forEach(function(d){
        curveVertex(d[0], d[1],zHeight)
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
    drawBlob(blob.centerX, blob.centerY, blob.shapeFactor, blob.noiseFactor, blob.rad, 'land')
    drawBlob(random(0.9*blob.centerX, 1.1*blob.centerX), random(0.9*blob.centerY,1.1*blob.centerY), blob.shapeFactor, blob.noiseFactor/3, blob.rad*random(0, 0.4), 'grass')

    noiseFactor += 100;

    for (i=0; i< numIslands; i++){
        shapeFactor = random(0.2, 1);
        centerX = width * random(0.1, .9);
        centerY = height * random(0.1, .9);
        rad = random(10, 100)

        var numGrass = Math.round(random(0, 2));

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
            drawBlob(blob.centerX, blob.centerY, blob.shapeFactor, blob.noiseFactor, blob.rad, 'land')
            for (i=0; i<numGrass; i++){
                drawBlob(random(0.9*blob.centerX, 1.1*blob.centerX), random(0.9*blob.centerY,1.1*blob.centerY), blob.shapeFactor, blob.noiseFactor/3, blob.rad*random(0, 0.4), 'grass')
            }
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


function generateTerrain(){
    unitWidth = width / cols;
    unitHeight = height/rows;
    fill('white')
    fill('#0ecccc');
    // noStroke();
    stroke('#0c9494')
    fillCol = color('#0ecccc');
    strokeWeight(0.1)
    var fillmin = 130;
    for (var y=0; y<rows; y++){
        beginShape(TRIANGLE_STRIP)
            for (var x=0; x<cols; x++){
            fillCol.setAlpha(map(noise(x, y, terrainNoise), 0,1, fillmin, 255));
            fill(fillCol);
            vertex(x*unitWidth, y*unitHeight, terrain[x][y]);
            vertex(x*unitWidth, (y+1)*unitHeight, terrain[x][y+1]);
            terrainNoise += 0.01;
        }
        fillmin += 1.5;
        
        terrainNoise += 0.01;
        endShape();
    }
}



function draw() {

    // noLoop();

    rotateX(25)   
    translate(-width/2, -height/2, 0);
 
 
    fill('red')
    drawingContext.shadowOffsetX = 0.2;
    drawingContext.shadowOffsetY = 0.2;
    drawingContext.shadowBlur = 1;
    drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
   // console.log(dist(mouseX, mouseY, treasureX, treasureY))
    if (dist(mouseX, mouseY, treasureX, treasureY) < 50){
        strokeWeight(0.5)
        translate(treasureX, treasureY)
        stroke('red');
        noFill()
        sphere(3)
        //sphere(treasureX, treasureY,10)
    }
 

}