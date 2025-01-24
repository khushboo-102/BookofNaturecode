function setup() {
  createCanvas(400, 400); // Create a 400x400 canvas
}

function draw() {
  background(229, 229, 255); // set the background color 

  let period = 120;   // Time for one full oscillation cycle
  let amplitude = 100;  // Maximum displacement of the bob from the equilibrium position
  let centerY = height / 4; // top anchor point for the spring (anchor:the fixed point at the top of the spring)
  let x = width / 2; // Horizontal position of the spring and circle

  // Calculate the sine wave value for oscillation 
  let oscillation = sin(TWO_PI * frameCount / period);

  let y = map(oscillation, -1, 1, centerY, centerY + amplitude);

  // Draw the line
  stroke(100);
  strokeWeight(2);
  line(x, centerY, x, y);

  // Draw the circle
  fill(127);
  noStroke();
  ellipse(x, y, 40);

}
