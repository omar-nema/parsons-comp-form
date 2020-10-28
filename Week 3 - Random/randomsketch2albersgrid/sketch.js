

function preload() {

}


// let rows = 7;
// let cols = 12;

let rows = 3;
let cols = 3;

let unitWidth, unitHeight;
let numStripes = 6;
let colors = [];
var rectArray = [];

function setup() {
    createCanvas(500, 700) 
    background(240);
    unitWidth = width/cols;
    unitHeight = height/rows; 
}

function lineRect(x, y){
    rect = [];
    if (y == 0){ //three lines
        rect.push([0,0, 'topLeft']);
        rect.push([unitWidth,0, 'topRight']);
        rect.push([unitWidth,unitHeight, 'bottomRight']);
        if (x == 0){
            rect.push([0, unitHeight, 'bottomLeft'])
        } else {
            //console.log(rectArray)
            rectArray.push(rectArray[x-1][y])
        }
        console.log(rect)
        return rect;
    } 
    // else if (y < rows){ //two lines
    //     rect.push([unitWidth,0, 'topRight']);
    //     rect.push([unitWidth,unitHeight, 'bottomRight']);
    //     rect.push([0, unitHeight, 'bottomLeft'])
    //     return rect;       
    // } else if (y == rows){ //one line
    //     rect.push([unitWidth,unitHeight, 'topRight']);
    //     rect.push([0, unitHeight, 'topLeft'])     
    // }
}

function getOffset(xindex, yindex){
    if (yindex == 0){
        return [0,0];
    }
    else {
        rectAbove = rectArray[xindex][yindex-1];
        botRight = rectAbove.filter(e => e[2] == 'bottomRight')[0];
        return [botRight[0] - unitWidth, botRight[1] - unitHeight]        
    }
}




function draw() {
    noLoop();

    for (x=0; x < cols; x++){
        rectArray.push([])
        for (y=0; y < rows ; y ++){

            rectArray[x].push([])
            noFill();
            // strokeWeight(0.3)
            strokeWeight(0.3)
            beginShape()

            newRect = lineRect(x,y)
            rectArray[x][y] = (newRect);

           // console.log(rectArray)

            xVal = unitWidth*x; 
            yVal = unitHeight*y;
            // offset = getOffset(x, y)

            push()
            //translate(xVal + offset[0], yVal + offset[1])
            beginShape();
            // newRect.forEach(e => vertex(e[0],e[1]))
            endShape();
            pop();
         
            
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
