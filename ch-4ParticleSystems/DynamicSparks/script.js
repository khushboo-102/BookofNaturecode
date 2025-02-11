let particles = []; // Array to store particles
let emitter; // The emitter object

function setup() {
  createCanvas(600, 400);//create a canvas 600X400 pixels
  emitter = new Emitter(width / 2, height / 2); // Create an emitter at the center
}

function draw() {
  background(0);
  
  // Update and display the emitter
  emitter.update();
  emitter.show();
  
  // Add new particles at the emitter's position
  particles.push(new Particle(emitter.pos.x, emitter.pos.y));
  
  // Update and display all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    
    // Remove particles that have faded away
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

// Update emitter position when the mouse is pressed
function mousePressed() {
  emitter.pos.set(mouseX, mouseY);
}

// Class representing the emitter
class Emitter {
  constructor(x, y) {
    this.pos = createVector(x, y); // Position of the emitter
    this.vel = createVector(0, 0); // Velocity
    this.acc = createVector(0, 0.1); // Gravity-like acceleration
  }
  
  update() {
    this.vel.add(this.acc); // Apply acceleration to velocity
    this.pos.add(this.vel); // Apply velocity to position
    
    // Bounce off the bottom edge with damping
    if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -0.8; // Reverse and reduce velocity
    }
  }
  
  show() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 10); // Draw emitter as a red circle
  }
}

// Class representing individual particles
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y); // Position
    this.vel = p5.Vector.random2D().mult(random(1, 3)); // Random velocity
    this.alpha = 255; // Transparency level
  }
  
  update() {
    this.pos.add(this.vel); // Move particle
    this.alpha -= 5; // Reduce transparency
  }
  
  finished() {
    return this.alpha < 0; // Check if particle is fully faded
  }
  
  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.pos.x, this.pos.y, 8); // Draw fading particle
  }
}
