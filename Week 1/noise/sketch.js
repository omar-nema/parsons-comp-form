var scl = 15;
var cols, rows;
let inc = 0.1;

var zoff = 0;

function setup() {
    createCanvas(700, 700);
    background(240)   

    cols = floor(width / scl)
    rows = floor(height / scl);
    console.log(cols,rows)
}

var boff = 0;
function draw() {
     background('#8afff7');
  
    boff += 1; 
   
    var yoff = 0;
    //var xoff = 0;
    zoff += .03;



    randomSeed(10)
   

    for (let y = 0; y < rows; y ++ ){
        var xoff = 0;
        yoff += inc;

        
        for (let x = 0; x < cols; x ++ ){
            //yoff += inc;

            push()
            // strokeWeight(0.3);
            // col = color(random(255), random(255), random(255))
            // col.setAlpha(random(255))
            // stroke(col)
            strokeWeight(1);
            stroke('black')
            var angle = noise(xoff, yoff, zoff) * TWO_PI;
            var v = p5.Vector.fromAngle(angle);
            translate(x*scl, y*scl)
            rotate(v.heading());
            line(0, 0, scl, 0)


            
            noStroke();
            strokeWeight(1)
            stroke(noise(xoff, yoff)*255)
            ///fill(random(255))
           // fill(noise(xoff)*255)
            shearX(PI / 8 )

           
            
            rect(0,0,scl,scl);
            

            
            pop()

            
    
            xoff += inc;
        }
    }


   





}
