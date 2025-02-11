let emitters = []; // Array to store multiple emitters

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(153, 153, 255); // Set background color

    // Loop through all emitters and update 
    for (let emitter of emitters) {
        emitter.run(); // Update and remove dead particles
        emitter.addParticle(); // Add a new particle
    }
}

// Create a new emitter at mouse position when clicked
function mousePressed() {
    emitters.push(new Emitter(mouseX, mouseY));
}

// Class representing a particle emitter
class Emitter {
    constructor(x, y) {
        this.origin = createVector(x, y); // Position of emitter
        this.particles = []; // Array to store particles
    }

    // Add a new particle at the emitter's position
    addParticle() {
        this.particles.push(new Particle(this.origin.x, this.origin.y));
    }

    // Update and display all particles
    run() {
        // Loop through particles backwards to safely remove dead ones
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].run(); // Update and display particle
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1); // Remove particle if it's dead
            }
        }
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
        this.applyForce(gravity); // Apply gravity
        this.update(); // Update movement
        this.show(); // Display particle
    }

    // Apply a force (like gravity) to the particle
    applyForce(force) {
        this.acceleration.add(force);
    }

    // Update particle position and fade it out over time
    update() {
        this.velocity.add(this.acceleration); // Update velocity
        this.position.add(this.velocity); // Move particle
        this.lifespan -= 2; // Reduce lifespan
        this.acceleration.mult(0); // Reset acceleration
    }

    // Display the particle as a fading circle
    show() {
        stroke(0, this.lifespan); // Stroke fades with lifespan
        strokeWeight(2);
        fill(102, this.lifespan); // Fill fades with lifespan
        circle(this.position.x, this.position.y, 8); // Draw particle
    }

    // Check if the particle has faded away
    isDead() {
        return this.lifespan < 0.0;
    }
}
