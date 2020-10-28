

function preload() {

}


function setup() {
    createCanvas(700, 700)   
    background(0)

    noStroke(); 


}

function drawRect(){
    push()
    shearY(PI / random(30, 40))
    shearX(PI / random(0, 40))

    fill(random(255), random(150, 200))
    rect(random(0, width), random(0, height),30, 170);
    pop()
}


function anotherRect(){
    push()
    shearX(PI / random(60, 70))
    rotate(PI / random(1, 4))

    fill(random(255), 0, 0, random(150, 200))
    rect(random(0, width), random(0, height),30, random(170, 190));
    pop()
}
function anotherRect2(){
    push()
    shearY(PI / random(60, 70))
    rotate(-PI / random(1, 4))

    fill(random(255), 0, 0, random(150, 200))
    rect(random(width/2, width), random(0, height),30, random(300));
    pop()
}

function draw() {

    shearX(PI/60)

    noLoop()

    blendMode(BLEND )
    // randomSeed(10)

    for (i=0; i< random(5, 30); i++){
        drawRect();
        anotherRect()
        anotherRect2()
    }

    

    // push()
    // shearY(PI / 40)
    // fill(random(255), random(255), random(255), 230)
    // rect(width/3, height/3, 120, 170);
    // pop()

}
