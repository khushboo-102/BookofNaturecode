let particles = []; // Array to store all particles
let emitter; // Particle emitter

function setup() {
    createCanvas(600, 400); // Create a 600x400 pixel canvas
    emitter = new Emitter(300, 50); // Create an emitter at the center-top
}

function draw() {
    background(255, 153, 204); // Set a background
    particles.push(new Particle(width / 2, 20)); // Add a new particle

    emitter.addParticle(); // Generate a new particle from the emitter
    emitter.run(); // Update and display particles
}

// Emitter class to generate and manage particles
class Emitter {
    constructor(x, y) {
        this.origin = createVector(x, y); // Emitter's position
        this.particles = []; // Array to store emitted particles
    }

    // Add a new particle at the emitter's position
    addParticle() {
        this.particles.push(new Particle(this.origin.x, this.origin.y));
    }

    // Update and display all particles
    run() {
        // Loop through particles in reverse to update and remove dead ones
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].run();
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1); // Remove particles that have faded out
            }
        }
    }
}

// Particle class representing an individual particle
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y); // Position of the particle
        this.acceleration = createVector(0, 0); // Initial acceleration
        this.velocity = createVector(random(-1, 1), random(-1, 0)); // Random initial velocity
        this.lifespan = 255.0; // Lifetime for fading effect
    }

    // Run particle behavior: apply gravity, update position, and display
    run() {
        let gravity = createVector(0, 0.05); // Simulated gravity effect
        this.applyForce(gravity);
        this.update();
        this.show();
    }

    // Apply a force (e.g., gravity) to the particle
    applyForce(force) {
        this.acceleration.add(force);
    }

    // Update particle's velocity, position, and lifespan
    update() {
        this.velocity.add(this.acceleration); // Update velocity with acceleration
        this.position.add(this.velocity); // Update position with velocity
        this.lifespan -= 2; // Reduce lifespan for fading effect
        this.acceleration.mult(0); // Reset acceleration to prevent accumulation
    }

    // Display the particle on the canvas
    show() {
        stroke(0, this.lifespan); // Set stroke color with fading effect
        strokeWeight(2); // Set stroke thickness
        fill(127, this.lifespan); // Gray fill color with fading effect
        circle(this.position.x, this.position.y, 8); // Draw a small circle
    }

    // Check if the particle is dead (fully faded)
    isDead() {
        return this.lifespan < 0.3;
    }
}
