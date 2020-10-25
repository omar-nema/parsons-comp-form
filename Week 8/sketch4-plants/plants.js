


function flowerStem(strWt, gap, len, unitwidth, unitht){

    push ();
    strokeWeight(strWt);
    t.pushState();
    t.penUp()
    t.moveForward(random(-unitwidth/20, unitwidth/20))
    
    t.turnRight(90);
    t.moveForward(gap)
    t.penDown();

    col = generateColor();
    stroke(col)
    t.moveForward(len)
    t.penUp();


    t.popState();

    pop()

}

function createPetal(x,y, size, gap){
    t.penUp()
    t.moveTo(x, y);
    t.penDown()
    var moveAmt = size / 170;
    t.pushState();
    col = generateColor();
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

function createPlantFlower(x,y, unitwidth, unitht, size, numPetals, gap){
    t.penUp()
    t.moveTo(x+unitwidth/2, y+unitht/2)
    t.penDown()

    //create stem
    var numStems = random(1, 3);
    for (var i = 0;  i<numStems; i++){
        flowerStem(1.5, unitht/10, unitht/4, unitwidth, unitht);
    }

    for (i=0; i< numPetals; i++){
        t.pushState();
        stroke(random(50, 255), random(0, 100))
        createPetal(x + random(-size*.1, size*.1) + unitwidth/2, y +random(-size*.1, size*.1) + unitht/2, size, gap)
        t.popState();
        t.turnLeft(random(-5, 50))
    }
}

function createCircle(){
    for (var i=0; i<72; i++){
        t.turnLeft(5)
        t.moveForward(.3);
    }
}

function createPlantRound(x, y, unitwidth, unitht){

    t.pushState();
    t.penUp()
    t.moveTo(x+unitwidth/2, y+unitht/2)
    t.penDown()

    flowerStem(2, unitht/10, unitht/4,unitwidth, unitht);
    flowerStem(2, unitht/10, unitht/4,unitwidth, unitht);
    stroke(generateColor());
    t.turnLeft(90)

    for (var i=0; i< 14; i++){
        t.penUp();
        t.moveForward(1.3);
        col = generateColor();

        stroke(col);

        t.pushState();
        randomTurn();
        t.moveForward(random(3, 25));
        t.penDown();
        createCircle();
        t.penUp();
        t.popState();
        
    }
    t.popState();
}


function createFlowerCircle(size, jaggedFactor){
    push ()
    t.pushState();
    t.penDown();
    stroke(generateColor());
    strokeWeight(2)
    for (var i=0; i< random(3, 7); i++){
        t.turnRight(random(50, 90))
        t.pushState();
        push ()
        t.penUp();
        t.moveForward(random(jaggedFactor));
        t.penDown();
        t.moveForward(size);
        t.popState();
        pop ()
    }
    t.popState();

    pop ()
}

function randomTurn(){
    var directions = ['left', 'right'];
    var currDir = random(directions);
    if (currDir == 'left'){
        t.turnLeft(random(10, 60)) 
    } else {
        t.turnRight(random(10, 60))
    }
}


function createPlantBush(x, y, unitwidth, unitht){

    t.pushState();
    t.moveTo(x+unitwidth/2, y+unitht*.75)

    //create flowers
    t.penUp();
    t.turnLeft(90)
    t.penDown();
    var numCircles = random(15,40);
   
    stroke(generateColor());
    strokeWeight(1.5)
    t.penUp();
    for (var i=0; i<numCircles; i++){
        
        t.penUp();
        t.moveForward(unitH*.015)
        t.penDown();
  
        //branch right or left and pom poms
        t.pushState();
        randomTurn();
        t.penUp();
        t.moveForward(random(unitW/5))
        t.penDown();
        createFlowerCircle(3, 2);
        t.penUp();
        t.popState()
        
    }

    t.popState();
}


function createPlantLine(x, y, unitwidth, unitht, sizeFactor){
    t.moveTo(x+unitwidth/2, y+unitht);
    t.penUp()

    var unitAmt = sizeFactor * unitH;
    t.turnLeft(90)
    for (var i=0; i< random(10, 15); i++){
        t.penUp();
        t.moveForward(unitAmt/30);
        stroke(generateColor());
        strokeWeight(2);
        t.pushState();
        t.moveForward(random(unitAmt*.1,unitAmt*.15));
        randomTurn();
        t.penDown();
        t.moveForward(unitAmt*.15);
        t.popState();
        t.penUp();
    }
}

function createPlantSquiggle(x,y, unitwidth, unitht, numLevels){

    t.pushState();

    t.penUp()
    t.moveTo(x+unitwidth/2, y+unitht*.75);
    
    strokeWeight(2);
    stroke(generateColor())
    t.penDown()

    t.turnLeft(90);

    //create dotted stem
    for (var i=0; i<5; i++){
        t.penUp();
        t.moveForward(3)
        t.penDown();
        t.moveForward(1)
    }

    for (var j=0; j<numLevels; j++){
        t.penUp();
        t.moveForward(3)

        stroke(generateColor())
        //squiggle
        t.pushState()
        t.penDown();
        for (i=0; i<20; i++){
            t.moveForward(.5)
            t.turnRight(5)
            
        }
        t.popState();

        t.pushState()
        t.penDown();
        for (i=0; i<20; i++){
            t.moveForward(.5)
            t.turnLeft(5)
            
        }
        t.popState();   
    }

    t.popState();
    
}
  