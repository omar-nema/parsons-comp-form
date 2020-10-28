var scl = 20;
var cols, rows, unitWidth, unitHeight;
var inc = 0.1;
var flowfield = [];

var particles = [];

function setup(){
    createCanvas(500, 500);
    background(255)
    cols = floor(width / scl);
    rows = floor(height / scl);
    unitWidth = width/cols;
    unitHeight = height/rows;

    for (var i = 0 ; i < 100; i++){
        particles.push(new Particle())
    }

}

var zoff = 0;

function ffLine(x, y, v){
    stroke(0)
    push ()
    translate (x*scl, y*scl)
    rotate (v.heading())
    line (0, 0, scl, 0)
    pop ()
}

function createNoiseField(colr){
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
        particles[i].show(i, colr);
        particles[i].follow(flowfield);
    }
}

function draw(){

    noLoop()
  
    background(255)
    var yoff = 0;
    for (var y = 0; y< rows; y++){
        var xoff = 0;
        for (var x = 0; x<height; x++){
            var v = p5.Vector.fromAngle((map(noise(xoff, yoff, zoff), 0, 1, 0, TWO_PI)));
            //var v = p5.Vector.fromAngle(random(0, TWO_PI))
            v.setMag(1); //can contribute to speed
            var index = x + y * cols;
            flowfield.push(v)
            flowfield[index] = v;
            //ffLine(x, y, v)

            //rect(x*unitWidth, y*unitHeight, unitWidth, unitHeight);
            xoff += inc;
        }   
        yoff += inc;
        
    }
    zoff+= inc/10;

    console.log(particles, flowfield)

    for (i=0; i < particles.length; i++){
        particles[i].update()
        particles[i].edges();
        particles[i].show(i);
        particles[i].follow(flowfield);
    }





    

}