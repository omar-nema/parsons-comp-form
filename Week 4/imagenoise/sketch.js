

function preload() {

}

let capture;

let vidScale = 5;

function setup() {
    createCanvas(500, 500)   
    background(240);
    pixelDensity(1)

    capture = createCapture(VIDEO);
    capture.size(width/vidScale, height/vidScale)
}

var noiseoff = 0;

function draw() {
     // noLoop()

    // loadPixels()
    background(255);
    capture.loadPixels()
    //image(capture, 0,0, 300, 300)
    noiseoff += 0.1;
    noStroke();

    for (var y=0; y<capture.height; y++){
        for (var x=0; x<capture.width; x++){
            var index = (x+y*capture.width)*4;
            noisefactor = map(noise(x, y, noiseoff), 0,1, -50, 50);
            //noisefactor = 0;
            r = capture.pixels[index] +noisefactor ;
            g = capture.pixels[index+1]+ noisefactor;
            b = capture.pixels[index+2] + noisefactor;
            a = map(noise(x, y, noiseoff), 0,1, 200, 255);

            push ()
            fill (r,g,b, a)

            transValX = map(noise(x, noiseoff), 0,1, -0.5, 0.5);
            transValY = map(noise(y, noiseoff), 0,1, -0.5, 0.5);
            translate(transValX, transValY)



            rect(x*vidScale, y*vidScale, vidScale, vidScale);
           
         
            
            pop ()

 
        }
    }
    //filter(POSTERIZE, 3);

    //noLoop();
    // loadPixels();
    // pixels[0] = 255;
    // pixels[1] = 0;
    // pixels[2] = 255;
    // pixels[3] = 0;

    //bright is sort of the avg of each color rgb
    
    // for (var y=0; y<height; y++){
    //     for (var x=0; x<width; x++){
    //         pixelVal = (x+y*width)*4;
    //         pixels[pixelVal] = random(255);
    //         pixels[pixelVal+1] = random(255);
    //         pixels[pixelVal+2] = random(255);
    //         pixels[pixelVal+3] = 255;
    //     }
    // }

    //1440000
   // console.log(pixels.length)

    //updatePixels();
}
