
var shapes = [];
var numShapes = 300;
var ydefault = -50;
var shapesize = .5;
var playing;
var track;
var amplitude;

function preload() {
  track = loadSound('./baby.mp3');
  track.setLoop(true)
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
    let cnv = createCanvas(600, 600, WEBGL);
    cnv.mousePressed(play);
    angleMode(DEGREES);

    fft = new p5.FFT(.2, 32);
    fft.setInput(track);
    amplitude = new p5.Amplitude(.5);
 
    var scl = 8;
    var xzunit = width/scl;
    var colht = 10;
    var yunit = width/20;
    for (var y = 0; y<colht; y++){
      for (var x = 0; x<scl; x++){
        for (var z =0; z<scl; z++){
          var t;
          if (random(1)<0.5){
            t = 'ambient';
          } else {
            t = 'specular';
          }
          shapes.push({
            x: x*xzunit-width/2,
            y: y*yunit,
            z: z*xzunit-width/2, 
            angle: 90,
            size: 3,
            col: color(random(255), random(255), random(255)),
            type: t
          })
        }
        }
    }

    // for (var i=0; i<numShapes; i++){
    //   var t;
    //   if (random(1)<0.5){
    //     t = 'ambient';
    //   } else {
    //     t = 'specular';
    //   }
    //   shapes.push({
    //     x: random(-width/2, width/2),
    //     y: 100,
    //     z: random(-width/2, width/2), 
    //     angle: 90,
    //     size: 3,
    //     col: color(random(255), random(255), random(255)),
    //     type: t
    //   })
    // }
}
//x is red, y is green, z is blue
//material: ambient, normal, specular
//light: direction, point, ambient
//fill nullifies the light effect


//ambient material reflects the color of ambient light - shines from everywhere in all directions
var currLightVal = 255;
var lightinc = true;
var lightx;
var lighty;

function createPlanes(){
  for (i=0; i<lightx.length; i++){
    for (j=0; j<lighty.length; j++){
      push ();
      ambientMaterial(currLightVal);
      // stroke(currLightVal);

      translate(lightx[i], lighty[j], 0)
      rotateX(45*Math.sign(lighty[j]))
      rotateY(-45*Math.sign(lightx[i]))
      plane(50, 50, 1, 1)
      pop();
    }
  }
}

function blinkingLights(){
  {
    if (lightinc){
      currLightVal += 30;
    } else {
      currLightVal -= 30;
    }

    if (currLightVal > 250){
      lightinc = false;
    } else if (currLightVal < 5){
      lightinc = true;
    }
  }
}

function draw() {
  background(0);
  orbitControl();


  let spectrum = fft.analyze();
  let wave = fft.waveform();

  var bass = fft.getEnergy('bass');
  var midlow = fft.getEnergy('lowMid');
  var mid = fft.getEnergy('mid');
  var midhigh = fft.getEnergy('highMid');
  var treble = fft.getEnergy('treble');

  //console.log(bass,midlow, mid,midhigh, treble);



  var basscolor = map(bass, 150, 255, 50 ,255);
  var midlowcolor = map(midlow, 150, 255, 50 ,255);
  var treblecolor = map(midlow, 0, 150, 50 ,255);

  if (playing){
    currLightVal = map(amplitude.getLevel(), 0, .5, 0, 255);
  } else {
    currLightVal = 255;
  }
   


  //change default perspective
  rotateX(90) 
  
  //make lights blink
  lightx = [width/2, -width/2];
  lighty = [width/2, -width/2]
  //blinkingLights();
  var lightcolor1 = color(0, 0,basscolor);
  var lightcolor2 = color(currLightVal, 0, 0);
  pointLight(lightcolor1, width/2, 50, width/2)
  pointLight(lightcolor2, -width/2, 50, -width/2)
  pointLight(lightcolor1, -width/2, 50, width/2)
  pointLight(lightcolor2, width/2, 50, -width/2)

  // pointLight(color(255), 0, 400, 0);
   //pointLight(currLightVal, 0, 500, 0)

   
   //ground plane
   {

    push()
    translate(0,0,2*ydefault)
    ambientMaterial(255)
    noStroke();
    plane(width, height)
    pop();
   }

  //shapes that emulate light sources
  createPlanes();

  //disco ball corresponding to mid low freq
  {
    pointLight(treblecolor, 0,250, 0)
    push();
    rotateX(90)
    translate(0,200, 0)
    sphere(50)
    pop();
  }


   //sphere
   {
     for (var i=0; i< shapes.length; i++){
      push ()
      var shape = shapes[i];
      // shape.x += map( noise(shape.x, i), 0, 1, -1, 1) ;
      // shape.y +=map(noise(shape.y, i), -.5, .5)
      // shape.z += map(noise(shape.z, i), -.5, .5)
 
      var shapeSize = map(noise(frameCount/5, i), 0, 1, shapesize, shapesize*3)

      rotateX(shape.angle)
      shape.size += .1;
      translate(shape.x, shape.y, shape.z)
      var ambientcolor = color(255)
      if (shape.type == 'ambient'){
        ambientMaterial(shape.col);
      } else {
        specularMaterial(shape.col);
      }
     
      noStroke();
      sphere(shapeSize)
      pop()
     }

   }
  

}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}