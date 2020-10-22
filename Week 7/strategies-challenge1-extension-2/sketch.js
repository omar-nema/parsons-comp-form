
var attractor;
var particle;
var particles = [];
var numParticles = 100;
var numAttractors = 1;
var attractors = [];


var gravity = 5;

var conns = [];
var particleGrps =[];

///add mouse click functionality

function setup() {
    createCanvas(600, 400) ;
    
    for (var i=0; i<numParticles;i++){
        particles.push(new Particle(random(width*.2, width*.8), random(.2*height, .8*height), random(7,18)));
    }

    //create groups of connections

    var numConnections = numParticles;
    for (let i=0; i<numConnections; i++){
        let node1 = floor(random(numParticles-1));
        let node2 = floor(random(numParticles-1));
        let strength = random(1, 5);
        
        conns.push({
            node1: node1,
            node2: node2,
            strength: strength
        })
    }

    particles.forEach(function(d,i){
       var maxNodes = 10;
       numNodes = random(2, maxNodes) 
    })
    background(50);
    
}

//mouseclick add force

function mouseClicked(e){
    //add invisible node where mouse was clicked
    console.log(e.x, e.y)
    particles.push(new Particle(e.x, e.y, 0))


    for (i=0; i<particles.length-1; i++){
        conns.push({
            node1: i,
            node2: particles.length-1,
            strength: 1
        })
    }
  

    console.log(conns)
}


function createConnections(){

    conns.forEach(function(d){
        node1 = particles[d.node1];
        node2 = particles[d.node2];

        strokeWeight(1)
        stroke(255, 50)
  
        line(node1.pos.x, node1.pos.y, node2.pos.x, node2.pos.y)

        node1.attract(node2.pos)
        node1.update();
        node1.show()

        if (d.node2 < numParticles-1){
            node2.attract(node1.pos)
            node2.update();
            node2.show()
        
        }

    })

}

//force strength multiplier


//apply connection forces
//apply repulsive forces
//node conn. node index, connection strength

function draw() {
 
    background(30);
    stroke (255, 39)
    strokeWeight(1)
    createConnections();
 
}

function Particle(x,y, size){
    this.pos = createVector(x,y);
    //this.vel = p5.Vector.random2D()
    this.vel = createVector()
    this.acc = createVector();
    //this.acc.limit(0.5)
    this.size = size;

    this.update = function(){
               
        this.vel.add(this.acc);
        this.vel.limit(3)
        this.pos.add(this.vel);
        this.acc.limit(1)
        this.acc.mult(0); //clear out after iterating thru all attractors
    }

    this.show = function(){
        push ()
        strokeWeight(this.size);

        var hueRangeMin = 40;
        var hueRangeMax = 310;
        colorMode(HSB)
        var currHue =  map(this.size, 7, 19, hueRangeMin, hueRangeMax);
        var currColor = color(currHue, 100, 100, 50);
        currColor.setAlpha(50)
        strokeWeight(1)
        stroke(255);
        fill (currColor)
        circle(this.pos.x, this.pos.y, this.size)
        pop ()
    }

    this.attract = function(target){
      

        var forceDir = p5.Vector.sub(target, this.pos);
        //vector needs to get shorter and shorter w/ grav force F=g/d^2
        var d = forceDir.mag();
        var forceMult = 1;
        d = constrain(d, 1, 30);
        if (d < 5){
            forceMult = -.5;
        }
        var forceStrength = gravity / (d * d);
        forceDir.setMag(forceStrength);
        forceDir.mult(forceMult);

 
        this.acc.add(forceDir);
       
    
    }
}








    // for (var i=0; i<attractors.length; i++){
    //     push ()
    //     fill ('red')
    //     stroke ('red')
    //     point(attractors[i].x, attractors[i].y);
    //     pop ()
    // }
   
    // for (i=0; i<particles.length; i++){
    //     for (var j=0; j<attractors.length; j++){
    //         particles[i].attract(attractors[j]);
    //     }
    //     particles[i].update();
    //     particles[i].show();
    // }