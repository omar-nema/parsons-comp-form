


var paramRes, sliderRes;
var paramSize, sliderSize;

function setup() {
    createCanvas(500, 500)   

    createP('res');
    sliderRes = createSlider(0.001, 1, .1, .1);

    createP('unit size');
    sliderSize = createSlider(0, 100, 10, 5)

}


function imageTile(startx, starty, size, resRatio, noiseStart, minCol, maxCol){

    var imgRes = Math.round(size*resRatio);
    img = createImage(imgRes, imgRes);
    img.loadPixels();

    var noiseoff = noiseStart;
    colorMode(HSB, 360, 100, 100, 100);

    //colorMode(HSB);
    // col = color(random(220, 330), 90, 90);

    for (var y=0; y <img.height; y++ ){
        for (var x=0; x <img.width; x++ ){
            cVal = map(noise(x, y, noiseoff), 0, 1, minCol, maxCol);
            c = color(cVal, 70, 60, 50)
            c = color(c)
            img.set(x, y, c)
            noiseoff += 0.3;
        }
    }
    img.updatePixels();
    noSmooth();
    image (img, startx,starty, size, size);
}

function updateParams(){
    paramRes = sliderRes.value();
    paramSize = sliderSize.value();
}


function initImage(){
    var startx = width/2;
    var starty = height/2;
    var size = 30;
    var canvasSize = width;
    
    var noiseoff= 0;
    var minCol = 160;
    var maxCol = 220;

    
    img = createImage(size, size);
    img.loadPixels();


    for (var y=0; y <img.height; y++ ){
        for (var x=0; x <img.width; x++ ){
            cVal = map(noise(x, y), 0, 1, 0, 300);
            //c = color(cVal, 70, 60, random(80, 100))
            c = color(cVal, 0,0)
           c.setAlpha(random(180, 255))
            img.set(x, y, c)
            noiseoff += 0.3;
        }
    }

    img.updatePixels();
    // noSmooth();
    image (img, 0,0, canvasSize, canvasSize);
}

function draw() {
    updateParams();
    background(0)

    console.log('starting');
    initImage();


    var canvasSize = 250;
    var size = 50;
    img = createImage(size, size);
    img.loadPixels();

    var noiseoff = 0;
    for (var y=0; y <img.height; y++ ){
        for (var x=0; x <img.width; x++ ){
            cVal = map(noise(x, y), 0, 1, 200, 250);
            //c = color(cVal, 70, 60, random(80, 100))
            c = color(cVal, random(20, 50))
            // c.setAlpha(random(0, 255))
            img.set(x, y, c)
            noiseoff += 0.3;
        }
    }

    img.updatePixels();
    noSmooth();
    //image (img, width/4,height/4, canvasSize, canvasSize);
    image(img,0, 0, 500, 500)
    console.log('donezo')
    noLoop()
}




function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
    if (key == 'd'){
        redraw();
    }
  }