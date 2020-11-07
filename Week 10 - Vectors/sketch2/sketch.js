

function createCurve(pt1, length, anchorOffset, curveOffset, rAngle){

    anchorOffset = -1*anchorOffset;
    curveOffset = -1*curveOffset;

    //pts
    pt3 = pt1 + length;
    pt2 = new Point();
    pt2.x = pt1.x + length/2 - anchorOffset;
    pt2.y = pt1.y + length/2 + anchorOffset;
   
    //segments
    var seg1 = new Segment(pt1, null, new Point(-curveOffset, curveOffset));
    var seg2 = new Segment(pt2);
    var seg3 = new Segment(pt3, new Point(-curveOffset, curveOffset), null);

    //curve
    var curve = new Path(seg1, seg2 ,seg3);
    curve.style = {
        // strokeColor: 'white',
        strokeWidth: 0.1,
        // dashArray: [2,2],
        strokeColor: {
            gradient: {
                stops: ['white', '#E617B3','#A917E6', 'black', '#A917E6']
            },
            origin: pt1,
            destination: pt3 
        }
        
    }
   
}

function addCurveShape(pt1, length){
    var anchorOffset = 0;
    var curveOffset = 0;
    var numRuns = 40;
    var incAmount = 100/numRuns;
    for (var i=0; i<numRuns; i++){
        createCurve(pt1, length, anchorOffset, curveOffset);
        curveOffset += incAmount*.8;
        anchorOffset += incAmount;
    }
    for (var i=0; i<numRuns; i++){
        createCurve(pt1, length, -anchorOffset, -curveOffset);
        curveOffset -= incAmount*.8;
        anchorOffset -= incAmount;
    }
}

// addCurveShape(new Point(100, 100), 300);

for (var i=0; i<40;i++){
    addCurveShape(new Point(Math.random()*500-300,Math.random()*500-100), 300);
}