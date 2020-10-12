
function Polygon(){
    this.edges = [];
    this.vertices = [];

    this.addVertex = function(x, y) {
        var a = createVector(x,y);
        if (this.vertices.length > 0){
            var prev = this.vertices[this.vertices.length-1];
            var edge = new Edge(prev, a);
            this.edges.push(edge);
        }
        this.vertices.push(a)
        //this.vertices.push([x,y]);
    }

    this.show = function(){
        for (var i=0; i< this.edges.length; i++){
            this.edges[i].show();
        }
    }
    this.close = function(){
        var lastEdge = this.vertices[this.vertices.length -1];
        var firstEdge = this.vertices[0];
        var edge = new Edge(lastEdge, firstEdge);
        this.edges.push(edge);
    }


    this.hankin = function(){
        for (i=0; i<this.edges.length;i++){
            this.edges[i].hankin();
        }
        for (i=0; i<this.edges.length;i++){
            for (j=0; j<this.edges.length;j++){
                if (i !== j){
                    this.edges[i].findEnds(this.edges[j])
                }
            } 
        }
   
    }

}

function Edge(a,b){

    
    this.a = a;
    this.b = b;
    this.h1;
    this.h2;

    this.hankin = function(a, b){
        //midpoint, and vectors from midpoint to edge
        var mid = p5.Vector.add(this.a, this.b)
        mid.mult(0.5);
        var v1 = p5.Vector.sub(this.a, mid);
        var v2 = p5.Vector.sub(this.b, mid);
        var offset1 = mid;
        var offset2 = mid;
  
        if (paramDelta > 0){
            v1.setMag(paramDelta);
            v2.setMag(paramDelta);
            offset1 = p5.Vector.add(mid, v2);
            offset2 = p5.Vector.add(mid, v1);
        }
        v1.normalize();
        v2.normalize();
        v1.rotate(-paramAngle)
        v2.rotate(paramAngle)

      
        this.h1 = new Hankin(offset1, v1);
        this.h2 = new Hankin(offset2, v2);
    }

    this.findEnds = function(edge){
        //this h1 = edge.h1, or this.h1 = edge.h2
        //go through each edge. store distance along w/ output. return smallest
        this.h1.findEnd(edge.h1);
        this.h1.findEnd(edge.h2)
        this.h2.findEnd(edge.h1)
        this.h2.findEnd(edge.h2);
    }

    this.show = function(){
       
        line (this.a.x, this.a.y, this.b.x, this.b.y);
        this.h1.show()
        this.h2.show()
    }
}