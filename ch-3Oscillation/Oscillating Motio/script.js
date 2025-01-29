let oscillator; // Declare an oscillator object

function setup() {
  createCanvas(600, 400); // Create a canvas of size 600x400
  oscillator = new Oscillator(); // Initialize the oscillator object
}

function draw() {
  background(220); // set the background color
  oscillator.update(); // Update the oscillator's motion
  oscillator.display(); // Render the oscillator
}

class Oscillator {
  constructor() {
    this.angle = 0; // Initial angle of oscillation
    this.angularVelocity = 0; // Initial angular velocity
    this.angularAcceleration = 0.002; // Small constant angular acceleration
    this.amplitude = 200; // Maximum displacement from center
  }

  update() {
    // Increase angular velocity based on angular acceleration
    this.angularVelocity += this.angularAcceleration;

    // Update the angle based on velocity
    this.angle += this.angularVelocity;

    // Apply damping (friction effect) to reduce speed gradually
    this.angularVelocity *= 0.99;
  }

  display() {
    // Compute the y-coordinate using a cos wave for smooth oscillation
    let y = cos(this.angle) * this.amplitude;
    let x = 0; // Motion occurs only along the X-axis

    // Move the coordinate system to the center of the canvas
    translate(width / 2, height / 2);

    // Draw the oscillator arm (line from center to moving point)
    stroke(0);
    line(0, 0, x, y);

    // Draw the oscillating object as a circle
    fill(127);
    ellipse(x, y, 32, 32);
  }
}
