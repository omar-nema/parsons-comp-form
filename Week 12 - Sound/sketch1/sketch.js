

// function preload() {
//   track = loadSound('./audio/grimes-skin.mp3');
//   track.setLoop(true)
// }

var fft;
let initFft = 512;
var source, amp;

function setup() {
    createCanvas(600, 600, WEBGL);

    source = new p5.AudioIn();
    source.start();

    amp = new p5.Amplitude();

    fft = new p5.FFT(.4, initFft);
    fft.setInput(source);
    userStartAudio();
}




var scl = 5;

function draw() {



  var bgcol = color(10);
  var amp = source.amplitude.getLevel();
  var bgalpha = map(amp, 0, .2, 255, 150);
  bgcol.setAlpha(bgalpha);
  background(30);
  
  orbitControl();

  let spectrum = fft.analyze();
  let wave = fft.waveform();
  let rMin = width/70;
  let rMax = width*.35;
  var bands = fft.getOctaveBands();
  var currR = 0;

  for (var i=0; i<bands.length; i++){

    ctr = bands[i].ctr;

    n = fft.getEnergy(bands[i].lo, bands[i].hi);
    n = map(n, 0, 130, 1, 150)

    if (n){
      currR += width/70
      var r = map(min(ctr, 5000), 0, 5000, rMin, rMax);
      
      var col = color('red');
      col.setAlpha(n);
      
      stroke(col);
      strokeWeight(.5);


      var col2 = color('#5151ff');
      col2.setAlpha(n/2)
      fill(col2)
      noFill()
     
      sphere(r)
    }
  }

  
  

}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}