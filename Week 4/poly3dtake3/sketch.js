let rows = 10;
let cols = rows;
let unitHeight;
let unitWidth;
let shapeModes;
let shapeSizeFactor = 0.3;


var shapeArray = [];


var terrain = [];
var terrainNoiseRange = 250;
var terrainNoise = 0;


function setup() {
    createCanvas(700, 700, WEBGL)   
    background(255)
    unitHeight = height/rows;
    unitWidth = width/cols;

    initShapes();



 
    for (var x = 0; x < cols; x++) {
        terrain[x] = [];
        for (var y = 0; y < rows; y++) {
          terrain[x][y] = 0; //specify a default value for now
        }
      }


}



function initShapes(){
    
    for (x=0; x < cols; x++){
        // minX = unitWidth*x ;
        // maxX = minX + unitWidth;
        for (y=0; y< rows; y++){
            // minY = unitHeight*y ;
            // maxY = minY + unitHeight ;
            numpts = random(3, 7);
            currShape =[];
            for (i=0; i< numpts; i++){
                shapeObj = {x: random(0, unitWidth*shapeSizeFactor), y: random(0, unitHeight*shapeSizeFactor), z: 0, gridx: x*unitWidth, gridy: y*unitHeight, gridz: random(150, 330)}
                currShape.push(shapeObj)
            }
            shapeArray.push(currShape);
        }
    }
}

var noiseoff = 0;
var noiseInc = 0.006;



var xoff, yoff;
xoff = 0;
yoff = 0;
function generateTerrain(fillCol){
    unitWidth = width / cols;
    unitHeight = height/rows;
    fill('brown');

    stroke(0, 50)   
    strokeWeight(0.2)
    var fillmin = 130;

    yoff -= 0.1;
    for (var x=0; x< cols; x++){
        terrain[x] =[];
       // terrainNoise += 0.01;
        for (var y=0; y< rows; y++){
          terrain[x][y] = map(noise(x,y, terrainNoise), 0,1, 0, terrainNoiseRange);
          //terrainNoise += 0.0001;
        }
    }

    
    for (var y=0; y<rows; y++){
        beginShape(TRIANGLE_STRIP)
            for (var x=0; x<cols; x++){
            fillCol.setAlpha(map(noise(x, y), 0,1, fillmin, 255));
            fill(fillCol);
           
            vertex(x*unitWidth, y*unitHeight, terrain[x][y]);
            vertex(x*unitWidth, (y+1)*unitHeight, terrain[x][y+1]);
          
        }
        fillmin += 1.5;
        
       //terrainNoise += 0.01;
        endShape();
    }
}

function draw() {
    randomSeed(5)

    //sky

    // noLoop();

    background('#87CEEB');
    
    //3dify
    
    rotateX(PI / 3)
    translate(-width/2, -height/2)
    noiseoff += noiseInc;

    //grass
    // push ()
    // noFill()
    // rect(0,0, width, height)
    // pop()

    //terrain();

    push ()
    fill('blue');
    generateTerrain(color('#a1661d'));

    pop()


    //flying polygons
    shapeArray.forEach(function(shape, i){
        fill(random(0, 250), 255);
       
      
        strokeWeight(0.5)
        stroke(150)
        beginShape();
        push ();
        shape[0].gridy += random(0.5, 1);
        shape[0].gridx += random(-0.5, 0.5)
        shape[0].gridz += random(-0.1, 0.1)
        //shape[0].gridz += random(-0.5, 0.5);

        // if (shape[0].gridx > width){
        //     shape[0].gridx = 0;
        // } 
        // if (shape[0].gridx < 0){
        //     shape[0].gridx = width;
        // } 
        // if (shape[0].gridy > height){
        //     shape[0].gridy = 0;
        // }
        // if (shape[0].gridy < 0){
        //     shape[0].gridy = height;
        // }
        var centerx = shape[0].gridx;
        var centery = shape[0].gridy;
        var centerz=  shape[0].gridz;
        shape.forEach(function(d, i){
            vertex(d.x + centerx, d.y + centery, centerz+map(noise(noiseoff*i), 0, 1, -20, 20));  
        })
        pop ();
        endShape(CLOSE);
        
        
    })


}

