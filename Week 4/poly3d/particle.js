
function Particle() {
    this.pos = createVector(random(width),random(height));
    
    this.vel = createVector(0,0);
    // this.vel = p5.Vector.random2D();
    this.acc = createVector(0,0);
    this.maxSpeed = 1;

    this.prevPos = this.pos.copy();

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    
    this.applyForce = function(force) {
        this.acc.add(force);
    }
    

    this.show = function(i, colr) {
        push()
        strokeWeight(0.5)
        createPolygon(shapeArray[i], this.pos.x, this.pos.y);
        this.updatePrev();
        // point(this.pos.x, this.pos.y);
        pop();
    }

    
    this.edges = function(){
        if (this.pos.x > width){
            this.pos.x = 0;
            this.updatePrev();
        } 
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();            
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();            
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();            
        }
    }

    this.updatePrev = function(pos){
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.follow = function(vectors){
        x = floor(this.pos.x / unitWidth);
        y = floor(this.pos.y / unitHeight);
        index = x + y * cols; // grid pos
        var force = vectors[index];
        this.applyForce(force);

    }


}

