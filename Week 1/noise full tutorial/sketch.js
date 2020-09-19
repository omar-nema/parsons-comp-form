var scl = 10;
var cols, rows;
let inc = 0.1;

var zoff = 0;

var particles = [];
var flowfield = [];

function setup() {
    createCanvas(700, 700);
    background(255)   

    cols = floor(width / scl)
    rows = floor(height / scl);

    //filter(BLUR, 2);
    for (var i = 0 ; i < 100; i++){
        particles.push(new Particle())
    }

}
function createNoiseField(colr){
    var yoff = 0;

    noLoop()
   
    let myDegrees = map(mouseX, 0, width, 0, 360);
    console.log(myDegrees)

    for (let y = 0; y < rows; y ++ ){
        var xoff = 0;
        
        for (let x = 0; x < cols; x ++ ){
            push()     
            stroke(0, 255)
            strokeWeight(4)
            angle = xoff*random() * TWO_PI*3;
            v = p5.Vector.fromAngle(angle);
            v.setMag(3);
            flowfield.push(v)
            index = x + y * cols; // grid pos
            flowfield[index] = v
            pop()


            xoff += inc;
        }
        yoff += inc;
        zoff += .0003;
    }

    for (i=0; i < particles.length; i++){
        particles[i].update()
        particles[i].edges();
        particles[i].show(i, colr);
        particles[i].follow(flowfield);
    }
}

function draw() {
    //background(240);



    ///createNoiseField(color(0, 5));
    createNoiseField(color(0, 100))
   // createNoiseField(color(140,133,122, 30));
    //createNoiseField();





 

   





}
