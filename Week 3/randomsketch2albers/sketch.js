

function preload() {

}


let rows = 7;
let cols = 12;
let unitWidth, unitHeight;
let numStripes = 6;

let colors = [];

function setup() {
    createCanvas(500, 700) 
    background(240);
    unitWidth = width/cols;
    unitHeight = height/rows; 
}

function threeLineRect(width, height){

}

function lineRect(x, y){
    console.log(x,y)
    lineRect = [];
    if (y == 0){ //threel ines
        lineRect.push([0,0]);
        lineRect.push([unitWidth,0]);
        lineRect.push([unitWidth,unitHeight]);
        lineRect.push([0, unitHeight])
        return lineRect;
    } else if (y < rows){ //two lines
        lineRect.push([unitWidth,0]);
        lineRect.push([unitWidth,unitHeight]);
        lineRect.push([0, unitHeight])
        return lineRect;       
    } else if (y == rows){ //one line
        lineRect.push([unitWidth,unitHeight]);
        lineRect.push([0, unitHeight])     
    }
}


rectArray = [];

function draw() {
    noLoop();

    for (x=0; x < cols; x++){
        for (y=0; y < rows ; y ++){

            curveTightness(1.2);
            noFill();
            // strokeWeight(0.3)
            strokeWeight(0.3)
            beginShape()

            newRect = lineRect(x, y)

            // newRect = [];
            // newRect.push([0,0]);
            // newRect.push([unitWidth,0]);
            // newRect.push([unitWidth,unitHeight]);
            // newRect.push([unitWidth,unitHeight]);
            // newRect.push([0, unitHeight])

            xVal = unitWidth*x; 
            yVal = unitHeight*y;
     
            push()
            translate(xVal, yVal)
            beginShape();
            newRect.forEach(e => vertex(e[0],e[1]))
            endShape();
            pop();

        
            // xVal = unitWidth*x; 
            // yVal = unitHeight*y;
            // console.log('uh')
            // push()
            // fill('white')
            // translate(xVal, yVal)
            // rect(0, 0, unitWidth, unitHeight)
           
            
            // //add stripes (sometimes)
            // if (random(10) > 3){
            //     for (i = 0; i < numStripes; i++){
            //         fill(random(255))
            //         ht = unitHeight/numStripes;
            //         rect(0,0, unitWidth, ht)
            //         translate(0, ht);
            //     }
            // }
            // pop()
        }
    }
}
