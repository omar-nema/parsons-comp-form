
// var c = new Point(100,100)
// var r  = new Rectangle(new Point(100,100), new Size(200, 200));
// var rectpath =  new Path.Rectangle(r);
// rectpath.strokeColor = 'red';


function generateRandomRect(size, x, y){
  var s = new Size(size,size);
  var c = new Point(x, y);
  var rect = new Rectangle(c, s);
  var path = new Path.Rectangle(rect);
  col = new Color(Math.random(), Math.random(), Math.random())
  path.style = {
    strokeColor: 'red',
    fillColor: col
  }
  return path;
}

r1 = generateRandomRect(50, Math.random()*500-50, Math.random()*500-50);
r2 = generateRandomRect(50, Math.random()*500-50, Math.random()*500-50);

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

