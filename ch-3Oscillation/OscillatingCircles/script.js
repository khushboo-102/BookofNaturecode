 let angles = [];  // Array to store the angles for each circle's movement
 let angleV = 0.05 // Angular velocity to control the speed of oscillation
 let r = 10;  // Radius of the circles
 function setup(){
    createCanvas(600,400) // Set up the canvas (600x400)
    let total = floor (width / (r * 2)); // Calculate the total number of circles based on canvas width
    for (let i = 0; i < total ; i ++){
        angles[i] = 0;  // Initialize the angle array to 0 for each circle
    }
 }
 function draw (){
    background(204,229,255)  // Set background color
    translate(300,200);   // Move the origin to the center of the canvas
    fill(252,238,33);  // Set the color for the circles
    stroke("black"); // Set the stroke color for the circles
        // Loop through all the circles and draw them
    for (let i =0; i<angles.length; i++){
         let y = map(sin(angles[i]), -1.5,1.5,-200,200) // Map the sin wave to oscillate the circles vertically
         strokeWeight(2);// Set the stroke weight to 4 for line thickness
         let x = map(i,0,angles.length,-300,300); // Map the index to the x-axis for spacing the circles evenly
         line(x,0,x,y) // Draw the line from the center to the current y position
         circle(x,y,r*2); // Draw the circle at the calculated (x, y) position 
         angles[i] += angleV; // Increment the angle to update the position of the oscillation
      }

    }
 