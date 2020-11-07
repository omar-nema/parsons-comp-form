

function createCurve(pt1, length, anchorOffset, curveOffset){


    anchorOffset = -1*anchorOffset;
    curveOffset = -1*curveOffset;

    //pts
    pt3 = pt1 + length;
    pt2 = new Point();
    pt2.x = pt1.x + length/2 - anchorOffset;
    pt2.y = pt1.y + length/2 + anchorOffset;
   
 
    //segments
    var seg1 = new Segment(pt1, null, new Point(-curveOffset*.9, curveOffset));
    var seg2 = new Segment(pt2);
    var seg3 = new Segment(pt3, new Point(-curveOffset, curveOffset*.8), null);



    //curve
    var curve = new Path(seg1, seg2 ,seg3);
    curve.style = {
        // strokeColor: 'white',
        strokeWidth: 0.4,
        // dashArray: [3,3],
        strokeColor: {
            gradient: {
                stops: ['white',  'blue']
            },
            origin: pt1,
            destination: pt3 
        }
        
    }

}


// var anchorOffset = 50;
// var length = 200;
// var curveOffset = 50;
// createCurve(pt1, length, anchorOffset, curveOffset)


var pt1 = new Point(50, 50);
var length = 350;
var anchorOffset = 0;
var curveOffset = 0;
var numRuns = 60;
var incAmount = 100/numRuns;
for (var i=0; i<numRuns; i++){
    createCurve(pt1, length, anchorOffset, curveOffset);
    curveOffset += incAmount;
    anchorOffset += incAmount;
}



// var pt3 = new Point(300, 100);
// var pt2 = (pt3 - pt1)/2 + pt1 - 50;



// var seg1 = new Segment(pt1, null, new Point(-60,-60));
// r = new Rectangle(pt1 - 1.5, new Size(3,3));
// p = new Path.Rectangle(r);
// p.fillColor = 'black';

// var seg3 = new Segment(pt3, new Point(-60, -60), null);
// r3 = new Rectangle(pt3 - 1.5, new Size(3,3));
// p3 = new Path.Rectangle(r3);
// p3.fillColor = 'red';



// var handleIn = new Point(50, 50);
// var handleOut = new Point(200, 100);
// var seg2 = new Segment(pt2, null, null);
// r2 = new Rectangle(pt2 - 1.5, new Size(3,3));
// p2 = new Path.Rectangle(r2);
// p2.fillColor = 'blue';



// path = new Path(seg1, seg2, seg3);
// path.strokeColor = 'black';
// path.strokeWidth = 1;

//constrain curve to be a bit less than anchor pt

