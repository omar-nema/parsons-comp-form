


var paramRes, sliderRes;
var paramSize, sliderSize;

function setup() {
    createCanvas(500, 500)   

    createP('res');
    sliderRes = createSlider(0.001, 1, .1, .1);

    createP('unit size');
    sliderSize = createSlider(0, 100, 10, 5)

}



function updateParams(){
    paramRes = sliderRes.value();
    paramSize = sliderSize.value();
}


function pixelLayerGradient(imgwidth, imght){
    img = createImage(imgwidth, imght);
    img.loadPixels();
    colorMode(RGB)
    var noiseoff = 0;
    for (var y=0; y <img.height; y++ ){
        for (var x=0; x <img.width; x++ ){

            var centerx = width*.6;
            var centery = height*.7;
             r = map(centerx - x, 0, width, 0, 255);
             g = map(centery - y, 0, height, 0, 255);
             b = map(centerx- width/2, -width, width, 0,255);
             c = color(r,g,b)
            // cVal = map(noise(x, y), 0, 1, 200, 250);
            //c = color(cVal, 70, 60, random(80, 100))
           // c = color(cVal, random(20, 100))
            // c.setAlpha(random(0, 255))
            img.set(x, y, c)
            noiseoff += 0.3;
        }
    }

    img.updatePixels();
    noSmooth();
    image(img,0, 0, width, height)
    console.log('donezo')
    noLoop()
}


function pixelLayerScattered(imgwidth, imght){
    img = createImage(imgwidth, imght);
    img.loadPixels();
    colorMode(RGB)
    var noiseoff = 0;
    for (var y=0; y <img.height; y++ ){
        for (var x=0; x <img.width; x++ ){

            var centerx = width*.6;
            var centery = height*.6;

            cVal = map(noise(x, y, noiseoff), 0, 1, 200, 250);
            //c = color(cVal, 70, 60, random(80, 100))
           // c = color(cVal, random(20, 100))
            c = color(255);
            c.setAlpha(random(0, 80))
            img.set(x, y, c, 50)
            noiseoff += 0.3;
        }
    }

    img.updatePixels();
    noSmooth();
    image(img,0, 0, width, height)
    console.log('donezo')
    noLoop()
}



function draw() {
    updateParams();
    background(0)

    console.log('starting');


    pixelLayerGradient(width, height);
    pixelLayerScattered(width/5,height/5);

}




function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
    if (key == 'd'){
        redraw();
    }
  }