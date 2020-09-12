var scl = 5;
var cols, rows;
let inc = 0.1;

var zoff = 0;

function setup() {
    createCanvas(600, 600);
    background(240)   

    cols = floor(width / scl)
    rows = floor(height / scl);
    console.log(cols,rows)
}


function draw() {
    background(240);
    var yoff = 0;
    //var xoff = 0;
    zoff += .1;

    noLoop();

    for (i=0; i < 5; i++){
        for (let y = 0; y < rows; y ++ ){
            var xoff = 0;
            yoff += inc;
            for (let x = 0; x < cols; x ++ ){
                //yoff += inc;
    
                push()
                // strokeWeight(0.3);
                col = color(random(255), random(255), random(255))
                col.setAlpha(random(255))
                stroke(col)
                strokeWeight(10);
                
                var angle = noise(xoff, yoff, zoff) * TWO_PI;
                var v = p5.Vector.fromAngle(angle);
                translate(x*scl, y*scl)
                rotate(v.heading());
                line(0, 0, scl, 0)
                pop()
                // push()
                // stroke('rgba(0,0,0,.2)')
                // var angle = noise(xoff+1000, yoff+10000, zoff) * PI;
                // var v = p5.Vector.fromAngle(angle);
                // translate(x*scl, y*scl)
                // rotate(v.heading());
                // line(0, 0, scl, 0)
                // pop()
                xoff += inc;
            }
        }
    }

   





}
