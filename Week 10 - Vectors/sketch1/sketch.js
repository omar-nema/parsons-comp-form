
// var c = new Point(100,100)
// var r  = new Rectangle(new Point(100,100), new Size(200, 200));
// var rectpath =  new Path.Rectangle(r);
// rectpath.strokeColor = 'red';


function randColor(){
  return new Color({ hue: Math.random()*360, saturation: 1, brightness: .8 });
}

function generateRandomRect(size, x, y){
  var s = new Size(size*Math.random()*2,size*Math.random()*2);
  var c = new Point(x, y);
  var rect = new Rectangle(c, s);
  var path = new Path.Rectangle(rect);
  col = randColor();

  // path.style = {
  //   fillColor: new Color(0.5, .1)
  // }
  return path;
};

function generateRandomCircle(size, x, y){
  var s = new Size(size,size);
  var c = new Point(x, y);
  var path = new Path.Circle(c, s);
  col = randColor();

  // path.style = {
  //   fillColor: new Color(0.5, .02)
  // }
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





//create one set of intersections
//another set of intersections
//intersect them




        // cp.style = {
        //   //strokeColor: 'black',
        //   // shadowColor: new Color(0, 0, 0, .5),
        //   // shadowBlur: 12,
        //   // shadowOffset: new Point(5, 5),
        //   // fillColor: 'black'
        //   fillColor: new Color(.1)
        // };
//copy the array;

// var p = shapes;
// for (var i=0; i < 100; i++){
//   console.log(p)
//   p = processIntersections(p);
// }

// for (var i=0; i<shapes.length; i++){
//   p = shapes[i];
//   p.style = {
//     fillColor: new Color(0.1, 0.1)
//   }
// };

//sequqntial subrtraction



//unite, subtract, intersect

//generateRandomCircle(Math.random()*100, Math.random()*500-50, Math.random()*500-50);


// fillColor: {
//   stops: ['blue', 'green', 'black', 'red'],
//   origin: c - [size/2, size/2],
//   destination: c + [size/2, size/2],
// }

// cp = r1.subtract(r2);
// cp.style = {
//   strokeColor: 'black',
//   shadowColor: new Color(0, 0, 0, .5),
//   shadowBlur: 12,
//   shadowOffset: new Point(5, 5),
//   fillColor: 'green'
// };
// generateRandomRect(50, Math.random()*500-50, Math.random()*500-50);

// create the red, rotated square
// var rectangle1 = new Rectangle(new Point(100, 100), new Size(300, 300));
// var path1 = new Path.Rectangle(rectangle1);
// path1.strokeColor = 'red';
// path1.rotate(45);

//subtract
// intersect(rect)
// unite(rect)
// include(point)
// expand(amount)
// expand(hor, ver)
// scale(amount)
// scale(hor, ver)

// cp = path1.intersect(rectpath);



//style props
//http://paperjs.org/reference/style/


//concept. 1x maximal. 1x minimal.

