let particles = []; // Array to store all particles

function setup() {
  createCanvas(600, 300); // Create a 600x240 pixel canvas
}

function draw() {
  background(204,204,255); // Set background 
  particles.push(new Particle(300, 20)); // Add a new particle at the top center

  // Loop through particles array in reverse to update and remove dead particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.applyForce(createVector(0, 0.1)); // Apply a gravity
    particle.run(); // Update and display the particle

    if (particle.isDead()) {
      particles.splice(i, 5); // Remove particles that have faded out
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y); // Position of the particle
    this.vel = createVector(random(-1, 1), random(-1, 1)); // Random initial velocity
    this.acc = createVector(0, 0); // Acceleration starts at zero
    this.r = 6; // Radius of the particle
    this.lifetime = 300; // Lifetime for fading effect
  }

  // Apply a force to the particle (e.g., gravity)
  applyForce(force) {
    this.acc.add(force);
  }

  // Update position, velocity, and fade out the particle over time
  update() {
    this.vel.add(this.acc); // Add acceleration to velocity
    this.pos.add(this.vel); // Add velocity to position
    this.acc.set(0, 0); // Reset acceleration to prevent accumulation
    this.lifetime -= 2; // Reduce lifetime for fading effect
    this.edges(); // Check for collisions with edges
  }

  // Handle bouncing off canvas edges
  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -0.8; // Reduce velocity after bouncing
    }
    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -0.8; // Reverse horizontal velocity
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -0.8; // Reverse horizontal velocity
    }
  }

  // show the particle on the canvas
  show() {
    stroke(0, this.lifetime); // Set stroke color with fading effect
    strokeWeight(2); // Set stroke thickness
    fill(100, 100, 100, this.lifetime); // Gray fill color with fading effect
    ellipse(this.pos.x, this.pos.y, this.r * 2); // Draw a circle representing the particle
  }

  // Run particle behavior: update position and display it
  run() {
    this.update();
    this.show();
  }

  // Check if the particle is dead (faded out)
  isDead() {
    return this.lifetime <= 0;
  }
}
