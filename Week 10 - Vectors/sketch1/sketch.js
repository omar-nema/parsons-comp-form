

//not used
function randColor(){
  return new Color({ hue: Math.random()*360, saturation: 1, brightness: .8 });
}

function generateRandomRect(size, x, y){
  var s = new Size(size*Math.random()*2,size*Math.random()*2);
  var c = new Point(x, y);
  var rect = new Rectangle(c, s);
  var path = new Path.Rectangle(rect);
  col = randColor();
  return path;
};

function generateRandomCircle(size, x, y){
  var s = new Size(size,size);
  var c = new Point(x, y);
  var path = new Path.Circle(c, s);
  col = randColor();
  return path;
}

var numRuns = 1000;
var shapeMax = 300;


function generateShapes(){
  var shapes = [];
  for (var i=0; i< numRuns; i++){
    r = generateRandomRect(Math.random()*shapeMax, Math.random()*500, Math.random()*500);
    shapes.push(r);
  }
  for (var i=0; i< numRuns; i++){
    r = generateRandomCircle(Math.random()*shapeMax, Math.random()*500, Math.random()*500);
    shapes.push(r)
  }
  return shapes;
}

function generateIntersectSet(){
  s = generateShapes();
  s2 = generateShapes();
  i2 = generateIntersections(s, s2);
  return i2;
}

function generateIntersections(s1, s2){
  var processed = [];
  for (var i=0; i<s1.length; i++){
    r1 = s1[i];
    for (var j=0; j< s2.length;j++){
      r2 = s2[j];
      if (r1.intersects(r2)){
        cp = r1.subtract(r2);
        processed.push(cp);
        s1.splice(i, 1);
        s2.splice(j, 1)
      }
    }
  }
  return processed;
}

function drawSet(s){
  console.log(s)
  for (var i =0; i<s.length; i++){
    shape = s[i];
    shape.style = {
      fillColor: new Color(0.2)
    }
  }
}

s =generateIntersectSet();
s2 =generateIntersectSet();
i = generateIntersections(s, s2)
drawSet(i);