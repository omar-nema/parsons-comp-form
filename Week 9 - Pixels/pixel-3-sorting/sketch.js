
let img, imgPixelsOrig, imgPixels;
var imgScl;
let states = []; 
let paramSortType, selectSortType;

function preload(){
  img = loadImage('./hprocess.PNG')
}

function setup() {
    createCanvas(500, 500)   
    img.loadPixels();
    imgPixelsOrig = createImageArray(img);

    createP('Sort Type')
    selectSortType = createSelect();
    selectSortType.option('none');
    selectSortType.option('brightness');
    selectSortType.option('hue');
    selectSortType.option('lightness');
    selectSortType.option('saturation');

    createP ('')
    btnDraw = createButton('Submit')
    btnDraw.mousePressed(redraw)
}

//pixel array with x, y, index values
function createImageArray(imginput){
  var pixelArray = [];
  for (y=0; y<imginput.height; y++){
    for (x=0; x<imginput.width; x++){
        var index = (x+y*imginput.width)*4;
        var imgCell = [];
        for (i=0; i<4; i++){
            imgCell.push(imginput.pixels[index+i])
        }

        c = color(imgCell[0], imgCell[1],imgCell[2],imgCell[3]);
        var pixelObj = {
          x: x,
          y: y,
          r: imgCell[0],
          g: imgCell[1],
          b: imgCell[2],
          a: imgCell[3],
          'color': c,
          'hue': hue(c),
          'saturation': saturation(c),
          'lightness': lightness(c),
          'brightness': brightness(c)
        };

        states.push(-1);

        pixelArray.push(pixelObj);
    }
  }   
  return pixelArray;
}

function drawImageFromArray(pixels, imginput){
  console.log('SORTED.')
  let imgW = imginput.width;
  let imgH = imginput.height;
  let imgScale = min(width/imgW, height/imgH);;
  var imgFinal = createImage(imgW, imgH);
  for (y=0; y<imgH; y++){
      for (x=0;x<imgW; x++){
          var ind = y * imgW + x;
          c = pixels[ind].color;    
          imgFinal.set(x, y, c);
      }
  }
  imgFinal.updatePixels();
  noSmooth();
  image (imgFinal, 0,0, imgW*imgScale, imgH*imgScale);
  
}


function sortPixels(pixels){

  for (var i=0; i<pixels.length;i++){
    var record = -1;
    var selectedPixel = i;
    
    for (var j=0; j<pixels.length;j++){
      let b = hue(pixels[j].color);
      if (b > record){
        selectedPixel = j;
        record = b;
      }
    };
    //swap dem pixels
    let temp = pixels[i];
    pixels[i] = pixels[selectedPixel];
    pixels[selectedPixel] = temp;
  };

  return pixels;
}

function draw() {

  //we need to copy pixel array to prevent resampling
  imgPixels = imgPixelsOrig.map( (x) => x);
  paramSelectType = selectSortType.value();

  console.log('SORTING...')

  if (paramSelectType == 'brightness'){
    quickSort(imgPixels, 0, imgPixels.length-1, 'brightness').then( sorted => {
    drawImageFromArray(imgPixels, img);
    }); 
  } else if (paramSelectType == 'hue'){
    quickSort(imgPixels, 0, imgPixels.length-1, 'hue').then( sorted => {
      drawImageFromArray(imgPixels, img);
      }); 
  } else if (paramSelectType == 'lightness'){
    quickSort(imgPixels, 0, imgPixels.length-1, 'hue').then( sorted => {
      drawImageFromArray(imgPixels, img);
      }); 
  }  else if (paramSelectType == 'saturation'){
    quickSort(imgPixels, 0, imgPixels.length-1, 'hue').then( sorted => {
      drawImageFromArray(imgPixels, img);
      }); 
  } 
  else {
    drawImageFromArray(imgPixels, img);
  }
  
  noLoop();
}


function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}