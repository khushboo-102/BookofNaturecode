let particles = []; // Array to store multiple particles

function setup() {
    createCanvas(600, 400); // Creates a 600x400 pixel canvas
}

function draw() {
    background(204, 204, 255); // Sets a background

    // Generates 2 new particles per frame at (300, 200)
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(300, 200));
    }

    // Updates and displays each particle
    for (let particle of particles) {
        let gravity = createVector(0, 0.5); // Gravity force pulling particles downward
        particle.applyForce(gravity); // Applies gravity to each particle
        particle.update(); // Updates particle's movement
        particle.edges(); // Handles boundary collisions
        particle.show(); // Displays the particle on canvas
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y); // Particle's position vector
        this.vel = p5.Vector.random2D(); // Random initial velocity direction
        this.vel.mult(random(0.5, 2)); // Scales velocity randomly
        this.acc = createVector(0, 0); // Acceleration vector
        this.r = 4; // Radius of the particle
        this.lifetime = 255; // Lifetime of the particle (for fading effect)
    }

    // Checks if the particle has faded away
    finished() {
        return this.lifetime < 0;
    }

    applyForce(force) {
        this.acc.add(force); // Adds the applied force to acceleration
    }

    update() {
        this.vel.add(this.acc); // Updates velocity based on acceleration
        this.pos.add(this.vel); // Updates position based on velocity
        this.acc.set(0, 0); // Resets acceleration after each update
        this.lifetime -= 1; // Decreases lifetime for fading effect
    }

    edges() {
        // Check if the particle hits the bottom of the canvas
        if (this.pos.y >= height - this.r) {
            this.pos.y = height - this.r; 
            this.vel.y *= -1; // Reverses velocity to create a bounce effect
        }
        // Check if the particle hits the right boundary
        if (this.pos.x >= width - this.r) {
            this.pos.x = width - this.r; 
            this.vel.x *= -1; // Reverses horizontal velocity
        }
        // Check if the particle hits the left boundary
        else if (this.pos.x <= this.r) {
            this.pos.x = this.r; 
            this.vel.x *= -1; // Reverses horizontal velocity
        }
    }

    show() {
        stroke(255, this.lifetime); // Sets stroke color with fading effect
        strokeWeight(3); // Sets stroke thickness
        fill(128, 128, 128, this.lifetime); // Fills particle with gray and fading effect

         // if (this.finished()) {
        //     noFill();
        // }

        ellipse(this.pos.x, this.pos.y, this.r * 8); // Draws the particle as an ellipse
    }
}
