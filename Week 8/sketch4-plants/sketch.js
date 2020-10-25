let unitW, unitH;
var scl = 8;

function setup() {
    createCanvas(600, 600)   
}

function generateColor(){
    colorMode(HSB);
    col = color(random(220, 330), 90, 90);
    return col;
}

//plant types: flower, line, squiggle, bush, round

function draw() {
    background(0)
    t = new Turtle();
    noLoop()

    noFill()
    stroke(255, 210)
    strokeWeight(1.5)

    unitW = width/scl;
    unitH = height/scl;

    for (var y=0; y<scl; y++){
        for (var x=0; x<scl; x++){
            push ()
            stroke(70);
            strokeWeight(.3)
            rect(x*unitW, y*unitH, unitW, unitH)
            pop ()
        }
    }

    for (x=0; x<scl; x++){
        t.penUp();
        t.pushState()
        var size = random(.2*unitW, unitW*.6);
        var gap = random(0, size*.005); //gap between petals
        var numPetals = random(1, 5)        
        push ()
        //centers along corner by default so add half unit
        createPlantFlower(x*unitW, 0, unitW, unitH, size, numPetals, gap)
        t.penDown()
        pop ()
        
        t.popState();
    }
      
    t.pushState();
    for (x=0; x<scl; x++){
        t.pushState();
        var sizeFactor = random(0.8, 1.2);
        createPlantLine(x*unitW, unitH, unitW, unitH, sizeFactor);
        t.penUp();
        t.popState();
    }
    t.popState();    

    t.pushState();
    for (x=0; x<scl; x++){

        var numSquiggles =  random(2, 5);
        createPlantSquiggle(x*unitW, unitH*2, unitW, unitH, numSquiggles);
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
        createPlantFlower(x*unitW, unitH*3, unitW, unitH, size, numPetals, gap)
        t.penDown()
        pop ()
        t.penUp();
        t.popState();
    }
   
    t.pushState();
    for (x=0; x<scl; x++){  
        createPlantBush(x*unitW, unitH*4, unitW, unitH);
        t.penUp();
    }
    t.popState();


    t.pushState();
    for (x=0; x<scl; x++){
        createPlantRound(x*unitW, unitH*5, unitW, unitH);
        t.penUp();
    }
    t.popState();


    
}
