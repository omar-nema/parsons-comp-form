
let img, imgPixels;
imgPixels = [];

function preload() {
    img = loadImage('hajjaj.jpg');
}


var cols = 50;
var rows = cols;

var rectData = [];



let sliderW, sliderHt, sliderNoise, sliderBlendMode;
var paramW, paramHt, paramNoise, paramBlendMode;


function setup() {
    createCanvas(500, 500)   
    background(255);
    var val2 = 0;
    var unitSize = width / cols;
    //pixelDensity(1)

    createP('Pixel Width')
    sliderW = createSlider(0, unitSize*5, unitSize, unitSize)

    createP('Pixel Height')
    sliderHt = createSlider(0, unitSize*5, unitSize, unitSize)

    createP('Noise')
    sliderNoise = createSlider(0, unitSize*4, unitSize/2, unitSize/4)

    createP('Blend Mode');
    sliderBlendMode = createSelect();
    sliderBlendMode.option('None');
    sliderBlendMode.option('DIFFERENCE');
    sliderBlendMode.option('HARD_LIGHT');
    sliderBlendMode.disable('BURN');


    img.loadPixels();
    var counter = 0;
    var currVal = [];
    //change image to more sensible array
    img.pixels.forEach(function(d){
        currVal.push(d)
        if (counter == 3) {
            counter = 0;
            imgPixels.push(currVal);
            currVal = [];
        } else {
            counter ++;
        }
    })
   
    for (x=0; x<cols; x++){
        for (y=0; y<rows; y++){
            col = imgPixels[val2]
            fillCol = color(col[0], col[1], col[2], 230)
            rectData.push({
                fill: fillCol,
                x: x*unitSize,
                y: y*unitSize,
                width: unitSize
            })
            val2 ++;
        }
    }

}

var noiseOff = 0;
function drawRects(){
    noStroke();
    rectData.forEach(function(d, i){
        fill(d.fill);
        noiseVal = map(noise(d.x*1000), 0, 1, 0, paramNoise);
        noiseVal2 = map(noise(-d.y*1000), 0, 1, 0, paramNoise);
        ellipse (d.x, d.y, paramW + noiseVal, paramHt + noiseVal2);
    })


}

function manipulateRects(){

   for (var i=0; i< (rectData.length - 50); i += floor(random(50)) ){
       rectData[i]['width'] = 50
       rectData[i]['fill'] = color('blue');
   }
   

}

function updateParams(){
    paramW = sliderW.value();
    paramHt = sliderHt.value();
    paramNoise = sliderNoise.value();
    paramBlendMode = sliderBlendMode.value();
}

//BLENDMODE DIFFERENCE, HARD_LIGHT, BURN

//NEEDS NOISE

function draw() {

    background(240);
    
    // blendMode(HARD_LIGHT)
    if (paramBlendMode == 'HARD_LIGHT'){
        blendMode(HARD_LIGHT);
    } else if (paramBlendMode == 'DIFFERENCE'){
        blendMode(DIFFERENCE);
    } else if (paramBlendMode == 'BURN'){
        blendMode(BURN);
    }

    // console.log(paramBlendMode)

    updateParams()
    drawRects();
  

    //image (img,0,0, width, height)
   
}
