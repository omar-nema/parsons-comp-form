let img, imgPixelsOrig, imgPixels;
var imgScl;
let states = []; 
let paramSortType, selectSortType;

function preload(){
  img = loadImage('./assets-img/rubysmall.jpg')
}

function setup() {
    createCanvas(500, 500, WEBGL)   

    createP('z mapped to:')
    selectSortType = createSelect();
    selectSortType.option('lightness');
    selectSortType.option('hue');
    selectSortType.option('brightness');

    img.loadPixels();
    imgPixelsOrig = createImageArray(img);
    console.log('processed pixel array: ', imgPixelsOrig)

    createP ('')
    btnDraw = createButton('Submit')
    btnDraw.mousePressed(redraw)
}

function draw() {
  background(20);
  paramSortType = selectSortType.value();
  imgPixels = imgPixelsOrig.map( (x) => x);
  translate(-width/2, -height/2);
  rotateX(-PI/10)
 // rotateY(-PI/30)
  drawImageFromArray(imgPixels, img);
  noLoop();
}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}


//points, lines, triangles, TRIANGLE_STRIP, QUADS


//POINTS AND PLAIN
function createRectFromPoints(x,y, z, size){
  beginShape(POINTS);
  vertex(x,y, z);
  vertex(x+size, y, z);
  vertex(x+size, y+size, z);
  vertex(x, y+size, z); 
  endShape(CLOSE);
}

function drawImageFromArray(pixels, imginput){
  let imgW = imginput.width;
  let imgH = imginput.height;
  let imgScale = min(width/imgW, height/imgH);;
  var imgFinal = createImage(imgW, imgH);


  for (y=0; y<imgH; y++){
      for (x=0;x<imgW; x++){
          var ind = y * imgW + x;
          c = pixels[ind].color
          c2 = Object.assign(c);
          push ();
          var thickness = 10;

          //draw flat pixels
          push ()
          strokeWeight(thickness);
          fill(c);
          stroke(c);
          createRectFromPoints(x*imgScale, y*imgScale, 0, imgScale);
          pop ()

          //draw deep pixels
          var z;
          var zMax = width*.6;
          if (paramSortType == 'lightness'){
            z = map(pixels[ind].lightness, 0, 100, 0, zMax);
          } else if (paramSortType == 'brightness'){
            z = map(pixels[ind].brightness, 0, 100, 0, zMax);
          } else if (paramSortType == 'hue'){
            z = map(pixels[ind].hue, 0, 100, 0, zMax);
          } 
          var numLayers = 4;
          noFill();
          for (var i=0; i<numLayers; i++){
            push();
            stroke(c);
            var str = map(numLayers-i, 1, numLayers, thickness*.2, thickness*.9 )
            strokeWeight(str);
            createRectFromPoints(x*imgScale, y*imgScale, z*(i/numLayers), imgScale);
            pop();
          }
      }
  }

  console.log('DONE')  
}

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



function keyPressed() {
  if (key == "a") {
    save('RUBY'+ ".png");
  }
}