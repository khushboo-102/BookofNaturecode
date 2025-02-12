let emitter;

function setup() {
    createCanvas(600, 400);
    // Create a particle emitter at the top center of the canvas
    emitter = new Emitter(width / 2, 20);
}

function draw() {
    background(102, 51, 0); // Dark brown background
    emitter.addParticle(); // Add a new particle each frame
    emitter.run(); // Update and display all particles
}

// Emitter class to manage all particles
class Emitter {
    constructor(x, y) {
        this.origin = createVector(x, y); // Position of the emitter
        this.particles = []; // Array to store particles
    }

    // Add a new particle (randomly selects one of the three types)
    addParticle() {
        let r = random(1);
        if (r < 0.33) {
            this.particles.push(new Particle(this.origin.x, this.origin.y));
        } else if (r < 0.66) {
            this.particles.push(new Confetti(this.origin.x, this.origin.y));
        } else {
            this.particles.push(new Firework(this.origin.x, this.origin.y));
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
        stroke(255, this.lifespan);
        strokeWeight(2);
        fill(127, this.lifespan);
        circle(this.position.x, this.position.y, 8);
    }

    // Check if the particle is dead
    isDead() {
        return this.lifespan < 0.0;
    }
}

// Confetti subclass with rotating squares
class Confetti extends Particle {
    show() {
        let angle = map(this.position.x, 0, width, 0, TWO_PI * 2); // Rotate based on x-position
        rectMode(CENTER);
        fill(200, 100, 255, this.lifespan);
        stroke(255, this.lifespan);
        push();
        translate(this.position.x, this.position.y);
        rotate(angle); // Apply rotation
        square(0, 0, 12); // Draw square
        pop();
    }
}

// Firework subclass with expanding/shrinking stars
class Firework extends Particle {
    constructor(x, y) {
        super(x, y);
        this.size = random(6, 12); // Random initial size
    }

    // Override update to modify size dynamically
    update() {
        super.update();
        this.size = this.size + sin(frameCount * 0.2) * 0.5; // Expand and shrink effect
    }

    // Display a star that changes size over time
    show() {
        stroke(255, 200, 50, this.lifespan);
        fill(255, 100, 0, this.lifespan);
        push();
        translate(this.position.x, this.position.y);
        drawStar(0, 0, this.size, this.size * 2, 5);
        pop();
    }
}

// Function to draw a star shape
function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
