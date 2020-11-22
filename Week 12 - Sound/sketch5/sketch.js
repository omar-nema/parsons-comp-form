let imgInput, imgPixelsOrig;
var track;
var playing;
var imgtodraw;

function preload(){
  imgInput = loadImage('./window.jpg');
  track = loadSound('./himrod.m4a');
  track.setLoop(true); 
}

function play(){
  if (!playing){
    track.play();
    playing = true;
  } else {
    track.stop();
    playing = false;
  }
}

function setup() {
    let cnv = createCanvas(700, 700);
    cnv.mousePressed(play);

    
    imgW = imgInput.width;
    imgH = imgInput.height;

    imgInput.loadPixels();
    let imgPixels = imgInput.pixels;
    imgPixelsOrig = createImageArray(imgInput, imgPixels);

    imgtodraw = prepareImage(imgPixelsOrig);


}

var imgnoise = 0;
var rectnoise = 0;
var noise2 = 0;

function draw() {

  var place = map(noise(imgnoise), 0, 1, -2, 2);
  imgnoise += .05;

  drawImageDirect(imgtodraw, 0, 0);
  drawImageDirect(imgtodraw, 20+place, 10+place);
  

  var rectlayer = map(noise(rectnoise), 0, 1, 0, 80);
  rectnoise += 0.01;

  push ()
  fill(150, rectlayer)
  rect(0,0, width,height)
  pop();

  //cover bottom
  push ()
  fill(255)
  rect(0, 500, width, 300)

  pop()

}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}