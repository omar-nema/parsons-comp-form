

function preload() {

}



var scl = 20;
var cols, rows;

function setup() {
    createCanvas(500, 500);
    background(240)   

    cols = floor(width / scl)
    rows = floor(height / scl);
    console.log(cols,rows)
}


let noiseVal;
let noiseScale = 0.02;
let noiseOff=  0.01;


function draw() {
    background(240);
    noLoop();

    for (let y = 0; y < rows; y ++ ){
        for (let x = 0; x < cols; x ++ ){
            console.log('running')

            noiseOff += 0.1;


            noStroke();
            grayNoise = noise(noiseOff)*255
            col = color(noise(noiseOff)*255, noise(noiseOff)*255, noise(noiseOff)*255)
            fill(grayNoise)
            rect(x*scl, y*scl, width/cols, height/rows)
            //rotate( (PI / 10))
        

            // stroke('blue')
            // strokeWeight(0.5);
            // stroke('rgba(0,0,0,0.5)')
            //line(5*v.x, 30*v.y, noise(noise3)*100, noise(noise4)*100);
            // noiseDetail(4, 0.5)
            // noiseVal = noise((x)*noiseScale + noiseOff, y*noiseScale, noiseOff)
            // stroke(noiseVal * 255);
            // point(x, y)
        }
    }

 




}
