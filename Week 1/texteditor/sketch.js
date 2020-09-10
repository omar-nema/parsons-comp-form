let margin = 30;
let xPos = margin;
let yPos = 35;
let lineht = 35;
var allText = [];

let scaleNum;
let col;
let rotateVal;
let shearVal;

function setup() {
    createCanvas(700, 400)   
    background(240);
    textSize(22);
    push();

    scaleNum = 1;
    col = color(0);
    rotateVal = 0;
    shearVal = 0;
 
}

function draw() {
    // if (e){
    //     text(e.key, xPos, yPos);
    // }
    if (yPos > 35){
        fill('white')
    }
  
    if (frameCount % 150 == 0){
        resetText();
    }


}

function getProb(num){
    if (Math.round(random(num)) === 0 ){
        return true;
    } else {
        return false;
    }
}


function applyNewWarp(){
    //rotateVal = PI/4;
    // col = color(random(255), random(255), random(255));
    //scaleNum = .8 + random(0.5);

    if (getProb(3)){
        col = color(random(255), random(255), random(255))
    }
    else {
        col = color(0);
    }

    //random val if shear
    if (getProb(3)){
        shearVal = PI /4;
    }
    else {
        shearVal = 0;
    }
    if (getProb(3)){
        rotateVal = PI /6;
    }
    else {
        rotateVal = 0;
    }   
    if (getProb(3)){
        scaleNum = 0.8 + random(0.5);
    }
    else {
        scaleNum = 1
    }   
    
}

function resetText(){
    col = color(240);
    col.setAlpha(240)
    noStroke();
    console.log(width)
    fill(col);
    rect(0,0,width, height)
    xPos = margin;
    yPos = lineht;
}

// Math.round(millis()/1000)



function keyTyped(e) { //ignores alt, backspace, etc
    // getWarping();

    if (e.key == ' '){
        applyNewWarp();
    }

    //apply transformations
    
    fill(col); 
    scale(scaleNum)
    rotate(rotateVal)
    shearX(shearVal)

    //draw text
    text(e.key, xPos, yPos);

    translate(500, 0);
    allText.push(e.key);    

    xPos += textWidth(e.key);
    if (xPos > width - margin) {
        xPos = margin;
        yPos += lineht;
    }
   
  }


  function shuffleText(){
    text(shuffle(allText).join(''), margin, lineht, width, height)
}
