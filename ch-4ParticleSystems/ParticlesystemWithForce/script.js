let emitter;

function setup() {
    createCanvas(600, 400); // Create a canvas of 600x400 pixels
    emitter = new Emitter(width / 2, 50); // Initialize the emitter at the center-top
}

function draw() {
    background(0, 102, 102); // Set background color

    // Apply gravity force to all particles
    let gravity = createVector(0, 0.1); // Gravity pulls particles down
    emitter.applyForce(gravity);

    emitter.addParticle(); // Continuously add new particles
    emitter.run(); // Update and display all particles
}

// Base class for individual particles
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y); // Initial position
        this.acceleration = createVector(0, 0.0); // Starts with no acceleration
        this.velocity = createVector(random(-1, 1), random(-2, 0)); // Random upward velocity
        this.lifespan = 255.0; // Particle fades over time
        this.mass = 1; // Mass affects force calculations
    }

    // Runs the update and display functions
    run() {
        this.update();
        this.show();
    }

    // Applies a force to the particle considering its mass
    applyForce(force) {
        let f = force.copy(); // Copy the force vector
        f.div(this.mass); // Apply Newton's second law: F = ma (a = F/m)
        this.acceleration.add(f);
    }

    // Updates velocity, position, and lifespan of the particle
    update() {
        this.velocity.add(this.acceleration); // Change velocity by acceleration
        this.position.add(this.velocity); // Move position based on velocity
        this.acceleration.mult(0); // Reset acceleration after each frame
        this.lifespan -= 2.0; // Decrease lifespan to make the particle fade
    }

    // Displays the particle as a fading circle
    show() {
        stroke(0, this.lifespan); // Stroke fades as lifespan decreases
        strokeWeight(2);
        fill(127, this.lifespan); // Fill color fades with lifespan
        circle(this.position.x, this.position.y, 8); // Draw a small circle
    }

    // Check if the particle has faded away
    isDead() {
        return this.lifespan < 0.0; // If lifespan is below 0, the particle is "dead"
    }
}

// Class to manage a collection of particles (Emitter)
class Emitter {
    constructor(x, y) {
        this.origin = createVector(x, y); // The emitter's starting point
        this.particles = []; // Array to store particles
    }

    // Creates and adds a new particle to the system
    addParticle() {
        this.particles.push(new Particle(this.origin.x, this.origin.y));
    }

    // Applies a force to all particles in the system
    applyForce(force) {
        for (let particle of this.particles) {
            particle.applyForce(force);
        }
    }

    // Runs all particles and removes dead ones
    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.run();
            if (particle.isDead()) {
                this.particles.splice(i, 1); // Remove dead particles from the array
            }
        }
    }
}
