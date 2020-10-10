
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

        // beginShape()
        // stroke('black')
        // this.vertices.forEach(function(d){
        //     console.log(d)
        //     vertex(d[0], d[1])
        // })
        // endShape(CLOSE)
    }
    this.close = function(){
        var lastEdge = this.vertices[this.vertices.length -1];
        var firstEdge = this.vertices[0];
        var edge = new Edge(lastEdge, firstEdge);
        this.edges.push(edge);
    }

    //passing vertices
    this.hankin = function(a, b){
        //midpoint, and vectors from midpoint to edge
        var mid = p5.Vector.add(this.a, this.b)
        mid.mult(0.5);
        var v1 = p5.Vector.sub(this.a, mid);
        var v2 = p5.Vector.sub(this.b, mid);
      
        this.h1 = new Hankin(a, v1);
        this.h2 = new Hankin(b, v2);
    }
}

function Edge(a,b){
    this.a = a;
    this.b = b;
    this.h1;
    this.h2;

    this.show = function(){
        line (this.a.x, this.a.y, this.b.x, this.b.y);
    }
}