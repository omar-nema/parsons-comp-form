

function Particle(i, startx, starty) {

    this.pos = createVector(random(0,width), random(0, height))
    this.vel = createVector(0,0);
    this.acc = createVector(0,0)
    this.maxSpeed = 1;
    this.prevPos = this.pos.copy();

    this.update = function(){
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    
    this.follow = function(ff){
        x = floor(this.pos.x / scl);
        y =  floor(this.pos.y / scl);
        index = x + y * cols;
        var force = ff[index];
        this.applyForce(force);
    }

    this.applyForce = function(force){
        this.acc.add(force);
    }

    this.show = function(){
        push ()
        stroke (0, 5)
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
        //point(this.pos.x, this.pos.y);
        pop ()
    }

    this.updatePrev = function(){
        this.prevPos.y = this.pos.y;
        this.prevPos.x = this.pos.x
    }

    this.edges = function(){
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0){
            this.pos.x = width;
            this.updatePrev();
  
        }
        if (this.pos.y > height){
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0){
            this.pos.y = height;
            this.updatePrev();
        }
        
    }

}
