
let img, imgPixelsOrig, imgPixels;

var imgScl;

function preload(){
  img = loadImage('./hajjaj2.jpg')
}

function setup() {
    createCanvas(700, 700)   
    img.loadPixels();
    imgPixelsOrig = createImageArray(img);
}

function createImageArray2D(imginput){
  var pixelArray = [];
  for (y=0; y<imginput.height; y++){
    var imgRow = [];
    for (x=0; x<imginput.width; x++){
        var index = (x+y*imginput.width)*4;
        var imgCell = [];
        for (i=0; i<4; i++){
            imgCell.push(imginput.pixels[index+i])
        }
        imgRow.push(imgCell);
    }
    pixelArray.push(imgRow);
  }   
  return pixelArray;
}

function drawImageFromPixels(pixels, imginput){
  let imgW = imginput.width;
  let imgH = imginput.height;
  let imgScale = min(width/imgW, height/imgH);;
  var imgFinal = createImage(imgW, imgH);
  for (y=0; y<pixels.length; y++){
      var row = pixels[y];
      for (x=0;x<row.length; x++){
          colArray = pixels[y][x]
          //var n = map(noise(x,y), 0,1, -paramNoise, paramNoise);
          imgColor = color(colArray[0],colArray[1],colArray[2],colArray[3])      
          imgFinal.set(x, y, imgColor);
      }
  }
  imgFinal.updatePixels();
  noSmooth();
  image (imgFinal, 0,0, imgW*imgScale, imgH*imgScale);
}


function sortPixels(pixels){

  //colArray = imgPcd[y][x]
  //var n = map(noise(x,y), 0,1, -paramNoise, paramNoise);
  //imgColor = color(colArray[0],colArray[1],colArray[2],colArray[3])

  //flatten 2d array?!

  for (var i=0; i<pixels.length;i++){
    var record = -1;
    var selectedPixel = i;
    for (var j=0; j<pixels.length;j++){
      c = 
    }
  }

}

function draw() {

  //we need to copy pixel array to prevent resampling
  imgPixels = imgPixelsOrig.map(function(arr) {
    return arr.slice();
  });
  drawImageFromPixels(imgPixels, img);
  sortPixels(imgPixels);

  noLoop();
}

function getQuick(img, x, y) {
  var i = (y * img.width + x) * 4;
  return [
    testImage.pixels[i],
    testImage.pixels[i + 1],
    testImage.pixels[i + 2],
    testImage.pixels[i + 3]
  ];
}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}