

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
    sliderDistortNum = createSlider(0,.5, 0, 0.05);

    createP ('Range of Distortion')
    sliderDistortRange = createSlider(0, 50, 10, 1);

    createP ('Blend Mode')
    sliderBlendMode = createSelect();
    sliderBlendMode.option('None');
    sliderBlendMode.option('THRESHOLD');
    sliderBlendMode.option('OPAQUE');
    sliderBlendMode.option('INVERT');
    sliderBlendMode.option('POSTERIZE');
    sliderBlendMode.option('DILATE');
    sliderBlendMode.option('ERODE');

    createP ('Number of Runs')
    sliderNumRuns = createSlider(0, 200, 1, 5);

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
    var img = createImage(imgW, imgH);

    ///change to new image
    for (y=0; y<imgPcd.length; y++){
        var row = imgPcd[y];
        for (x=0;x<row.length; x++){
            colArray = imgPcd[y][x]
            //var n = map(noise(x,y), 0,1, -paramNoise, paramNoise);
            imgColor = color(colArray[0],colArray[1],colArray[2],colArray[3])
            fill (imgColor)
            noStroke()           

            img.set(x, y, imgColor);
            //rect(x*imgScl, y*imgScl, imgScl);
        }
    }
    img.updatePixels();
    noSmooth();
    image (img, 0,0, imgW/2, imgH/2);
}
function updateParams(){
    paramDistortNum = sliderDistortNum.value();
    paramDistortRange = sliderDistortRange.value();
    paramBlendMode = sliderBlendMode.value();
    paramNumRuns = sliderNumRuns.value();
}

function applyFilters(){
    if (paramBlendMode == 'THRESHOLD'){
        filter(THRESHOLD);
    } else if (paramBlendMode == 'OPAQUE'){
        filter(OPAQUE);
    } else if (paramBlendMode == 'INVERT'){
        filter(INVERT);
    } else if (paramBlendMode == 'POSTERIZE'){
        filter(POSTERIZE);
    } else if (paramBlendMode == 'DILATE'){
        filter(DILATE);
    } else if (paramBlendMode == 'BLUR'){
        filter(BLUR);
    }
    else if (paramBlendMode == 'BLUR'){
        filter(ERODE);
    }
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

    drawImage();
    applyFilters();

   //doesn't work when entered as string so instead cumbersome if


    console.log('i done')
}



function keyPressed() {
    if (key == "a") {
      save('pixels-'+ paramNumRuns.toString() +'-' + Date.now().toString() + ".png");
    }
}
