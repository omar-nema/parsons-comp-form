
let playing, track;
var fftUnits = 32;

function preload() {
  track = loadSound('./assets/asilah.mp3');
  track.setLoop(true)
}

var gridPixels = [];


function setup() {
    let cnv = createCanvas(500, 500, WEBGL);
    cnv.mousePressed(play);
    // osc = new p5.Noise('brown');
    // osc.amp(0.1);

    fft = new p5.FFT(.6, fftUnits);
    fft.setInput(track);

    var scl = 50;
    var unit = width/scl;

    for (var i= 0; i<5000; i++){
      var fftassign = floor(random(0, fftUnits/2));
      var pt = {
        x: random(width),
        y: random(width),
        z: random(width/2),
        w: random(unit/20, unit/4),
       
        index: fftassign
      }
      gridPixels.push(pt);
    }
    background(0);
}

function draw() { 

  blendMode(MULTIPLY)
  background(0)
  translate(-width/2, -height/2)
  rotate(PI/10)
   
  if (playing){

    let spectrum = fft.analyze();
    let wave = fft.waveform();
    var rectwidth = width/(fftUnits*.25);

    for (var i=0; i<gridPixels.length; i++){
      pt = gridPixels[i];
      amp = spectrum[pt.index];
      col = color(amp);
      fill(col);
      noStroke();
      push ()
      var noiseVal = map(noise(amp, pt.x, pt.y), 0, 50, -.1, .1);
      pt.x += noiseVal;
      pt.y += noiseVal;
      translate(0,0,pt.z);
      circle(pt.x, pt.y, pt.w, pt.w);
      pop ()
    }
  
  }
  
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


function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}