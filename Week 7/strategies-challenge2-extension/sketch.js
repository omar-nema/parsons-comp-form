var sliderAmp, sliderFreq, sliderSpeed;
var paramAmp, paramSpeed;
let paramFreq = 0;

var startX = 0;
var startY = 0;
var endX = 5;
var endY = 150;
let numPts = 50;

let xInc, yInc, theta;

let strawX, strawY, strawH;

let btn;

function setup() {
    createCanvas(500, 500);

    // startX = width/2;
    // endX = (width/2)+.001;
    
    randStart = random(width*.2, width*.8);
    startX = randStart;
    endX = randStart + .001;

    strawX = width/2;
    strawH = 250;
    strawW = 27;
    strawY = height-strawH;

    // createP('Amplitude');
    // sliderAmp = createSlider(0, 50, 10, 1);

    // createP('Frequency');
    // sliderFreq = createSlider(0, 1, .5, 0.1);

    // createP('Speed');
    // sliderSpeed = createSlider(0, .3, 0.15, 0.01);   

    // paramAmp = 10;
    // paramFreq = .5;
    // paramSpeed = .15;

    fill(255);
    noStroke();
    ellipseMode(CENTER);

    let plotW = (endX-startX);
    let plotH =  (startY-endY);

    xInc = plotW/numPts;
    yInc = plotH/numPts;
    theta = (TWO_PI/plotW)*xInc;

    btn = createButton('try again?');
    btn.position(width/2-40, height/2+50)
    btn.mousePressed(restart);

    background(50);
    textSize(25);    
    textAlign(CENTER);
    textStyle(BOLD)

}

function updateParams(){
    // paramFreq = round(sliderFreq.value() * theta, 2); //has to be rounded, otherwise not recognized
    // paramAmp = sliderAmp.value();
    // paramSpeed = sliderSpeed.value();\\
    paramFreq = round(.5 * theta, 2); //has to be rounded, otherwise not recognized
    paramAmp = 10;
    paramSpeed = .15;
}

var farLeft, farRight;

function noodleIntersection(){
    noodleminX = min(xvals);
    noodlemaxX = max(xvals);
    noodleminY = min(yvals);
    noodlemaxY = max(yvals);
    push ()
    fill(50)
    if (noodlemaxY > mouseY){ //noodle fallen past straw
        farRight = noodlemaxX > (mouseX+strawW);
        farLeft = noodleminX < mouseX;
        var heightThresh = noodlemaxY > mouseX +100;
        if (heightThresh && (farLeft || farRight ) && !noodleup){
            noodleup = true;
        }
        if (farLeft ){
            text( 'uh oh', width/2, height*.2)
            startX -= 5;
            win = false;
        } else if (farRight){
            startX += 5;
            win = false;
        }
        else {
            text( 'slurp slurp', width/2, height*.2)
        }
    }
    pop ()
}

function drawNoodle(){
    xvals = [];
    push ()
    stroke(255, 100)
    fill('#cfcf56')
    xvals = [];
    yvals = [];
    for (i=0; i< numPts; i++){
        x = startX + i*xInc;
        y = startY - i*yInc;
    
        //get noiseangle
        var noiseAngle = map(noise(i*paramFreq + paramSpeed*noiseoff), 0, 1, 0, TWO_PI)
        var xOffset = sin(noiseAngle+1000) * paramAmp;
        var yOffset = sin(noiseAngle) * paramAmp;
        xvals.push(x+xOffset);
        yvals.push(y+yOffset);
        circle(x+xOffset ,y+yOffset, 10) 
    }
    noiseoff += 0.1;
    pop ()
}


let noiseoff = 0;
let xvals =[];
let yvals =[];
let noodleminX, noodlemaxX, noodleminY, noodlemaxY;
let initrect = true;
let run = true;
let win = true;
let rectX, rectY;

function restart(){
    startY = 0;
    startX = random(width*.2, width*.8);
    farLeft = false; farRight = false;
    run = true;
    // upCount = 0;
    noodleup = false;
}

let noodleup = false;
let upCount = 0;
function draw() {
    background('pink');
    push ()
    noFill()
    stroke('black');
    strokeWeight(4)
    rect(0,0, width, height);
    pop ()
    updateParams(); 
    
       
   if (startY > height || startX < 0 || startX > width){
        run = false;
        push ()
        fill(50)
       if (win == false){
        fill('red')
        text('sry, you lose :( ', width/2, height/2)
       }
       else {
        fill('green')
        text('you are a noodle master!', width/2, height/2)
       }
       btn.show();
       pop ()
    
   } 
  
   
   if (run){
    btn.hide();
    win = true;
    startY += 3;
    startX += random(-.2,.2)
    drawNoodle()
    push ()
    fill(255, 200)
    stroke (0, 70)
    if (mouseX > 0 && mouseY > 0){
        rectX = mouseX;
        rectY = max(mouseY, height*.6)
        rect(rectX, rectY, strawW, strawH, 5, 5);
     
        noodleIntersection();
    } 
    else {
        rect (strawX, strawY, strawW, strawH, 5,5)
    }
    pop ();
   }
   



  
}