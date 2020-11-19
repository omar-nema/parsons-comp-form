var imgInput;
var imgPixelsOrig = [];
let imgW, imgH;
let paramDistortNum = 0.1;
let paramDistortRange = 1;

let paramDistortSpeed

function preload(){
  imgInput = loadImage('./assets/brighten.jpg')
}

function setup() {
    createCanvas(500, 500);

    imgW = imgInput.width;
    imgH = imgInput.height;

    imgInput.loadPixels();
    let imgPixels = imgInput.pixels;
    imgPixelsOrig = createImageArray(imgInput, imgPixels);

    createDistortionCollection(imgPixelsOrig);
    

    drawCue = millis()/1000;
    console.log('preload and setup done')
}

//max out at 10

var numSeconds = 5;
var maxDistortion = 15;
var numIterations = 40;
var incTime = numSeconds/numIterations;

var collectionDistorted = [];
function createDistortionCollection(imgInput){

  let distortRanges = [];
  for (var i=0; i<numIterations; i++){
    distortRanges.push(i*(maxDistortion/numIterations));
  }

  for (var i=0; i< distortRanges.length; i++){
    var imgCopy = imgInput.map( (x) => x);
    paramDistortRange = distortRanges[i];
    var distorted = distortPixels(imgCopy);
    var imgDistorted = prepareImage(distorted);
    var imgObj = {'img': imgDistorted, 'distortionRange': paramDistortRange};
    collectionDistorted.push(imgObj);
  }

}


var cueInc = 10;
var imgIndex = 0;

var prevTime = 0;
var elapsedTime;

var incNum = 0;

function draw() {

  background(10);
   
  elapsedTime = (millis() - prevTime)/1000;

  if (elapsedTime > incTime ){ //new distorted image every increment

    prevTime = millis();
    drawImageDirect(collectionDistorted[imgIndex].img)
    
    if (imgIndex == collectionDistorted.length -1){
      imgIndex = 0;
      noLoop();
    } else {
      save(40-incNum + ".png");
      incNum++;
      imgIndex ++;
    }
    sec = drawCue;
  }




}



function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}