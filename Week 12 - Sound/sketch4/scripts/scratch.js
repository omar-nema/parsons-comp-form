
   //create a person
   {
    push ();
    rotateX(90)

    ambientMaterial(255)
    normalMaterial();
    noStroke();
    
    sphere(30);

    // translate(0, -30, 0)
    // cylinder(3, 20, 6, 6)

    // {
    //   push();
    //   rotateX(90)
    //   translate(0,10,0);
    //   cylinder(3, 20, 6, 6)
    //   pop();
    // }

    // {
    //   push();
    //   rotateX(90)
    //   translate(0,-10,0);
    //   cylinder(3, -20, 6, 6)
    //   pop();
    // }

   

  

    pop ();

    
    

   }


   
   //create horizon grid
  // {
  //   let scl = 16;
  //   let unitWidth = width/scl;
  //   let unitHt = height/scl;
  //   push ()
  //   noFill()
  //   strokeWeight(0.5)
  //   stroke(140)    
  //   translate(-width/2, -height/2, -100)
  //  //  translate(-rectW/2, -rectH/2, -100)
  //   for (var y=0; y<scl; y++){
  //       for (var x=0; x<scl; x++){
  //           strokeWeight(1)
  //           rect(x*unitWidth, y*unitHt, unitWidth, unitHt)
  //       }
  //   }
  //   pop()
  //  }