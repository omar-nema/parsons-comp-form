

function preload() {

}


function setup() {
    createCanvas(500, 500)   
    background(0)
}

function draw() {

    noLoop();
    fill (255)
    stroke (255)
    poly = new Polygon();
    poly.addVertex(100, 100);
    poly.addVertex(200, 100);
    poly.addVertex(200, 200);
    poly.addVertex(100,200);
    poly.close()
    poly.show();

}

