let unitW, unitH;
var scl = 8;

function setup() {
    createCanvas(800, 800)   
}

function generateColor(){
    colorMode(HSB);
    col = color(random(220, 330), 90, 90);
    return col;
}

function draw() {
    background(0)
    t = new Turtle();
    noLoop()

    noFill()
    stroke(255, 210)
    strokeWeight(1.5)

    unitW = width/scl;
    unitH = height/scl;

    for (x=0; x<scl; x++){

        t.penUp();
        t.pushState()
        var size = random(.2*unitW, unitW*.6);
   
        var gap = random(0, size*.005);
  
        var numPetals = random(1, 5)
        push ()
        createFlower(x*unitW+unitW/2, unitH, size, numPetals, gap)
        t.penDown()
        pop ()
        
        t.popState();
    }

    t.pushState();
    for (x=0; x<scl; x++){
        t.pushState();
        linePlant(x*unitW+unitW/2, unitH*2+unitH/1.5, random(0.8, 1.2));
        t.penUp();
        t.popState();
    }
    t.popState();    

    t.pushState();
    for (x=0; x<scl; x++){
        createSquigglePlant(x*unitW+unitW/2, unitH*3+unitH/2, random(2, 5));
        t.penUp();
    }
    t.popState();

    
    for (x=0; x<scl; x++){
        t.penUp();
        t.pushState()
        var size = random(.1*unitW, unitW*.13);
        var gap = random(size*.1, size*.15);
        var numPetals = random(10, 30)
        push ()
        strokeWeight(2)
        createFlower(x*unitW+unitW/2, unitH*4, size, numPetals, gap)
        t.penDown()
        pop ()
        t.penUp();
        t.popState();
    }
   
    t.pushState();
    for (x=0; x<scl; x++){
        createBush(x*unitW+unitW/2, unitH*5+unitH/2);
        t.penUp();
    }
    t.popState();


    t.pushState();
    for (x=0; x<scl; x++){
        createRoundPlant(x*unitW+unitW/2, unitH*6+unitH/2);
        t.penUp();
    }
    t.popState();


    
}
