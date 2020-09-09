var angle = 0;
var r = 0;
var angleGrowFactor = 0.2;
var r = 3;
var rGrowFactor = 0.2;
var offset = 50;
var transp = 50;

function preload() {

}

function setup() {
    createCanvas(700, 700)   
    background(0);

    // stroke('white')
    // strokeWeight(1)
    // noFill();
    //arc(width/4, height/ 2, width/2, height/2, 0, PI)  //down
    //arc(width/4, height/ 2, width/2, height/2, PI, 2*PI) //up
    // curve(0, height/2, width/4, 0,  width/2, height*3/4, width, height/2) 
   
}

var circlePts= [];

var dir = 'down';

function draw() {

    col = color(255);
    col.setAlpha(transp);
    noFill();

    //stroke('rgba(0,0,0,.1)')
    // fill(col);

    x  = r*cos(angle); 
    y = r*sin(angle) ;
    translate(width/2, height/2)
    
    
    if (circlePts.length > 1){
        circlePts.shift();
        circlePts.push([x, y])
        stroke(col)
       
        //line(circlePts[0][0], circlePts[0][1], circlePts[1][0], circlePts[1][1])    
        arc(circlePts[0][0], circlePts[0][1], circlePts[1][0], circlePts[1][1], 0, 2*PI);
        
        // if (dir == 'up'){
        //     arc(circlePts[0][0], circlePts[0][1], circlePts[1][0], circlePts[1][1], PI, 2*PI);
        //     dir = 'down';
        // }
        // else if (dir == 'down'){
        //     arc(circlePts[0][0], circlePts[0][1], circlePts[1][0], circlePts[1][1], 0, PI);
        //     dir == 'up';
        // }
    }
    else {
        circlePts.push([x, y])
    }

    // circle(x + x*random(0.1),y + y*random(0.1), random(10))

    angle += angleGrowFactor;
    r += rGrowFactor;
    transp += 0.1;


  
}
