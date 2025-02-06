let emitter; // Global variable for the emitter

function setup() {
    createCanvas(600, 400);
    emitter = new Emitter(300,200); // Start emitter in the center
}

function draw() {
    background(255, 153, 204); // Set background

    // Apply a small random force for natural movement
    emitter.applyForce(createVector(random(-0.1, 0.1), random(-0.05, 0.05)));

    emitter.update(); // Update emitter position
    emitter.addParticle(); // Emit a new particle
    emitter.run(); // Update and show all particles on canvas
}

// Move emitter to mouse position when clicked
function mousePressed() {
    emitter.setPosition(mouseX, mouseY);
}

// Emitter class that moves autonomously and emits particles
class Emitter {
    constructor(x, y) {
        this.position = createVector(x, y); // Position of the emitter
        this.velocity = createVector(0, 0); // Initial velocity
        this.acceleration = createVector(0, 0); // Initial acceleration
        this.particles = []; // Array to store emitted particles
    }

    // Update emitter position based on velocity and acceleration
    update() {
        this.velocity.add(this.acceleration); // Apply acceleration to velocity
        this.position.add(this.velocity); // Apply velocity to position
        this.acceleration.mult(0); // Reset acceleration after applying it
    }

    // Apply an external force
    applyForce(force) {
        this.acceleration.add(force);
    }

    // Set emitter position manually (when clicking)
    setPosition(x, y) {
        this.position.set(x, y);
        this.velocity.set(0, 0); // Reset velocity to stop unwanted motion
    }

    // Add a new particle at the emitter’s position
    addParticle() {
        this.particles.push(new Particle(this.position.x, this.position.y));
    }

    // Update and display all particles
    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].run(); // Update particle behavior
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1); // Remove dead particles
            }
        }
    }
}

// Particle class representing individual particles
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y); // Particle position
        this.velocity = createVector(random(-1, 1), random(-1, 0)); // Initial velocity with randomness
        this.acceleration = createVector(0, 0); // No initial acceleration
        this.lifespan = 255; // Lifespan for fading effect
    }

    // Apply an external force (e.g., gravity)
    applyForce(force) {
        this.acceleration.add(force);
    }

    // Update particle position and velocity
    update() {
        this.velocity.add(this.acceleration); // Update velocity based on acceleration
        this.position.add(this.velocity); // Update position based on velocity
        this.lifespan -= 2; // Reduce lifespan for fading effect
        this.acceleration.mult(0); // Reset acceleration after applying it
    }

    // Display the particle on the canvas
    show() {
        stroke(0, this.lifespan); // Outline with fading effect
        strokeWeight(2); // Set stroke thickness
        fill(127, this.lifespan); // Gray fill with fading effect
        circle(this.position.x, this.position.y, 8); // Draw particle as a small circle
    }

    // Run particle behavior: apply gravity, update position, and show
    run() {
        let gravity = createVector(0, 0.05); // Simulated gravity effect
        this.applyForce(gravity);
        this.update();
        this.show();
    }

    // Check if the particle is dead (fully faded)
    isDead() {
        return this.lifespan < 0;
    }
}
