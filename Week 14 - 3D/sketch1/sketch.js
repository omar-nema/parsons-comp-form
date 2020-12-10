
function setup() {
    createCanvas(500, 500, WEBGL);
    background(40);
}

function draw() {
  
  orbitControl();
  rotateX(PI/3)
  background(0);

  noFill();
  col = color('#F587EA')
  col.setAlpha(50);
  stroke(col)
  var numPts = 30;
  var rMax = 150;
  var numCircles = 200;
  var hMax = 280;
  var angleInner = 360/numPts;

  var angleZ = (PI)/(numCircles);

  beginShape();
  for (var j=0.2; j<PI*.98; j+= angleZ){
    
    var a = sin(j);
    var r = sin(a)*rMax;
    var h = (hMax/numCircles)*j/angleZ;

    for (var i=0; i<numPts; i++){
      var offset = map(noise(j, i, frameCount/100), 0, 1, -10, 10);
      r = r + offset;
      var aInner = angleInner*i;
      var x = r * cos(aInner);
      var y = r * sin(aInner);
      vertex(x, y, h-100); 
    }
  }
  endShape();
}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}