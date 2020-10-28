var angle = 0;
var r = 0;
var angleGrowFactor = 0.05;
var r = 10;
var rGrowFactor = 0.5;
var offset = 50;
var transp = 120;

function preload() {

}

function setup() {
    createCanvas(700, 700)   
    background(0);

    // stroke('white')
    // strokeWeight(1)
    // curve(0, height/2, width/4, 0,  width/2, height*3/4, width, height/2) 
    // noLoop();
}

// var circlePts= [];

function draw() {

    col = color(255);
    col.setAlpha(transp);

    stroke('rgba(0,0,0,.1)')
    fill(col);

    x  = r*cos(angle) +random(r/20); 
    y = r*sin(angle) +random(r/20);
    translate(width/2, height/2)

    //attempt at introducing curves
    // if (circlePts.length > 1){
    //     circlePts.shift();
    //     circlePts.push([x, y])
    //     stroke('white')
    //     fill('white')
    //     curve(circlePts[0][0], circlePts[0][1], circlePts[1][0], circlePts[1][1])    
        
    // }
    // else {
    //     circlePts.push([x, y])
    // }


    circle(x + x*random(0.1),y + y*random(0.1), random(10))
    circle(x+x*random(0.1),y+y*random(0.1), random(10))
    circle(x*0.8, y*0.95, random(10))
    circle(x*1.5,y*1.15, random(2))
    circle(x*1.3,y*1.2, random(4))

    angle += angleGrowFactor;
    r += rGrowFactor;
    transp-= 0.05;

    rotate(5)

  
}
