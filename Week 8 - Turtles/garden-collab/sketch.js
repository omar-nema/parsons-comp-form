let unitW, unitH;
var scl = 8;


var plantGrid = [];

function setup() {
    createCanvas(600, 600)   
    ///
    for (var y=0; y<scl; y++){
        var gridRow = [];
        for (var x=0; x<scl; x++){
            gridRow.push([])
        }
        plantGrid.push(gridRow)
    }

    
}

function generateColor(){
    colorMode(HSB);
    col = color(random(220, 330), 90, 90);
    return col;
}

//plant types: flower, line, squiggle, bush, round
//tall plants: flower, squiggle, line, round (separate function), bush
//bush as wide plant

//  makeBigLeaf(300, 200, 100, 100, 1);
//makeGrass(400, 200, 100, 100);

function draw() {
    background(0)
    t = new Turtle();
    noLoop()

    noFill()
    stroke(255, 210)
    strokeWeight(1.5)

    unitW = width/scl;
    unitH = height/scl;


    //create a grid
    // for (var y=0; y<scl; y++){
    //     for (var x=0; x<scl; x++){
    //         push ()
    //         stroke(70);
    //         strokeWeight(.3)
    //         rect(x*unitW, y*unitH, unitW, unitH)
    //         pop ()
    //     }
    // }


    //x, y location -- //size
    makePom(0, 3*unitH, unitW, 2*unitH, -1); 
    // makePom(unitW*5, 6*unitH, unitW, 2*unitH, -1);
    // makePom(unitW*6, 6*unitH, unitW, 2*unitH, -1);

    makePine(unitW*.5, unitH*6.3, unitW, unitH); 
    makePine(unitW*1.5, unitH*7, unitW, unitH); 
    makePine(unitW*.5, unitH*7, unitW, unitH); 
    makePine(unitW*3, unitH, unitW, unitH); 

    makeLeafPlant(unitW*2, 4*unitH, unitW, 1.5*unitH, -1);
    makeLeafPlant(unitW*3, 7*unitH, unitW, 1.5*unitH, 1);
    makeLeafPlant(unitW*3, 7*unitH, unitW, 1.5*unitH, -1);
    makeLeafPlant(unitW*4, 7*unitH, unitW, 1.5*unitH, -1);

    makeNeedlePlant(unitW*3,unitH*5, unitW, unitH, 1);
    makeNeedlePlant(unitW*6,unitH, unitW, unitH, 1);

    var numSquiggles =  random(2, 5);
    createPlantSquiggle(5*unitW, unitH*2, unitW, unitH, numSquiggles);
    createPlantSquiggle(6*unitW, unitH*2, unitW, unitH, numSquiggles);
    
      
    createPlantFlower(unitW*5, unitH*4, unitW, unitH, unitW*.5, random(1, 5), random(0, unitW*.005));  
    createPlantFlower(unitW*5, unitH*5, unitW, unitH, unitW*.5, random(1, 5), random(0, unitW*.005));  
    createPlantFlower(unitW*6, unitH*4, unitW, unitH, unitW*.5, random(1, 5), random(0, unitW*.005));    
    createPlantFlower(unitW*6, unitH*5, unitW, unitH, unitW*.5, random(1, 5), random(0, unitW*.005));    
    t.penUp();


    var startHt = 3*unitH
    for (var i=0; i<2; i++){
        t.pushState();
        createPond(4*unitW, startHt, unitW, unitH)
        t.popState();
        startHt += unitH*.05;
    }



    t.pushState();
    var numSquiggles = 4;
    createPlantSquiggle(unitW, unitH*3, unitW, unitH, numSquiggles);
    t.popState();

    t.pushState();
    var numSquiggles = 4;
    createPlantSquiggle(unitW, unitH*4, unitW, unitH*2, numSquiggles);
    t.popState();

    t.pushState();
    createPlantBushWide(0, 0, unitW, unitH);
    t.popState();

    //plant types: flower,  squiggle, bush
    //also the pond one
  

    // for (x=0; x<scl; x++){
    //     t.penUp();
    //     t.pushState()
    //     var size = random(.2*unitW, unitW*.6);
    //     var gap = random(0, size*.005); //gap between petals
    //     var numPetals = random(1, 5)        
    //     push ()
    //     //centers along corner by default so add half unit
    //     createPlantFlower(x*unitW, 0, unitW, unitH, size, numPetals, gap)
    //     t.penDown()
    //     pop ()
        
    //     t.popState();
    // }
      
    // t.pushState();
    // for (x=0; x<scl; x++){
    //     t.pushState();
    //     var sizeFactor = random(0.8, 1.2);
    //     createPlantLine(x*unitW, unitH, unitW, unitH);
    //     t.penUp();
    //     t.popState();
    // }
    // t.popState();    

    // t.pushState();
    // for (x=0; x<scl; x++){

    //     var numSquiggles =  random(2, 5);
    //     createPlantSquiggle(x*unitW, unitH*2, unitW, unitH, numSquiggles);
    //     t.penUp();
    // }
    // t.popState();

    
    // for (x=0; x<scl; x++){
    //     t.penUp();
    //     t.pushState()

    //     var size = random(.1*unitW, unitW*.13);
    //     var gap = random(size*.1, size*.15);
    //     var numPetals = random(10, 30)
    //     push ()
    //     strokeWeight(2)
    //     createPlantFlower(x*unitW, unitH*3, unitW, unitH, size, numPetals, gap)
    //     t.penDown()
    //     pop ()
    //     t.penUp();
    //     t.popState();
    // }
   
    // t.pushState();
    // for (x=0; x<scl; x++){  
    //     createPlantBush(x*unitW, unitH*4, unitW, unitH);
    //     t.penUp();
    // }
    // t.popState();


    // t.pushState();
    // for (x=0; x<scl; x++){
    //     createPlantRound(x*unitW, unitH*5, unitW, unitH);
    //     t.penUp();
    // }
    // t.popState();

    // var size = unitH;
    // var gap = size*0.015;
    // var numPetals = 3    
    // push ()
    // //centers along corner by default so add half unit
    // t.pushState();
    // createPlantFlower(0, unitH*6, unitW, unitH*2, unitW, numPetals, gap)
    // t.popState();
    // pop();

    // t.pushState();
    // var numSquiggles = 4;
    // createPlantSquiggle(unitW, unitH*6, unitW, unitH*2, numSquiggles);
    // t.popState();


 
    // t.pushState();
    // createPlantBushWide(unitW*2, unitH*6, unitW*2, unitH);
    // t.penUp();
    // t.popState(); 


    // t.pushState();
    // createPlantLine(5*unitW, unitH*6, unitW, unitH*2);
    // t.popState();
    // t.penUp();


    // t.pushState();
    // createPlantBush(6*unitW, unitH*6, unitW, unitH*2);
    // t.popState();  

    // t.pushState();
    // createPlantRoundTall(7*unitW, unitH*6, unitW, unitH*2);
    // t.popState();  


  




}
