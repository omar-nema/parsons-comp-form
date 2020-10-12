var poly;
var paramAngle, paramDelta;

var sliderAngle, sliderDelta;

function setup() {
    createCanvas(500, 500)   
    background(0)
    angleMode(DEGREES)

    fill (255)
    stroke (255)

    createP ('Angle')
    sliderAngle = createSlider(0, 180, 60, 10);

    createP ('Center Offset')
    sliderDelta = createSlider(0, 50, 10, 10);
   

}

function updateParams(){
    paramAngle = sliderAngle.value();
    paramDelta = sliderDelta.value();
    //test commit
}

// function createPolygon(){

// }

function draw() {

    background(0);
    // noLoop();
    updateParams();
    poly = new Polygon();
    poly.addVertex(100, 100);
    poly.addVertex(300, 100);
    poly.addVertex(300, 300);
    poly.addVertex(100,300);
    poly.close()
    poly.hankin();
    poly.show();

}

