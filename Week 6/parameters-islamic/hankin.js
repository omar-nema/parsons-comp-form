

function Hankin(a, v){

    this.a = a;
    this.v = v;
    this.b = p5.Vector.add(a, v);
    this.end;
    this.prevD;

    this.show = function(){
        stroke (255);
        fill (255)
        line (this.a.x, this.a.y, this.end.x, this.end.y)
        // if (this.end){
        //     fill (255)
        //     ellipse(this.end.x, this.end.y, 10)
        // }
    }
    
    this.findEnd = function(other){
        //line line interesection
        //this.a, this.v
        //other.a, other.v
        var den = (other.v.y)*(this.v.x)-(other.v.x)*(this.v.y);
        var numa = (other.v.x)*(this.a.y-other.a.y)-(other.v.y)*(this.a.x-other.a.x);
        var numb = (this.v.x)*(this.a.y - other.a.y) - (this.v.y)*(this.a.x-other.a.x);
        var ua = numa / den;
        var ub = numb/den;
        var interx = this.a.x + ua*(this.v.x);
        var intery = this.a.y + ua*(this.v.y);

        if (ua > 0 && ub > 0){ //only forward intersecting rays
            var candidate = createVector(interx, intery);
            var d1 = p5.Vector.dist(candidate, this.a);
            var d2 = p5.Vector.dist(candidate, other.a);
            var dtotal = d1 + d2;
            if (!this.end){
                this.end = candidate;
                this.prevD = dtotal;
            } else if (dtotal < this.prevD){
                this.prevD = dtotal;
                this.end = candidate;
            }
        } 
    }
}