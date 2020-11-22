let states = [];


function prepareImage(imagetodraw){
    var img = createImage(imgW, imgH);

    ///change to new image
    for (y=0; y<imagetodraw.length; y++){
        var row = imagetodraw[y];
        for (x=0;x<row.length; x++){
            colArray = imagetodraw[y][x]
            //var n = map(noise(x,y), 0,1, -paramNoise, paramNoise);
            imgColor = color(colArray[0],colArray[1],colArray[2],70)
            fill (imgColor)
            noStroke()           
            img.set(x, y, imgColor);
        }
    }
    img.updatePixels();
    noSmooth();
    return img;
}

function drawImageDirect(imagetodraw, x, y){
    let imgScale = min(width/imgW, height/imgH);
    image (imagetodraw, x,y, imgW*imgScale, imgH*imgScale);
}


function drawImage(imagetodraw){
    var img = createImage(imgW, imgH);
    let imgScale = min(width/imgW, height/imgH);;

    ///change to new image
    for (y=0; y<imagetodraw.length; y++){
        var row = imagetodraw[y];
        for (x=0;x<row.length; x++){
            colArray = imagetodraw[y][x]
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
    image (img, 0,0, imgW*imgScale, imgH*imgScale);
}


  
  function distortPixelsNearby(x, y, val, imgPcd){
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
  
  function distortPixels(imgPcd){
    for (y=0; y<imgPcd.length; y++){
        var row = imgPcd[y];
        for (x=0;x<row.length; x++){
            colArray = imgPcd[y][x]
            if (random(1) > 1-paramDistortNum){
                distortPixelsNearby(x,y, colArray, imgPcd);
            }   
        }
    }
    return imgPcd;
  }
  
  function createImageArray(imginput, imgpixels){
    let origImgPcd = [];

    for (y=0; y<imginput.height; y++){
        var imgRow = [];
        for (x=0; x<imginput.width; x++){
            var index = (x+y*imgW)*4;
            var imgCell = [];
            for (i=0; i<4; i++){
                imgCell.push(imgpixels[index+i])
            }
            imgRow.push(imgCell);
        }
        origImgPcd.push(imgRow);
    }
    return origImgPcd;
  }