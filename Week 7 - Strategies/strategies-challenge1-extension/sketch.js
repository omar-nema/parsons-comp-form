
var attractor;
var particle;
var particles = [];
var numParticles = 50;
var numAttractors = 1;
var attractors = [];


var gravity = 1;

var conns = [];
var particleGrps =[];

///add mouse click functionality


let sliderGrav, paramGrav;

function setup() {
    createCanvas(700, 600, WEBGL) ;


    createP ('Gravity')
    sliderGrav = createSlider(0, 30, .5, .5);

    var numConnections = numParticles;
    var numCenters = 5;

    
    for (var i=0; i<numParticles;i++){
        // particles.push(new Particle(random(-width*.4, width*.8), random(.2*height, .8*width), random(.2*width, .8*width),random(3,7)));
        let size;
        if (i < numCenters){
            size = 10;
        } else {
            size = 5;
        }
        particles.push(new Particle(random(-width*.25, width*.25), random(-width*.25, width*.25), random(-width*.25, width*.25),size));
    }

    //create groups of connections



    for (let i= numCenters+2; i<numConnections; i++){
        let node1 = floor(random(numParticles-1));
        let node2 = floor(random(numCenters-1));
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


function createConnections(){

    conns.forEach(function(d){
        node1 = particles[d.node1];
        node2 = particles[d.node2];

        strokeWeight(.2)
        stroke(90)
  
        line(node1.pos.x, node1.pos.y, node1.pos.z, node2.pos.x, node2.pos.y, node2.pos.z)

        node1.attract(node2.pos)
        node1.update();
        node1.show()

        // if (d.node2 < numParticles-1){
        //     node2.attract(node1.pos)
        //     node2.update();
        //     node2.show()
        
        // }

    })

}

//force strength multiplier


//apply connection forces
//apply repulsive forces
//node conn. node index, connection strength

function draw() {
    gravity = sliderGrav.value();
    orbitControl()
    background(30);
    stroke (255, 39)
    strokeWeight(1)
    createConnections();
 
}

function Particle(x,y, z, size){
    this.pos = createVector(x,y, z);
    //this.vel = p5.Vector.random2D()
    this.vel = createVector()
    this.acc = createVector();
    this.size = size;
    this.prevAcc;

    this.update = function(){
               
        this.vel.add(this.acc);
        this.vel.limit(1)
        this.pos.add(this.vel);
        this.acc.limit(.5)
     
        this.acc.mult(0); //clear out after iterating thru all attractors
    }

    this.show = function(){
        push ()


        var hueRangeMin = 40;
        var hueRangeMax = 310;
        colorMode(HSB)
        var currHue =  map(this.size, 3, 8, hueRangeMin, hueRangeMax);
        var currColor = color(currHue, 100, 100, 50);
        currColor.setAlpha(40)
        strokeWeight(.4)
        stroke(50, 50);
        fill ('white')
        if (this.size > 5){
            fill ('red')
        }
        translate(this.pos.x, this.pos.y, this.pos.z)
        
        sphere(this.size, 5, 5)
        pop ()
    }

    

    this.attract = function(target){
      

        var forceDir = p5.Vector.sub(target, this.pos);
        //vector needs to get shorter and shorter w/ grav force F=g/d^2
        var d = forceDir.mag();
        var forceMult = 1;
        d = constrain(d, 0, 30);
        // if (d < 3){
        //     forceMult = -1;
        // }
        if ( d < 10){
            forceMult = 0;
        }
        var forceStrength = forceMult * gravity * .5 / ( d * d );
        forceDir.setMag(forceStrength);
        this.prevAcc = forceStrength;
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