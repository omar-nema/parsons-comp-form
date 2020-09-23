//generated using: https://randomwordgenerator.com/
prefix = ['galvanize', 'revolutionize', 'become', 'convict', 'contain', 'whisper', 'drown', 'rescue', 'appoint', 'export', 'stare', 'renew', 'advise', 'inspect',  'pin', 'prove', 'run', 'transform']
suffix = ['.io', '.ai', '.pulp', '.ing', '.all', '.ed', '.run', '.it', '.data' ,'.ly']

fonts = ['./Epilogue.ttf',  './syne.ttf', './rubik.ttf', './karla.ttf'];

var currFont;

var fontColor;

function preload(){
    currFont = loadFont(random(fonts));
}

function setup() {
    createCanvas(500, 250)   
    background(20)
    drawingContext.shadowOffsetX = 1;
    drawingContext.shadowOffsetY = -1;
    drawingContext.shadowBlur = 2;
    drawingContext.shadowColor = 'rgba(50,50,50,0.5)';
    //drawName();
}



function generateStartupName(){
    nm = random(prefix);

    ///add brackets sometimes
    if (Math.round(random(1,5)) < 2){
        nm = nm.replace(/[aeiou]/ig,'')
    }
    if (Math.round(random(1,2)) > 1){
        nm = '[' + nm + ']' 
    }

    nm += random(suffix);

    if (Math.round(random(1,5)) < 2){
        nm = nm.charAt(1) + '.';
    }
    // if (Math.round(random(1,5)) > 1){
    //     nm = '/' + nm.charAt(1) + '.';
    // }


    return nm;
}

function randomRect(maxFill){
    push();
    noStroke();
    blendMode(LIGHTEST)
    fill(random(30, maxFill))
    // fill(random(0, 100))
    //color for one of them
    shearX(PI / random(20, 80))
    rotate(PI / random(50, 300))
    rect(random(width), random(height), 30, random(80, 100));
    pop();
}

function drawName(){
  
    name = generateStartupName();

    numRects = random(3, 6);
    maxFill = 150;
    for (i=0 ; i < numRects; i++){
        randomRect(maxFill);
        maxFill -= 10;
    }

    // push ();
    textSize(50);
    colorMode(HSB)
    colr = color(random(0, 100), 70, 90);

    fill(colr)

    color('white');

    textFont(currFont);
    if (Math.round(random(1,2)) > 1){
        rotate(-PI/random(100, 150))
    }


    // textFont(myFont)
    // rotate(PI / 130)
    textAlign(CENTER, CENTER);
    text(name, width/2, height/2);

    // pop();
}

var scaleFactor = 1;
var scaleInc = 10;


var gridScale = 30;

function draw() {


   textSize(50*scaleFactor);
    scaleFactor += scaleInc;  

    drawName();
    noLoop();  


}
