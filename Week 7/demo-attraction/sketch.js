
var attractor;
var particle;
var particles = [];
var numParticles = 10;
var numAttractors = 1;
var attractors = [];
var conns = [];


var particleGrps =[];

function setup() {
    createCanvas(500, 500) ;
    
    for (var i=0; i<numParticles;i++){
        particles.push(new Particle(width/2, height/2));
    }

    //create groups of connections
    var clusterDist = [];
    var clusterInc = 0;
    for (var i=0; i<numParticles ; i += clusterInc){
        clusterSize = min(floor(random(2, 5)), numParticles-i);
        clusterInc = clusterSize;
        clusterDist.push(clusterSize)
    }

    //create clusters of nodes
    clusterDist.forEach(function(d){
        console.log(d)
        var particleGrp = [];
        for (var i=0; i<d; i++){
            particleGrp.push(new Particle(width/2, height/2))
        }
        particleGrps.push(particleGrp)
    })



    particles.forEach(function(d,i){
       var maxNodes = 10;
       numNodes = random(2, maxNodes) 
    })
    background(50);
    

    for (var i=0; i<numAttractors; i++){
        var attractor = createVector(random(width), random(height));
        attractors.push(attractor);
    }
}

var gravity = 5;
//force strength multiplier

function draw() {
 
    background(50);
    stroke (255)
    strokeWeight(4)

    for (var i=0; i<attractors.length; i++){
        push ()
        fill ('red')
        stroke ('red')
        point(attractors[i].x, attractors[i].y);
        pop ()
    }
   
 

    for (i=0; i<particles.length; i++){
        for (var j=0; j<attractors.length; j++){
            particles[i].attract(attractors[j]);
        }
        particles[i].update();
        particles[i].show();
    }

  
   
}


function Particle(x,y){
    this.pos = createVector(x,y);
    //this.vel = p5.Vector.random2D()
    this.vel = createVector()
    this.acc = createVector();

    this.update = function(){
               
        this.vel.add(this.acc);
        //this.vel.limit(5)
        this.pos.add(this.vel);
        this.acc.mult(0); //clear out after iterating thru all attractors
    }

    this.show = function(){
        point(this.pos.x, this.pos.y)
    }

    this.attract = function(target){
        var forceDir = p5.Vector.sub(target, this.pos);
        //vector needs to get shorter and shorter w/ grav force F=g/d^2
        var d = forceDir.mag();
        var forceMult = 1;
        d = constrain(d, 1, 30);
        if (d < 10){
            forceMult = -1;
        }
        var forceStrength = gravity / (d * d);
        forceDir.setMag(forceStrength);
        forceDir.mult(forceMult);
  
        this.acc.add(forceDir);
    
    }
}