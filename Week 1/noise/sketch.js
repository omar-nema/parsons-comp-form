var scl = 10;
var cols, rows;
let inc = 0.1;

var zoff = 0;

function setup() {
    createCanvas(400, 400);
    background(240)   

    cols = floor(width / scl)
    rows = floor(height / scl);
    console.log(cols,rows)
}


function draw() {
    background(240);
    noLoop();

  
    var yoff = 0;
    //var xoff = 0;
    for (let y = 0; y < rows; y ++ ){
        var xoff = 0;
        yoff += inc;
        for (let x = 0; x < cols; x ++ ){
            //yoff += inc;

            push()
            var angle = noise(xoff, yoff) * TWO_PI;

            var v = p5.Vector.fromAngle(angle);
            translate(x*scl, y*scl)
            rotate(v.heading());
            line(0, 0, scl, 0)
            pop()

            xoff += inc;
        }
       
    }

 




}
