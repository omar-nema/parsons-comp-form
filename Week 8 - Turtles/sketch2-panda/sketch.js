


function setup() {
    createCanvas(500, 400)
    background(250);   
}


function drawFace(){
    t.penDown();

    push ()
    //draw face
    t.pushState();
    t.penUp()
    for (var i=0; i<90; i++){
        t.turnLeft(1);
        t.moveForward(2)
    }
    t.penDown()
    for (var i=0; i<180; i++){
        strokeWeight(random(4, 6))
        t.turnLeft(1);
        t.moveForward(2)

        if (i==25){
            t.pushState();
            drawEars();
            t.popState();
        }
        if (i==115){
            t.pushState();
            drawEars();
            t.popState();
        }
    }
    t.pushState();
    drawEyesLeft();
    t.popState();
    for (var i=0; i<40; i++){
        strokeWeight(random(4, 6))
        t.turnLeft(.2);
        t.moveForward(1)
    }
    for (var i=0; i<60; i++){
        strokeWeight(random(4, 6))
        t.turnLeft(1.2);
        t.moveForward(1)
    }
    for (var i=0; i<150; i++){
        strokeWeight(random(4, 6))
        t.turnLeft(0.15);
        t.moveForward(1)
    }
    
    for (var i=0; i<60; i++){
        strokeWeight(random(4, 6))
        t.turnLeft(1.2);
        t.moveForward(1)
    }
    for (var i=0; i<40; i++){
        strokeWeight(random(4, 6))
        t.turnLeft(.2);
        t.moveForward(1)
    }
    t.pushState();
    drawEyesRight();
    t.popState();
    t.pushState();
    drawNose();
    t.popState();   
    t.popState();

    pop ()
}

function drawEars(){
    push ()
    t.turnRight(90)
    t.pushState()
    for (var i=0; i<180; i++){ //get to the right spot on face
        strokeWeight(random(2, 6))
        t.turnLeft(1.17);
        t.moveForward(.8)
    }
    t.popState()

    pop ()
}

function drawNose(){
    stroke('black')
    push ()
    strokeWeight(3.5);
    t.pushState();
    t.penUp();
    t.turnLeft(90)
    t.moveForward(faceWidth/2)
    t.penDown();
    t.moveForward(30);
    t.turnLeft(90);
    //first half of nose
    for (i=0;i<90; i++){
        t.turnLeft(1);
        t.moveForward(.28);
    }
    //whiskers
    t.pushState();
    t.turnRight(90)
    t.moveForward(10)
    //branch left
    t.pushState();
    push ()
    for (i=0; i<40; i++){
        strokeWeight(random(2, 4))
        t.turnLeft(4);
        t.moveForward(1);
    }
    t.popState();
    pop ()
    
    push ()
    //branch right
    t.pushState();
    for (i=0; i<40; i++){
        strokeWeight(random(2, 4))
        t.turnRight(4);
        t.moveForward(1);
    }
    t.popState();
    pop ()

    t.popState();
    //second half of nose
    for (i=0;i<90; i++){
        t.turnLeft(1);
        t.moveForward(.28);
    }    

    t.popState();

    pop();
    
}

function drawLoop(numIncs, angle, fwd, dir){
    push ()
    if (!dir){
        dir = 'left';
    }
    if (dir == 'left'){
        for (var i=0; i<numIncs; i++){
            strokeWeight(random(2,4));
            t.turnLeft(angle);
            t.moveForward(fwd);
        }
    } else {
        for (var i=0; i<numIncs; i++){
            strokeWeight(random(2,4));
            t.turnRight(angle);
            t.moveForward(fwd);
        }       
    }
    pop ();
}


function drawEyesLeft(){

    t.pushState();
    t.penUp();
    t.turnLeft(90)
    t.moveForward(60)

    t.penDown();
    ///outer eye

    t.pushState();
    drawLoop(50, 1.7, 1, 'left')
    drawLoop(60, 1.7, 1, 'left')
    drawLoop(60, 1.5, 1, 'left')
    drawLoop(50, 1.95, 1, 'left')
    t.popState();

    //inner eye
    t.pushState();
    push ()
    stroke('gray');
    t.penUp();
    t.moveForward(30);
    t.turnLeft(90)
    t.moveForward(30);
    t.penDown();
    drawLoop(180, 2.2, 1, 'left')
    t.popState();
    pop ()

    t.popState();
}


function drawEyesRight(){

    t.pushState();
    t.penUp()
    t.turnLeft(90)
    t.moveForward(60)


    t.penDown();
    ///outer eye

    t.pushState();
    drawLoop(50, 1.7, 1, 'right')
    drawLoop(60, 1.7, 1, 'right')
    drawLoop(60, 1.5, 1, 'right')
    drawLoop(50, 1.95, 1, 'right')
    t.popState();

    //inner eye
    t.pushState();
    stroke('gray')
    t.penUp();
    t.moveForward(30);
    t.turnRight(90)
    t.moveForward(30);
    t.penDown();
    drawLoop(180, 2.2, 1, 'right')
    t.popState();

    t.popState();
}

var faceWidth = 200;

function draw() {
    noLoop();
    t = new Turtle();
    strokeWeight(1);
    t.penUp();
    t.moveTo(width/2, height*.75, 0, 30, 0);
    strokeWeight(5)

    t.pushState();
    drawFace()
    t.popState();




    //draw ears

}
