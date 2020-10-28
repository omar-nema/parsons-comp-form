let margin = 30;
let xPos = margin;
let yPos = 35;
let lineht = 35;
var allText = [];


let texttest;
function preload() {
    texttest = loadImage('take1.png')
}

var font;


let paramrX, paramrY, paramFontSize, paramFontColor, paramBg;
var sliderrX, sliderrY, sliderFontSize, sliderFontColor, sliderBg;

function setup() {
    createCanvas(500, 500, WEBGL) ;
    background(240)
    textSize(26);
    angleMode(DEGREES)
    font = loadFont('Rubik-Bold.ttf');
    textFont(font, 24)

    // createP('textPHrase')
    // sliderrX = createSlider(0, 360, 0, 10);


    createP('rotateX')
    sliderrX = createSlider(0, 360, 0, 10);

    createP('rotateY')
    sliderrY = createSlider(0, 360, 0, 10);

    createP('Font Size')
    sliderFontSize = createSlider(8, 50, 24, 1);

    createP('Text Color')
    sliderFontColor = createColorPicker('#ffffff')

    createP('Background')
    sliderBg = createColorPicker('#000000')    

}

var paramText = 'hello and me';
let lineHt = 50;


function updateParams(){
    paramFontSize = sliderFontSize.value();
    paramrX = sliderrX.value();
    paramrY = sliderrY.value();
    paramFontColor = sliderFontColor.value();
    paramBg = sliderBg.value();

}

function draw() {

    //oLoop();

    updateParams();
    background(paramBg)

    //transformations
    rotateX(paramrX)
    rotateY(paramrY);
    fill (paramFontColor)

    //create text texture 
    graphicSize = width/2;
    textTexture = createGraphics(graphicSize, graphicSize)
	textTexture.background(paramBg);
    textTexture.fill(paramFontColor);
    textTexture.textAlign(CENTER);
    textTexture.textFont(font, paramFontSize)

    //multi-line text needed
    //for loop needed here
    // textW = textWidth(paramText);
    // numLines = ceil(textW/graphicSize);
    // let currLine = 0;
    // for (i=0; i<numLines; i++){
    //     textTexture.text(paramText, graphicSize/2, currLine);
    //     currLine += lineHt;
    // }


    //shearY(50)

    textTexture.text(paramText, graphicSize/2, graphicSize/2);
    texture (textTexture, width/2, height/2)

    // var inc = width/15;
    // translate(-width/2, -height/2);

    // for (i=0; i< 15; i++){
    //     translate(inc, inc)
      
    //     plane(width/5, width/5);
    //     inc += inc;
    // }

    

    //make it constantly rotate
   

    box (graphicSize/2, graphicSize/2)

}




//needs color
//maybe multi - lin
//widggle
