function makePine(x, y, uw, uh) {

  strokeWeight(1);
  t.penUp();

  t.pushState();
  t.moveTo(x + uw / 2, y + uh / 2);
  t.turnRight(90);

  for (let i = 0; i < random(12, 16); i++) {

    pineNeedle(uw);
    t.penUp();
    stroke(generateColor());
    t.turnLeft(pow(-1, i) * 90);
    t.moveBackward(noise(i) * uw * 0.8);
    t.turnRight(pow(-1, i) * 90);

    t.moveBackward(random(0, uh / 10));
  }
  t.popState();
}


function pineNeedle(uw) {
  t.pushState();
  makeLeaf(random(uw / 80, uw / 90), random(20, 30), random(30, 40), 1);
  t.popState();
  t.pushState();
  makeLeaf(random(uw / 80, uw / 90), random(20, 30), 10, 1);
  t.popState();
  t.pushState();
  makeLeaf(random(uw / 80, uw / 90), random(20, 30), -1 * random(30, 40), -1);
  t.popState();
}


function makeGrass(x, y, uw, uh) {

  c1 = generateColor();
  stroke(c1);
  strokeWeight(1);
  t.penUp();

  t.pushState();
  t.moveTo(x + uw / 2, y + uh / 2);
  t.turnLeft(90);

  for (let i = 0; i < 6; i++) {
    t.penUp();
    t.pushState();
    t.turnLeft(pow(-1, i) * random(3, 40));
    t.penDown();
    for (let j = 0; j < random(2, 4); j++) {
      t.moveForward(random(uh / 10, uh / 8));
      t.turnLeft(pow(-1, i) * (j * 2 - random(2, 4)));
    }
    t.popState();

  }
  t.popState();

}


function makeNeedlePlant(x, y, uw, uh, dir) {

  c1 = generateColor();
  stroke(c1);
  strokeWeight(1);
  t.penUp();

  t.pushState();
  t.moveTo(x + uw / 2, y + uh / 2);
  t.turnLeft(90);
  t.penDown();

  for (let k = 0; k < 4; k++) {
    //     Pair of Needles
    t.pushState();
    for (let i = 0; i < 2; i++) {
      t.pushState();
      t.turnLeft((80 - 15 * k) * pow(-1, i));
      t.moveForward(uw / 4);
      t.popState();
    }
    t.popState();
    //      next branch
    t.turnLeft(2 * dir);
    t.moveForward(uh / 50);
  }
  
  t.moveForward(uh / 5);

  t.popState();

}


function makePom(x, y, uw, uh, dir) {
  c1 = generateColor();
  c2 = generateColor();
  stroke(c1);
  strokeWeight(1);
  t.penUp();

  t.pushState();
  t.moveTo(x + uw / 2, y + uh / 2);
  t.turnLeft(90);
  t.penDown();
  t.moveForward(noise(x) * uh / 2);


  for (let i = 0; i < 4; i++) {
    strokeWeight(1);
    //     branch with pompom
    t.pushState();
    t.turnLeft(pow(-1, i) * 15 * dir);
    t.moveForward(noise(i) * uh / 2);
    stroke(c2);
    strokeWeight(10);
    t.moveForward(0);
    t.popState();
    //     next branch
    stroke(c1);
    strokeWeight(1);
    t.turnLeft(2 * dir);
    t.moveForward(noise(i) * uh / 2);
  }

  //   last pompom
  t.moveForward(random(uh / 2));
  stroke(c2);
  strokeWeight(10);
  t.moveForward(0);

  t.popState();

}



function makeLeafPlant(x, y, uw, uh, dir) {

  c1 = generateColor();
  c2 = generateColor();
  stroke(c1);
  strokeWeight(1);
  t.penUp();

  t.pushState();
  t.moveTo(x + uw / 2, y + uh / 2);
  t.turnLeft(90);
  t.penDown();
  t.moveForward(20);

  //   first leaf
  stroke(c2);
  makeLeaf(1, random(uw / 6, uw / 3), random(32, 36), 1 * dir);

  stroke(c1);
  t.turnLeft(4 * dir);
  t.penDown();

  t.moveForward(uw / 4);

  for (let k = 0; k < 2; k++) {
    stroke(c2);
    strokeWeight(1);
    //     Pair of leaves
    makeLeaves(uw);
    //     next branch
    stroke(c1);
    t.turnLeft(2 * dir);
    t.moveForward(uh / 8 + 12);
  }

  //   last Leaves
  stroke(c2);
  makeLeaves(uw);
  makeLeaf(1, random(uw / 6, uh / 3), 0, 1 * dir);

  t.popState();

}


function makeBigLeaf(x, y, uw, uh, dir) {


  c1 = generateColor();
  c2 = generateColor();
  stroke(c1);
  strokeWeight(1);
  t.penUp();

  t.pushState();
  t.moveTo(x + uw / 2, y + uh / 2);
  t.turnLeft(90);
  t.penDown();

  stroke(c1);
  for (let i = 0; i < 3; i++) {
    t.turnLeft(4 * dir);
    t.moveForward(uh / 30);
  }

  t.pushState();
  t.turnRight(20 * dir);
  stroke(c2);
  makeLeaf(random(uw / 160, uw / 120), 80, 0, dir);
  t.popState();

  stroke(c1);
  for (let i = 0; i < 5; i++) {
    t.turnLeft(4 * dir);
    t.moveForward(uh / 30);
  }

  t.popState();

}

// functions that assist in making leaves

function makeArc(inc, deg, dir) {
  for (let i = 0; i < deg; i++) {
    t.moveForward(inc);
    t.turnLeft(1 * dir);
  }
}


function makeLeaf(inc, r, ang, dir) {
  t.penDown();
  t.pushState();

  t.turnRight(ang);
  makeArc(inc, r, dir);
  t.turnRight(dir * (r - 180));
  makeArc(inc, r, dir);

  t.popState();
  t.penUp();

}


function makeLeaves(uw) {

  t.pushState();
  for (let i = 0; i < 2; i++) {
    makeLeaf(random(uw / 80, uw / 100), 20, pow(-1, i) * random(30, 40), pow(-1, i));
  }
  t.popState();
}



























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

    t.pushState();
    t.penUp()
    t.moveTo(x+unitwidth/2, y+unitht/2)
    t.penDown()

    //create stem
    var numStems = random(1, 3);
    for (var i = 0;  i<numStems; i++){
        flowerStem(1.5, unitht/10, unitht/6, unitwidth, unitht);
    }

    for (i=0; i< numPetals; i++){
        t.pushState();
        stroke(random(50, 255), random(0, 100))
        createPetal(x + random(-size*.1, size*.1) + unitwidth/2, y +random(-size*.1, size*.1) + unitht/2, size, gap)
        t.popState();
        t.turnLeft(random(-5, 50))
    }

    t.popState();
}

function createCircle(unitht){
    for (var i=0; i<72; i++){
        t.turnLeft(5)
        t.moveForward(unitht*.004);
    }
}

function createPlantRound(x, y, unitwidth, unitht){

    t.pushState();
    t.penUp()
    t.moveTo(x+unitwidth/2, y+unitht/2)
    t.penDown()

    flowerStem(2, 0, unitht/6,unitwidth, unitht);
    flowerStem(2, 0, unitht/6,unitwidth, unitht);
    stroke(generateColor());
    t.turnLeft(90)

    var numCircles = random(4, 9);
    for (var i=0; i< numCircles; i++){
        t.penUp();
        t.moveForward(unitwidth*.025);
        col = generateColor();

        stroke(col);

        t.pushState();
        randomTurn();
        t.moveForward(random(unitwidth*.03, unitwidth/5));
        t.penDown();
        createCircle(unitht);
        t.penUp();
        t.popState();
        
    }
    t.popState();
}


function createPlantRoundTall(x, y, unitwidth, unitht){

    t.pushState();
    t.penUp()
    t.moveTo(x+unitwidth/2, y+unitht/2)
    t.penDown()

    flowerStem(2, 0, unitht/6,unitwidth, unitht);
    flowerStem(2, 0, unitht/6,unitwidth, unitht);
    stroke(generateColor());
    t.turnLeft(90)

    var numCircles = 25;
    for (var i=0; i< numCircles; i++){
        t.penUp();
        t.moveForward(unitwidth*.025);
        col = generateColor();

        stroke(col);

        t.pushState();
        randomTurn();
        t.moveForward(random(unitwidth*.03, unitwidth/5));
        t.penDown();
        createCircle(unitwidth);
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
        t.moveForward(unitht*.015)
        t.penDown();
  
        //branch right or left and pom poms
        t.pushState();
        randomTurn();
        t.penUp();
        t.moveForward(random(unitwidth/5))
        t.penDown();
        createFlowerCircle(3, 2);
        t.penUp();
        t.popState()
        
    }

    t.popState();
}


function createPlantBushWide(x, y, unitwidth, unitht){

    t.pushState();
    t.moveTo(x, y+unitht*.5)

    //create flowers
    t.penUp();
    t.turnLeft(90)
    t.penDown();

    var numCircles = 600;

   
    stroke(generateColor());
    strokeWeight(1.5)
    t.penUp();
    t.turnRight(90);
  
    for (var i=0; i<numCircles; i++){
        
        t.penUp();
        t.moveForward(unitht*.015)
        t.penDown();
  
        //branch right or left and pom poms
        t.pushState();
        randomTurn();
        t.penUp();
        t.moveForward(random(unitwidth/5))
        t.penDown();
        createFlowerCircle(3, 2);
        t.penUp();
        t.popState()
        
    }

    t.popState();
}


function createPlantLine(x, y, unitwidth, unitht){
    t.moveTo(x+unitwidth/2, y+unitht);
    t.penUp()

    t.turnLeft(90)
    for (var i=0; i< random(15,23); i++){
        t.penUp();
        t.moveForward(unitht/30);
        stroke(generateColor());
        strokeWeight(2);
        t.pushState();
        t.moveForward(random(unitht*.1,unitht*.15));
        randomTurn();
        t.penDown();
        t.moveForward(unitht*.15);
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
        t.moveForward(unitht/30)
        t.penDown();
        t.moveForward(unitht/50)
    }

    for (var j=0; j<numLevels; j++){
        t.penUp();
        t.moveForward(unitht*.04)

        stroke(generateColor())
        //squiggle
        t.pushState()
        t.penDown();
        for (i=0; i<20; i++){
            t.moveForward(unitht/130)
            t.turnRight(5)
            
        }
        t.popState();

        t.pushState()
        t.penDown();
        for (i=0; i<20; i++){
            t.moveForward(unitht/130)
            t.turnLeft(5)
            
        }
        t.popState();   
    }

    t.popState();
    
}


function createPond(x,y, unitwidth, unitht){

    t.penUp();
    t.moveTo(x+unitwidth*.05, y+unitht/2);
    t.penDown();
    t.turnLeft(90);
  
    stroke(generateColor());
    for (var i=0; i< 50; i++){
        t.turnRight(2)
        t.moveForward(.5) 
    }

    for (var i=0; i< 50; i++){
        rand = round(random(1,2));
        t.turnLeft(1)
        t.moveForward(0.5)
    }
    for (var i=0; i< 100; i++){
        t.turnRight(.6)
        t.moveForward(.5) 
    }

    for (var i=0; i< 30; i++){
        rand = round(random(1,2));
        t.turnLeft(1)
        t.moveForward(0.5)
    }    

    for (var i=0; i< 40; i++){
        t.turnRight(4)
        t.moveForward(1) 
    }

    for (var i=0; i< 40; i++){
        t.turnRight(1)
        t.moveForward(1) 
    }

    for (var i=0; i< 50; i++){
        rand = round(random(1,2));
        t.turnLeft(1)
        t.moveForward(1)
    }    


    for (var i=0; i< 35; i++){
        t.turnRight(4)
        t.moveForward(1) 
    }


}
  

function createPlantSpiral(x,y, unitwidth, unitht){

}