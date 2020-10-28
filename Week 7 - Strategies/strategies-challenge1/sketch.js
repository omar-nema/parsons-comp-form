// Dot Challenge Starting Point

function setup() {
    createCanvas(400, 400);
    randomSeed(1);
    background(50);
    colorMode(HSB);
}

//purple x 3
//pink x
//green x
//green, yellow, purple dark, purple bright, blue dark, blue light, baby blue

//relationship b/w size and color

function draw() {

    noLoop();
    noStroke();
    ellipseMode(CENTER);


    var noiseFrequency = .02;

    for (var i = 0; i < 100; i++) {
        // these points are not scattered in the same way
        // how can you make the arrangement match the challenge?


        var x = (random(40, width-35)+random(50, width-35))/2 ;
        var y = (random(45, height-50)+random(30, height-40))/2;



        var diamMin = 7;
        var diamMax=  18;
        if (i > 50){
            diamMax= 14;
        }         
        //var diamCurr = min(random(diamMin, diamMax),random(diamMin, diamMax) ) ;
        var diamCurr = random(diamMin, diamMax)

     
        var hueRangeMin = 40;
        var hueRangeMax = 310;

        ///var colorMapped = color(random(hueRangeMin, hueRangeMax), 100, 100)
        var currHue =  map(diamCurr, diamMin, diamMax+1, hueRangeMin, hueRangeMax);
        var currColor = color(currHue, 100, 100);

        fill(currColor)
    

        circle(x, y, diamCurr);
    }


    noLoop();


}