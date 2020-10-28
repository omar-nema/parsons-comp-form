var poly;
var paramAngle, paramDelta, paramRadius, paramShape, paramColor, paramScale;

var sliderAngle, sliderDelta, sliderRadius, sliderShape, sliderColor, sliderScale;
var btnSubmit;

function setup() {
    createCanvas(500, 500)   
    background(0)
    angleMode(DEGREES)

    fill (255)
    stroke (255)

    createP ('Angle')
    sliderAngle = createSlider(0, 90, 30, 10);

    createP ('Center Offset')
    sliderDelta = createSlider(0, 20, 0, 1);

    createP ('Size')
    sliderRadius = createSlider(0, 250, 10, 1); 

    createP ('Shape')
    sliderShape = createSlider(3, 30, 4, 1); 

    createP ('Color')
    sliderColor = createColorPicker('#ffffff'); 

    createP ('Scale')
    sliderScale = createSlider(1, 50, 10, 1);    

    // btnSubmit = createButton('Submit')
    // btnSubmit.mousePressed(redraw)
}

function updateParams(){
    paramAngle = sliderAngle.value();
    paramDelta = sliderDelta.value();
    paramShape = sliderShape.value();
    paramRadius = sliderRadius.value();
    paramScale = sliderScale.value();    
    paramColor = sliderColor.value();
}



function createPolygon(x, y, radius, npoints) {
    let angle = 360 / npoints;
    poly = new Polygon();
    for (let a = 0; a < 360; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      poly.addVertex(sx, sy);
    }
    poly.close();
    poly.hankin();
    poly.show();
  }


function draw() {

    background(40);
    // noLoop();
    updateParams();
    stroke(paramColor);
    strokeWeight(1)

    //createPolygon(width/2,height/2, paramRadius, paramShape)
    let unitSize = width/paramScale; 
    for (var y=0; y<paramScale; y++){
        for (var x=0; x<paramScale; x++){
            createPolygon(x*(unitSize+2), y*(unitSize+2), paramRadius, paramShape);
        }
    }


    // poly = new Polygon();
    // poly.addVertex(100, 100);
    // poly.addVertex(300, 100);
    // poly.addVertex(300, 300);
    // poly.addVertex(100,300);
    // poly.close()
    // poly.hankin();
    // poly.show();

}

