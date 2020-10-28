let imgBaseFace;
let faceWidth = 350;
let sliderHair, sliderBrow, sliderEyes, sliderNose, sliderAcc, sliderFill, sliderMouth, sliderFace;
var paramHair, paramBrow, paramEyes, paramNose, paramAcc, paramFill, paramMouth, paramFace;
let eyes, nose, mouth, faces;

function preload() {

    // imgBaseFace = loadImage('assets/face2.png');

    face1 = loadImage('assets/facebrush.png');
    face2 = loadImage('assets/face2.png');
    face3 = loadImage('assets/face3.png');
    face4 = loadImage('assets/face4.png');

    hair1 = loadImage('assets/hair1.png');
    hair2 = loadImage('assets/hair2.png');
    hair3 = loadImage('assets/hair3.png');
    hair4 = loadImage('assets/hair4.png')
    eyes1 = loadImage('assets/eyes1.png');
    eyes2 = loadImage('assets/eyes2.png');
    eyes3 = loadImage('assets/eyes3.png');
    eyes4 = loadImage('assets/eyes4.png');
    nose1 = loadImage('assets/nose1_1.png');
    nose2 = loadImage('assets/nose2.png');
    nose3 = loadImage('assets/nose3.png');
    nose4 = loadImage('assets/nose4.png');
    mouth1 = loadImage('assets/lips1.png');
    mouth2 = loadImage('assets/lips2.png');
    mouth3 = loadImage('assets/lips3.png');
    mouth4 = loadImage('assets/lips4.png');

    eyes = [eyes1, eyes2, eyes3, eyes4];
    nose = [nose1, nose2, nose3, nose4];
    mouth = [mouth1, mouth2, mouth3, mouth4];
    hair = [hair1, hair2, hair3, hair4]
    faces = [face1, face2, face3, face4];
}

let faceWidthOffset = 50;

function sliderLabels(){
    let sliderY = 20;
    sliderY += 70;
    text('Hair', faceWidth+faceWidthOffset, sliderY)
    sliderY += 70;
    text('Face', faceWidth+faceWidthOffset, sliderY)
    sliderY += 70;
    text('Eyes', faceWidth+faceWidthOffset, sliderY)
    sliderY += 70;
    text('Nose', faceWidth+faceWidthOffset, sliderY)
    sliderY += 70;
    text('Mouth', faceWidth+faceWidthOffset, sliderY)
}


function createSliders(){
    textStyle(BOLD)
    let sliderY = 20;
    
    sliderFill = createColorPicker('#FFFFFF');
    sliderFill.position(faceWidth+faceWidthOffset, sliderY+20)

    sliderY += 70;
    text('Hair', faceWidth+faceWidthOffset, sliderY)
    sliderHair = createSlider(0,3, parseInt(random(0, 3)),1)
    sliderHair.style('width', '100px')
    sliderHair.position(faceWidth+faceWidthOffset, sliderY+20)

    sliderY += 70;
    text('Face', faceWidth+faceWidthOffset, sliderY)
    sliderFace = createSlider(0,3, parseInt(random(0, 3)),1)
    sliderFace.style('width', '100px')
    sliderFace.position(faceWidth+faceWidthOffset, sliderY+20)

    sliderY += 70;
    text('Eyes', faceWidth+faceWidthOffset, sliderY)
    sliderEyes = createSlider(0,3, parseInt(random(0, 3)),1)
    sliderEyes.style('width', '100px')  
    sliderEyes.position(faceWidth+faceWidthOffset, sliderY+20)  

    sliderY += 70;
    text('Nose', faceWidth+faceWidthOffset, sliderY)
    sliderNose = createSlider(0,3, parseInt(random(0, 3)),1)
    sliderNose.style('width', '100px')  
    sliderNose.position(faceWidth+faceWidthOffset, sliderY+20)     

    sliderY += 70;
    text('Mouth', faceWidth+faceWidthOffset, sliderY)
    sliderMouth = createSlider(0,3, parseInt(random(0, 3)),1)
    sliderMouth.style('width', '100px')  
    sliderMouth.position(faceWidth+faceWidthOffset, sliderY+20)     
}


function setup() {
    createCanvas(700, 700)  
    background(255 ); 
    createSliders();  
    angleMode(DEGREES)
}

function updateImgValues(){
    //paramHair = hair[sliderHair.value()];
    // paramBrow = 'brow' + str(sliderBrow.value());
    // paramAcc = 'acc' + str(sliderAcc.value());

    paramFace = faces[sliderFace.value()]
    paramHair = hair[sliderHair.value()];
    paramEyes=  eyes[sliderEyes.value()];
    paramNose = nose[sliderNose.value()];
    paramMouth = mouth[sliderMouth.value()];


    paramFill =  color(sliderFill.value());
}

var currAngle = 0;

function draw() {

    background(255); 
    sliderLabels();
    updateImgValues();

        // rotate(currAngle)
    // currAngle += .09;


    paramFace.width = 300;
    tint(paramFill) ;
    image (paramFace, 30, 60);


    if (paramHair == hair1){
        image (paramHair, 14, 20)
    } else if (paramHair == hair2) {
        image (paramHair, -10, 0)
    } else if (paramHair == hair3){
        image (paramHair, 0, 0)
    } 
    

    image (paramEyes, 113, 215)
    image(paramNose, 175, 305)
    image(paramMouth, 155, 405)
}
