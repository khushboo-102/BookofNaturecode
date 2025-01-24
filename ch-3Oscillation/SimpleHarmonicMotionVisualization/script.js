function setup() {
    createCanvas(500, 500); // Create a 500x500 canvas
  }
  
  function draw() {
    background(229,204,255); // Set the background color
    let period = 120; /// The period of oscillation
    let amplitude = 200; // The maximum displacement from the center
  // Calculate the horizontal position (x) using the formula for simple harmonic motion
     let x = amplitude * sin(TWO_PI * frameCount / period);   // sin(TWO_PI * frameCount / period) oscillates between -1 and 1
    stroke(0);
    fill(127); /// Set the fill color for the circle
      // Translate the origin (0, 0) to the center of the canvas
    translate(width / 2, height / 2);
    // Draw a line from the center of the canvas to the current x position
    line(0, 0, x, 0);
     // Draw a circle at the calculated x position with diameter 48
    circle(x, 0, 48);
  }