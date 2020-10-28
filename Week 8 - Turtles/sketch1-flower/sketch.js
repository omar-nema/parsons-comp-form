
function setup() {
    createCanvas(600, 600)   
}

function createPetal(x,y, size, gap){
    t.penUp()
    t.moveTo(x, y);
    t.penDown()
    var moveAmt = size / 170;
    t.pushState();
    colorMode(HSB);
    col = color(random(220, 330), 90, 90, round(random(0,.5), 2));
    stroke(col)
    for (var i=0; i<90; i++){
        t.moveForward(moveAmt);
        t.turnLeft(1)
    }
    for (var i=0; i<9; i++){
        t.turnLeft(10)
        t.moveForward(gap) //tightness
        
    }
    for (var i=0; i<90; i++){
        t.moveForward(moveAmt);
        t.turnLeft(1)
    }
    t.popState()
}

function createFlower(x,y, size, numPetals, gap){
    t.penUp()
    t.moveTo(x, y)
    t.penDown()
    for (i=0; i< numPetals; i++){
        t.pushState();
        stroke(random(50, 255), random(0, 100))
        // strokWeight(0.2);
        createPetal(x + random(-size*.1, size*.1), y +random(-size*.1, size*.1), size, gap)
        t.popState();
        t.turnLeft(random(-5, 50))
    }
}

var scl = 7;
function draw() {
 
    background(0)


    t = new Turtle();
    

    //line(width/2, height/2, width/2 + 130, height/2);
    noLoop()

    noFill()
    stroke(255, 210)
    strokeWeight(1.5)

    var unitW = width/scl;
    var unitH = height/scl;
   
    for (y=0; y<scl; y++){
        for (x=0; x<scl; x++){

            t.penUp();
            t.pushState()
            var size = random(.2*unitW, unitW*.95);
       
            var gap = random(0, size*.01);
      
            var numPetals = random(1, 5)
            push ()
            createFlower(x*unitW+unitW/2, y*unitH+unitH/2, size, numPetals, gap)
            t.penDown()
            pop ()
            
            t.popState();
        }
    }



    



    // t.pushState();
    // createPetal(width/2, height/2)
    // t.popState();

    // t.turnLeft(70)

    // t.pushState();
    // createPetal(width/2, height/2)
    // t.popState();


    // for (var i=0; i<90; i++){
    //     t.moveForward(1.2);
    //     t.turnLeft(1+i*.01)
    //     console.log('hi')
    // }    


    // for (i = 0; i < 100; i+= frameCount){
        
    //     //console.log('uh')
    //     t.moveForward(1)
    // }
   
    
}
