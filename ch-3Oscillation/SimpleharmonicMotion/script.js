let angle = 0;// Initial angle for the oscillating motion
let angleVelocity = 0.05; // Angular velocity controls how fast the angle changes

function setup() {
  createCanvas(640, 440); /// Create a canvas
}

function draw() {
  background(204,204,255); // Set the background color
  let amplitude = 200; // Define the amplitude (maximum displacement) of the oscillation
  let x = amplitude * sin(angle); //Use the sine function to calculate the x-position for oscillation
  angle += angleVelocity;
  translate(width / 2, height / 2); // Move the origin of the canvas to its center
  stroke(0);
  fill(127);
  line(0, 0, x, 0); // Draw a line from the center to the current x-position
  circle(x, 0, 48);// Draw a circle at the current x-position
}