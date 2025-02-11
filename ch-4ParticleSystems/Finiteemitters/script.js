let emitters = []; // Array to store multiple emitters

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0, 102, 0); // Set background color (dark green)

    // Loop through emitters in reverse order to safely remove empty ones
    for (let i = emitters.length - 1; i >= 0; i--) {
        let emitter = emitters[i];
        emitter.run(); // Update and remove dead particles
        emitter.addParticle(); // Add a new particle if limit isn't reached

        // Remove emitter if it has no particles left and has reached its limit
        if (emitter.isEmpty()) {
            emitters.splice(i, 1); // Remove the emitter from the array
        }
    }
}

// Create a new emitter at mouse position when clicked
function mousePressed() {
    emitters.push(new Emitter(mouseX, mouseY, 50)); // Set particle limit per emitter
}

// Class representing a particle emitter with a limited number of particles
class Emitter {
    constructor(x, y, limit) {
        this.origin = createVector(x, y); // Position of the emitter
        this.particles = []; // Array to store particles
        this.particleLimit = limit; // Max number of particles the emitter can generate
        this.generated = 0; // Counter for generated particles
    }

    // Add a new particle at the emitter's position if the limit isn't reached
    addParticle() {
        if (this.generated < this.particleLimit) {
            this.particles.push(new Particle(this.origin.x, this.origin.y)); // Create a new particle
            this.generated++; // Increase the generated particle count
        }
    }

    // Update and display all particles
    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].run(); // Update particle position and behavior
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1); // Remove dead particle from the array
            }
        }
    }

    // Check if the emitter has reached its limit and has no particles left
    isEmpty() {
        return this.generated >= this.particleLimit && this.particles.length === 0;
    }
}

// Class representing a single particle
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y); // Initial position
        this.acceleration = createVector(0, 0); // Acceleration (affected by forces)
        this.velocity = createVector(random(-1, 1), random(-1, 0)); // Random velocity
        this.lifespan = 255.0; // Determines how long the particle lasts
    }

    // Run particle behavior
    run() {
        let gravity = createVector(0, 0.05); // Gravity force
        this.applyForce(gravity); // Apply gravity to the particle
        this.update(); // Update movement
        this.show(); // Display particle
    }

    // Apply a force (such as gravity) to the particle
    applyForce(force) {
        this.acceleration.add(force);
    }

    // Update particle position and fade it out over time
    update() {
        this.velocity.add(this.acceleration); // Update velocity
        this.position.add(this.velocity); // Move particle
        this.lifespan -= 2; // Reduce lifespan over time (fade effect)
        this.acceleration.mult(0); // Reset acceleration to prevent buildup
    }

    // Display the particle as a fading circle
    show() {
        stroke(0, this.lifespan); // Stroke fades with lifespan
        strokeWeight(2);
        fill(102, this.lifespan); // Fill fades with lifespan
        circle(this.position.x, this.position.y, 8); // Draw particle
    }

    // Check if the particle has faded away (lifespan is below 0)
    isDead() {
        return this.lifespan < 0.0;
    }
}
