
var numPts = 100;
var range = 6;
var maxChg = 10;
var pts = []
var centerPts = [];
var numScribbles = 6;

maxPts = 500;
var numPts = [(1/30)*maxPts,(2/15)*maxPts, (8/30)*maxPts, maxPts/3 ,maxPts/2, maxPts];


function preload() {

}


function setup() {
    createCanvas(1000, 800)   
    background(240)
    //create center of each scribble drawing. this can definitely be done more generatively.
    for (i=0; i< numScribbles; i++){
        centerPts.push([]);
        centerPts[i][0] = width/(numScribbles)*i + 50;
        centerPts[i][1] = height /2;
    }
    console.log(centerPts)
    pts[0] = [width/2, height/2]
    //generate scribble at each centerpt
    centerPts.forEach(function(j,i){
        var scribble = [];
        scribble.push([]);
        scribble[0][0] = centerPts[i][0];
        scribble[0][1] = centerPts[i][1];
        currPts = numPts[i];

        for (i = 1; i < currPts; i++){
            scribble.push([]);
            scribble[i][0] = scribble[i-1][0] + random(maxChg)*Math.pow(-1, parseInt(random(10)));
            scribble[i][1] = scribble[i-1][1] + random(maxChg*1.3)*Math.pow(-1, parseInt(random(10)));
        }
        pts.push(scribble);
    })

    console.log(pts)
}

//referenced code: https://editor.p5js.org/natureofcode/sketches/Bk9KyuDul
function draw() {

    pts.forEach(function(scribble,j){
        for (i= 0; i < scribble.length-1; i++){
            line(scribble[i][0], scribble[i][1], scribble[i+1][0], scribble[i+1][1] )
        }
    })



    
}
