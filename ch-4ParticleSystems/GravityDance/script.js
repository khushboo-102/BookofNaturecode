let particles = [];  // Array to store particles
let attractors = []; // Array to store attractor objects
let repellers = [];  // Array to store repeller objects

function setup() {
    createCanvas(600, 400);

    // Creating two attractors at different positions
    attractors.push(new Attractor(width * 0.25, height / 2, 10));
    attractors.push(new Attractor(width * 0.75, height / 2, 10));

    // Creating two repellers at different positions
    repellers.push(new Repeller(width / 2, height * 0.25, 10));
    repellers.push(new Repeller(width / 2, height * 0.75, 10));
}

function draw() {
    background(120, 120, 120); // Grey background

    // Add a new particle at a random horizontal position from the top
    particles.push(new Particle(random(width), 0));

    for (let p of particles) {
        // Apply attraction force from each attractor
        for (let a of attractors) {
            let force = a.calculateForce(p); // Compute force
            p.applyForce(force); // Apply force
        }

        // Apply repulsion force from each repeller
        for (let r of repellers) {
            let force = r.calculateForce(p); // Compute force
            force.mult(-1); // Reverse force to make it a repelling force
            p.applyForce(force); // Apply force
        }

        p.update(); // Update particle's motion
        p.show();   // Display particle
    }

    // Display attractors and repellers
    for (let a of attractors) a.show();
    for (let r of repellers) r.show();

    // Remove dead particles (those with lifespan <= 0)
    particles = particles.filter(p => !p.isDead());
}

// Class representing a single particle
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);          // Particle's position
        this.velocity = createVector(random(-1, 1), random(-1, 1)); // Random initial velocity
        this.acceleration = createVector(0, 0);      // No initial acceleration
        this.lifespan = 255;                         // Particle fades over time
    }

    // Apply a force to the particle (F = ma)
    applyForce(force) {
        this.acceleration.add(force);
    }

    // Update position, velocity, and lifespan
    update() {
        this.velocity.add(this.acceleration); // Change velocity based on acceleration
        this.position.add(this.velocity);     // Move particle
        this.acceleration.mult(0);           // Reset acceleration after each frame
        this.lifespan -= 2;                   // Reduce lifespan over time
    }

    // Display particle
    show() {
        stroke(255, this.lifespan);  // Stroke fades with lifespan
        fill(200, this.lifespan);    // Fill fades with lifespan
        ellipse(this.position.x, this.position.y, 8); // Draw the particle
    }

    // Check if particle has faded out
    isDead() {
        return this.lifespan <= 0;
    }
}

// Base class for force sources (Attractors and Repellers)
class ForceSource {
    constructor(x, y, strength) {
        this.position = createVector(x, y); // Position of the force source
        this.strength = strength;           // Strength of attraction/repulsion
    }

    // Calculate the force exerted on a particle
    calculateForce(particle) {
        let force = p5.Vector.sub(this.position, particle.position); // Compute vector from particle to force source
        let distance = constrain(force.mag(), 5, 50); // Constrain distance to avoid extreme forces
        force.normalize(); // Normalize to unit vector
        let magnitude = (this.strength * 10) / (distance * distance); // Inverse square law for force
        force.mult(magnitude); // Scale force
        return force;
    }

    // Display force source as a circle
    show() {
        fill(255, 100); // Semi-transparent white
        noStroke();
        ellipse(this.position.x, this.position.y, this.strength * 2);
    }
}

// Attractor class (inherits from ForceSource)
class Attractor extends ForceSource {
    constructor(x, y, strength) {
        super(x, y, strength);
    }

    // Display attractor as a green circle
    show() {
        fill(0, 255, 0); // Green color for attractors
        super.show();
    }
}

// Repeller class (inherits from ForceSource)
class Repeller extends ForceSource {
    constructor(x, y, strength) {
        super(x, y, strength);
    }

    // Display repeller as a red circle
    show() {
        fill(255, 0, 0); // Red color for repellers
        super.show();
    }
}
