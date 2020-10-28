
function preload() {
   ///
}


var slider;
function setup() {
    // put setup code here - one time. no need 2 call
    createCanvas(800, 800)    
    background('245')

    slider = createSlider(15, 90, 45, 5);
    slider.position(10, 10);
    slider.style('width', '80px');
    runRecursion();

}


var lineht = 80;
var currSlider;

function draw() {
    slider.input(runRecursion)
}



function runRecursion(){
    console.log('starting recursion')
    angle = slider.value()
    angleMode(DEGREES);
    background('245')
    stroke('rgba(0,0,0,.2)')

    colors = []
    xval = width/2
    chgbit = 0.2;
    for (i=0; i< 10; i++ ){
        xval = xval + 2;
        push()
        if (i < 5){
            stroke('rgba(0,0,0,.2)');
        } else {
            stroke('rgba(0,0,0,.1)')
        }
        translate(xval, height/2);
        rotate(0)
        line(0,0,0, -lineht)
        translate(0,-lineht)
        branch(lineht,  angle)
        pop()
        console.log('one done')
    }  
}

function branch(ht, angle){

    ht *= .8;  
    if (ht > 5){

        push()
        rotate(-1*angle)
        line(0,0,0,-ht)
        translate(0, -ht)
        branch(ht, angle)
        pop()

        push()
        rotate(angle)
        line(0,0,0,-ht)
        translate(0, -ht)
        branch(ht, angle)
        pop();
       
       
        // rotate(90)
        // line(0,0,0,-lineht)
    
    }

 
}