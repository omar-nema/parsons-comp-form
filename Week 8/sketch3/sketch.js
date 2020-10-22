

turtleCommandHolder = [];
var numTurtles = 6;
var minCommands = 100;
var maxCommands = 900;
var maxInc = 0;


function setup() {
    createCanvas(600, 500, WEBGL)   
    background(0)
    angleMode(RADIANS);
    colorMode(HSB);
    for (var i=0; i< numTurtles; i++){
        var newCommands = generateTurtleCommands(random(minCommands, maxCommands));
        var newCommandObj = {
            commands: newCommands,
            color: color(random(0, 360), 90, 80),
            startX: random(-width*.3, width*.3),
            startY: random(-height*.3, height*.3),
            startZ: random(-40, 40)
        }
        turtleCommandHolder.push(newCommandObj);
    }
}

function generateTurtleCommands(numCommands){
    var turnTypes = ['left', 'right', 'up'];
    var angles = [-90, 90];
    var turtleCommands = [];
    for (i=0; i<numCommands; i++){
        var sign = Math.random() < 0.5 ? -1 : 1;
        var turn = random(turnTypes);
        var angle = random(angles);
        var amt = random(20, 50);
        turtleObj = {
            direction: turn,
            angle: angle,
            amount: amt*sign
        }
        turtleCommands.push(turtleObj)
    }
    return turtleCommands;
}


function drawPipe(turtle, command){
    if (command.direction == 'left'){
        turtle.turnLeft(command.angle)
        turtle.moveForward(command.amount);
    } else if (command.direction == 'right'){
        turtle.turnRight(command.angle)
        turtle.moveForward(command.amount);
    } else if (command.direction == 'up'){
        turtle.moveUp(command.amount)
    }
}

function draw() {

    rotateX(radians(60))
    rotateZ(radians(20))
    strokeWeight(1)
    turtleCommandHolder.forEach((d,i) => {
        t = new Turtle(d.startX,d.startY,d.startZ);
        stroke(d.color);
        for (var ind=0; ind< min(maxInc, d.commands.length); ind++){
            drawPipe(t, d.commands[ind]);
        }
      
    })
    if (maxInc < maxCommands){
        maxInc ++;
    }
}
