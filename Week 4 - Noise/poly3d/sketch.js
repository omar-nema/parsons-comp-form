let rows = 10;
let cols = rows;
let unitHeight;
let unitWidth;
let shapeModes;


var shapeArray = [];

var particles = [];
var flowfield = [];

function setup() {
    createCanvas(700, 700, WEBGL)   
    background(255)
    unitHeight = height/rows;
    unitWidth = width/cols;

    initShapes();
    for (var i = 0 ; i < shapeArray.length; i++){
        particles.push(new Particle())
    }

}

function getColor(){
    return random(255);
}

function initShapes(){
    
    for (x=0; x < cols; x++){
        // minX = unitWidth*x ;
        // maxX = minX + unitWidth;
        for (y=0; y< rows; y++){
            // minY = unitHeight*y ;
            // maxY = minY + unitHeight ;
            numpts = random(3, 10);
            currShape =[];
            for (i=0; i< numpts; i++){
                shapeObj = {x: random(0, unitWidth), y: random(0, unitHeight), z: 0}
                currShape.push(shapeObj)
            }
            shapeArray.push(currShape);
        }
    }
}

var noiseoff = 0;
var noiseoff = 0;
var noiseRange = 30;
var noiseInc = 0.01;


var yTrans = 0;



//add me
var inc = 0.1;
var zoff = 0;
var scl = 10;

function createNoiseField(){
    var yoff = 0;

    for (let y = 0; y < rows; y ++ ){
        var xoff = 0;        
        for (let x = 0; x < cols; x ++ ){
            push()     
            stroke(0, 255)
            strokeWeight(4)
            angle = xoff*random() * TWO_PI*3;
            v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield.push(v)
            index = x + y * cols; // grid pos
            flowfield[index] = v
            pop()
            xoff += inc;
        }
        yoff += inc;
        zoff += .0003;
    }
    for (i=0; i < particles.length; i++){
        particles[i].update()
        particles[i].edges();
        particles[i].show(i, 50);
        particles[i].follow(flowfield);
    }
}

function createPolygon(shape, xval, yval){
        beginShape();
        push ();
        fill(getColor());
        shape.forEach(function(d, i){
            push()           
            vertex(d.x+xval, d.y+yval, map(noise(noiseoff*i), 0, 1, noiseRange/2, noiseRange*2));
            pop();
            //vertex(d.x, d.y, map(noise(xoff, yoff), 0, 1, noiseRange/2, noiseRange*2));
        
            //noiseoff += 0.01;
        })
        pop ();
        endShape(CLOSE); 
}


function draw() {
    randomSeed(5)

    //sky
    background('#87CEEB')

    //3dify
    // noLoop();
    rotateX(PI / 3)
    translate(-width/2, -height/2)
    noiseoff += noiseInc;

    //grass
    push ()
    fill('green');
    noStroke();
    rect(0,0, width, height)
    pop ()

    createNoiseField()

    //flying polygons
    // shapeArray.forEach(function(shape){
    //     beginShape();
    //     push ();

    //     fill(getColor());
    //     shape.forEach(function(d, i){
    //         vertex(d.x, d.y, map(noise(noiseoff*i), 0, 1, noiseRange/2, noiseRange*2));
    //         //vertex(d.x, d.y, map(noise(xoff, yoff), 0, 1, noiseRange/2, noiseRange*2));
        
    //         //noiseoff += 0.01;
    //     })
    //     pop ();
    //     endShape(CLOSE);
        
        
    // })


}

function createShape(minX, minY, maxX, maxY, numpts){    
    beginShape();
    for (i=0; i< numpts; i++){
        vertex(random(minX, maxX), random(minY, maxY), map(noise(i), 0, 1, -noiseRange, noiseRange))
    }
    endShape(CLOSE)
}

//regular polygon code from: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, z, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy, z);
    }
    endShape(CLOSE);
  }