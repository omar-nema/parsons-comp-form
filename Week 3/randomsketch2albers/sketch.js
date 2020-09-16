

function preload() {

}

let rows = 7;
let cols = 12;

let unitWidth, unitHeight;
let numStripes = 6;
let colors = [];
var rectArray = [];

var colorSolids, colorStripes;

function setup() {
    createCanvas(500, 700) 
    background(240);
    unitWidth = width/cols;
    unitHeight = height/rows; 
    colorMode(HSB);

   
    mainCol = color(random(0,100), 50, 80)
    solidGray = color(hue(mainCol), 10, brightness(mainCol)-45);
    solidWhite =   color(hue(solidGray), saturation(solidGray), brightness(solidGray)+55);
    // solidWhite;
    
    // stripeGray;
    // stripeBlack;
    //one darker gray in main
    //white-ish <> gray 
    //gray-ish to black
    mainStripe = color(hue(mainCol), saturation(mainCol), brightness(mainCol)-20);
    stripeGray = color(hue(solidGray), saturation(solidGray), brightness(solidGray)+10);
    stripeBlack = color(hue(solidGray), saturation(solidGray), brightness(solidGray)-40);


    colorSolids = [ solidGray, solidWhite, mainCol]
    colorStripes = [stripeBlack, stripeGray, mainStripe]
}


//enforce: never 2 of the same

solidInd = false;

function draw() {
    noLoop();

    randomSeed(5);

    shearX(PI / 300)
    shearY(PI / 300)

    strokeWeight(0.1)

    for (x=0; x < cols; x++){
        rectArray.push([])
        for (y=0; y < rows ; y ++){
            colorSolids = shuffle(colorSolids);
            noFill();
            xVal = unitWidth*x; 
            yVal = unitHeight*y;
            push();
            fill(colorSolids[0])
            translate(xVal, yVal)
            beginShape();
            rect(0, 0, unitWidth, unitHeight)
            endShape();
            //add stripes (sometimes)

            if (random(10) > 3 || solidInd ){
          
                colorStripes = shuffle(colorStripes);
                for (i = 0; i < numStripes; i++){
                    if (i % 2 == 0){
                        fill(colorStripes[0])
                    } else {
                        fill(colorStripes[1])
                    }
                    ht = unitHeight/numStripes;
                    rect(0,0, unitWidth, ht)
                    translate(0, ht);
                }
                solidInd = false;
            } else {
                solidInd = true;
            }

            
            pop()
            

        }
    }
}
