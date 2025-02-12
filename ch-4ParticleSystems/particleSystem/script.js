let emitter;

function setup() {
  createCanvas(600, 400);
  // Create an emitter at the top center of the canvas
  emitter = new Emitter(width / 2, 20);
}

function draw() {
  background(102, 102, 53);
  
  // Add a new particle on each frame
  emitter.addParticle();
  
  // Update and display all particles
  emitter.run();
}

// Particle emitter class
class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y); // Position of the emitter
    this.particles = []; // Array to store particles
  }

  // Add a new particle (randomly a circle or confetti)
  addParticle() {
    let r = random(1);
    if (r < 0.5) {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    } else {
      this.particles.push(new Confetti(this.origin.x, this.origin.y));
    }
  }

  // Update and display all particles, remove dead ones
  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1); // Remove dead particles
      }
    }
  }
}

// Base Particle class
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y); // Position of the particle
    this.acceleration = createVector(0, 0); // Acceleration (affected by forces)
    this.velocity = createVector(random(-1, 1), random(-1, 0)); // Initial velocity
    this.lifespan = 255.0; // Lifespan (fades over time)
  }

  // Run the particle (apply forces, update, and display)
  run() {
    let gravity = createVector(0, 0.05); // Gravity force
    this.applyForce(gravity);
    this.update();
    this.show();
  }

  // Apply an external force
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Update position, velocity, and lifespan
  update() {
    this.velocity.add(this.acceleration); // Apply acceleration to velocity
    this.position.add(this.velocity); // Move particle
    this.lifespan -= 2; // Reduce lifespan
    this.acceleration.mult(0); // Reset acceleration
  }

  // Display the particle as a fading circle
  show() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  // Check if the particle is dead
  isDead() {
    return this.lifespan < 0.0;
  }
}

// Confetti subclass extending Particle
class Confetti extends Particle {
  // Override the show method to display a rotating square
  show() {
    let angle = map(this.position.x, 0, width, 0, TWO_PI * 2); // Rotate based on x-position

    rectMode(CENTER);
    fill(127, this.lifespan);
    stroke(0, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle); // Apply rotation
    square(0, 0, 12); // Draw square
    pop();
  }
}
