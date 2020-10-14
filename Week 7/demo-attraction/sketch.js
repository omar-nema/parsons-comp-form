
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
    createCanvas(500, 500) ;
    
    for (var i=0; i<numParticles;i++){
        particles.push(new Particle(random(width), random(height), random(7,18)));
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
    
    

    // for (var i=0; i<numAttractors; i++){
    //     var attractor = createVector(random(width), random(height));
    //     attractors.push(attractor);
    // }
}


function createConnections(){

    conns.forEach(function(d){
        node1 = particles[d.node1];
        node2 = particles[d.node2];
  
        attract = createVector(random(width), random(height));
        strokeWeight(1)
        stroke(255, 50)
        line(node1.pos.x, node1.pos.y, node2.pos.x, node2.pos.y)
        
        node1.attract(node2.pos)
        node1.update();
        node1.show()

        node2.attract(node1.pos)
        node2.update();
        node2.show()
    
    })

}

//force strength multiplier


//apply connection forces
//apply repulsive forces
//node conn. node index, connection strength

function draw() {
 
    background(50);
    stroke (255)
    strokeWeight(4)
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
        // this.vel.limit(5)
        this.pos.add(this.vel);
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
        if (d < 10){
            forceMult = -.3;
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