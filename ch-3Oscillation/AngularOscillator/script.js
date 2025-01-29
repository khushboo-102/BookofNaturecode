let oscillator;

function setup() {
  createCanvas(600, 400); // Set canvas size
  oscillator = new Oscillator(); // Create an oscillator object
}

function draw() {
  background(220); //set the background color
  oscillator.update(); // Update the oscillator's motion
  oscillator.show();
}

class Oscillator {
  constructor() {
    this.angle = createVector(PI / 4, PI / 6);     // Initialize angle for oscillation in x and y directions
    this.angularVelocity = createVector(0, 0); // Initial angular velocity
    this.angularAcceleration = createVector(0, 0); // Initial angular acceleration
    this.amplitude = createVector(150, 100);    //  oscillation amplitude for x and y directions
  }

  update() {
    // Apply some arbitrary angular acceleration based on noise for demonstration
    this.angularAcceleration.x = map(noise(frameCount * 0.01), 0, 1, -0.01, 0.01);
    this.angularAcceleration.y = map(noise(frameCount * 0.02), 0, 1, -0.01, 0.01);
    // Update angular velocity with acceleration
     this.angularVelocity.add(this.angularAcceleration);
         // Constrain angular velocity to prevent excessive motion
    this.angularVelocity.limit(0.2); 

        // Update the angle based on angular velocity
    this.angle.add(this.angularVelocity);
  }

  show() {
    // Calculate the position based on angle and amplitude
    let x = sin(this.angle.x) * this.amplitude.x;
    let y = sin(this.angle.y) * this.amplitude.y;

    // Draw the oscillator object
    translate(width / 2, height / 2);     // Move the origin to the center of the canvas
    stroke(0);
    fill(127);
    line(0, 0, x, y);
    ellipse(x, y, 32, 32);
  }
}
