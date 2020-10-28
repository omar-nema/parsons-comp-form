

let inputImg;

function preload() {
    inputImg = loadImage('hajjaj2.jpg')
}


let sliderDistortNum, sliderBlendMode, sliderDistortRange;
var paramDistortNum, paramBlendMode, paramDistortRange;
var imgPcd = []; //'processed'
var origImgPcd = [];
var imgScl;
let imgW, imgH;
let btnDraw;

let inputNumRuns, paramNumRuns;

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES)

    imgW = inputImg.width;
    imgH = inputImg.height;
    imgScl = min(width/inputImg.width, height/inputImg.height);


    createP ('Pct of Distorted Pixels')
    sliderDistortNum = createSlider(0,1, 0, 0.05);

    createP ('Range of Distortion')
    sliderDistortRange = createSlider(0, 50, 10, 1);

    createP ('Blend Mode')
    sliderBlendMode = createSelect();
    sliderBlendMode.option('None');
    sliderBlendMode.option('DIFFERENCE');
    sliderBlendMode.option('HARD_LIGHT');
    sliderBlendMode.option('BURN');

    createP ('Number of Runs')
    sliderNumRuns = createSlider(0, 200, 0, 5);

    createP ('')
    btnDraw = createButton('Submit')
    btnDraw.mousePressed(redraw)

    inputImg.loadPixels();
    imgPixels = inputImg.pixels;
    //change image to more sensible 2d array
    for (y=0; y<inputImg.height; y++){
        var imgRow = [];
        for (x=0; x<inputImg.width; x++){
            var index = (x+y*imgW)*4;
            var imgCell = [];
            for (i=0; i<4; i++){
                imgCell.push(imgPixels[index+i])
            }
            imgRow.push(imgCell);
        }
        origImgPcd.push(imgRow);
    }
}

function distortPixelsNearby(x, y, val){
    var pixelCap = paramDistortRange;
    var pixelsLeft = min(x, pixelCap);
    var pixelsAbove = min(y, pixelCap);
    var pixelsBelow = min(imgH-y, pixelCap);
    var pixelsRight = min(imgW-x, pixelCap);

    for (i=0; i<pixelsLeft; i++){
        imgPcd[y][x-i] = colArray;
    }
    for (i=0; i<pixelsRight; i++){
        imgPcd[y][x+i] = colArray;
    }
    for (i=0; i<pixelsAbove; i++){
        imgPcd[y-i][x] = colArray;
    }
    for (i=0; i<pixelsBelow; i++){
        imgPcd[y+i][x] = colArray;
    }    
     
}

function distortPixels(){
    for (y=0; y<imgPcd.length; y++){
        var row = imgPcd[y];
        for (x=0;x<row.length; x++){
            colArray = imgPcd[y][x]
            if (random(1) > 1-paramDistortNum){
                distortPixelsNearby(x,y, colArray);
            }   
        }
    }
}


function drawImage(){

    for (y=0; y<imgPcd.length; y++){
        var row = imgPcd[y];
        for (x=0;x<row.length; x++){
            colArray = imgPcd[y][x]
            //var n = map(noise(x,y), 0,1, -paramNoise, paramNoise);
            imgColor = color(colArray[0],colArray[1],colArray[2],colArray[3])
            fill (imgColor)
            noStroke()           
            rect(x*imgScl, y*imgScl, imgScl);
        }
    }
    console.log('i done')

}
function updateParams(){
    paramDistortNum = sliderDistortNum.value();
    paramDistortRange = sliderDistortRange.value();
    paramBlendMode = sliderBlendMode.value();
    paramNumRuns = sliderNumRuns.value();
}


function draw() {
    noLoop(); 
    //copy original to prevent distortion from piling up
    imgPcd = origImgPcd.map(function(arr) {
        return arr.slice();
    });
    // console.log(imgPcd)
    background(255);
    updateParams();
    
    console.log('i distort')

    console.log('run num', paramNumRuns)
    for (var i=0; i<paramNumRuns; i++){
        distortPixels();
    }
    if (paramBlendMode == 'HARD_LIGHT'){
        blendMode(HARD_LIGHT);
    } else if (paramBlendMode == 'DIFFERENCE'){
        blendMode(DIFFERENCE);
    } else if (paramBlendMode == 'BURN'){
        blendMode(BURN);
    }
    
    drawImage();
    console.log('i done')
}



function keyPressed() {
    if (key == "a") {
      save('pixels-'+ paramNumRuns.toString() +'-' + Date.now().toString() + ".png");
    }
}
