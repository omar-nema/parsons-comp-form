var scl = 10;
var cols, rows;


var particles = [];
var flowfield = [];
var zoff = 0;

let paramNoise, paramStrokeWt, paramFill, paramVectorStrength, paramAngle;
let sliderNoise, sliderStrokeWt, sliderFill, sliderVectorStrength, sliderAngle;

function setup() {
    createCanvas(400, 400);
    background(255)   
    textSize(8);

    cols = floor(width / scl)
    rows = floor(height / scl);

    for (var i = 0 ; i < 100; i++){
        particles.push(new Particle())
    }

    

    // createP('Vector Strength')
    // sliderVectorStrength =createSlider(0, 10, 1, 1);
    // paramVectorStrength = sliderVectorStrength.value();   
    
    paramVectorStrength = 1;

    createP('Vector Field Angle')
    sliderAngle = createSlider(0, 10*PI, 2*PI, PI);
    paramAngle = sliderAngle.value();   

    createP('Shape Size')
    sliderShapeSize = createSlider(0, 20, 1, 1);
    paramShapeSize = sliderShapeSize.value();   

    createP('Stroke Weight')
    sliderStrokeWt = createSlider(0, 10, 0, 0.1);
    paramStrokeWt = sliderStrokeWt.value();
     
    createP('Fill Color')
    sliderFill =createColorPicker('#000000');
    paramFill = sliderFill.value();    

    createP('Fill Opacity')
    sliderOpacity =createSlider(0, 255, 255, 10);
    paramOpacity = sliderOpacity.value();    

    createP('Stroke Color')
    sliderStrokeFill =createColorPicker('#000000');
    paramStrokeFill = sliderStrokeFill.value();       
    
    createP('Noise Increment')
    sliderNoise = createSlider(0, 10, 5, 0.1);
    paramNoise  = sliderNoise.value();  


    btnRandom = createButton('Randomize');
    btnRandom.mousePressed(randomize)

}

function createNoiseField(){
    var yoff = 0;
    for (let y = 0; y < rows; y ++ ){
        var xoff = 0;
        for (let x = 0; x < cols; x ++ ){
            push()     
            angle = noise(xoff, yoff, zoff)* paramAngle; 
            v = p5.Vector.fromAngle(angle);
            v.setMag(paramVectorStrength);
            // flowfield.push(v)
            index = x + y * cols; // grid pos
            flowfield[index] = v
            pop()
            xoff += paramNoise;
        }
        yoff += paramNoise;
        zoff += paramNoise;
    }
    for (i=0; i < particles.length; i++){
        particles[i].update()
        particles[i].edges();
        particles[i].show(i);
        particles[i].follow(flowfield);
    }
}

function randomize(){
    sliderOpacity.value(random(0, 255))
    sliderAngle.value(random(0, 10*PI))
    sliderShapeSize.value(random(0, 20))
    sliderStrokeWt.value(random(0, 10));
    c = color(random(255), random(255), random(255));
    sliderFill.value(c.toString('#rrggbb'));

    c2 = color(random(255), random(255), random(255));
    sliderStrokeFill.value(c2.toString('#rrggbb'));    
    sliderNoise.value(random(10), random(10), random(10));
    refreshParams();

}

function refreshParams(){
    paramNoise = sliderNoise.value();
    paramFill = sliderFill.value();
    paramShapeSize= sliderShapeSize.value();
    paramStrokeWt = sliderStrokeWt.value();
    // paramVectorStrength = sliderVectorStrength.value();
    paramAngle = sliderAngle.value();
    paramOpacity = sliderOpacity.value();
    paramStrokeFill = sliderStrokeFill.value();

}

function draw() {

    refreshParams();
   //randomize();
    createNoiseField()
}
