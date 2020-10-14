//lerp = linear interpoolation

var sliderAmp, sliderFreq, sliderSpeed;
var paramAmp, paramSpeed;
let paramFreq = 0;

var startX = 50;
var startY = 250;
var endX = 450;
var endY = 50;

let numPts = 50;
let numWaves = 1;


let xInc, yInc, theta;

function setup() {
    createCanvas(500, 300);

    createP('Amplitude');
    sliderAmp = createSlider(0, 100, 30, 1);

    createP('Frequency');
    sliderFreq = createSlider(1, 10, 2, 1);

    createP('Speed');
    sliderSpeed = createSlider(0.95, 1, 1, 0.01);   

    fill(255);
    noStroke();
    ellipseMode(CENTER);

    let plotW = (endX-startX);
    let plotH =  (startY-endY);

    xInc = plotW/numPts;
    yInc = plotH/numPts;
    theta = (TWO_PI/plotW)*xInc;

}

function updateParams(){
    paramFreq = round(sliderFreq.value() * theta, 2); //has to be rounded, otherwise not recognized
    paramAmp = sliderAmp.value();
    paramSpeed = sliderSpeed.value();
    
}



let yAngle = 0;

function draw() {
    background(50);
    updateParams();
  
    for (i=0; i< numPts; i++){
        x = startX + i*xInc;
        y = startY - i*yInc;

        var xOffset = cos(yAngle) * paramAmp/3;
        var yOffset = sin(yAngle) * paramAmp;
        
        yAngle += paramFreq;
        circle(x ,y+yOffset, 10)
    }
  
}