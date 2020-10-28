


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


function draw() {

    //background(10);
    updateParams();

    console.log('starting');

    // var paramSize = 25;
    var inc = width / paramSize;

    var minCol = 0;
    var maxCol = 300;
    push ()
    for (y = 0; y<inc; y++){
        for (x=0; x<inc; x++){
            push ()
            //rotate(random(PI/ 100, PI/10))
            imageTile(x*paramSize, y*paramSize, paramSize, paramRes, x, minCol, maxCol)
            pop ()
        }
    }
    pop ()


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