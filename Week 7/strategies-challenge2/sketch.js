var sliderAmp, sliderFreq, sliderSpeed;
var paramAmp, paramSpeed;
let paramFreq = 0;

var startX = 50;
var startY = 250;
var endX = 450;
var endY = 50;
let numPts = 50;

let xInc, yInc, theta;

function setup() {
    createCanvas(500, 300);

    createP('Amplitude');
    sliderAmp = createSlider(0, 50, 20, 1);

    createP('Frequency');
    sliderFreq = createSlider(0, 1, .5, 0.1);

    createP('Speed');
    sliderSpeed = createSlider(0, .3, 0.15, 0.01);   

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


let noiseoff = 0;
function draw() {
    background(50);
    updateParams();

    for (i=0; i< numPts; i++){
        x = startX + i*xInc;
        y = startY - i*yInc;
    
        //get noiseangle
        var noiseAngle = map(noise(i*paramFreq + paramSpeed*noiseoff), 0, 1, 0, TWO_PI)
        var xOffset = sin(noiseAngle+1000) * paramAmp;
        var yOffset = sin(noiseAngle) * paramAmp;
        circle(x+xOffset ,y+yOffset, 10)
    }
    
    noiseoff += 0.1;
  
}