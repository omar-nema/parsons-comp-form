
var handleIn = new Point(50, 50);
var handleOut = new Point(200, 100);

var pt1 = new Point(100, 50);
var seg1 = new Segment(pt1, null, null);

var pt2 = new Point(200, 200);
var seg2 = new Segment(pt2, handleIn, null);


var pt3 = new Point(300, 300);
var seg3 = new Segment(pt3, null, null);

// path = new Path({
//     segments: [new Point(20, 30), new Point(200, 300)],
//     strokeColor: 'red'
// })


pt1.strokeColor = 'red';
pt1.strokeWidth = 4;

path = new Path(seg1, seg2, seg3);
path.strokeColor = 'black';
path.strokeWidth = 3;