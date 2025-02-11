let shapes = []; // Array to store large shapes

function setup() {
    createCanvas(600, 400);
    
    // Create a few large shapes as rectangles at random positions
    for (let i = 0; i < 3; i++) {
        shapes.push(new Shape(random(100, width - 100), random(100, height - 100), 80, 80));
    }
}

function draw() {
    background(102, 0, 53); // Set background color

    // Loop through all shapes
    for (let i = shapes.length - 1; i >= 0; i--) {
        let shape = shapes[i];
        shape.run(); // Update and display shape or particles
        
        // Remove shape from array when all its particles are gone
        if (shape.isEmpty()) {
            shapes.splice(i, 1);
        }
    }
}

// Detect mouse clicks to check if a shape is clicked
function mousePressed() {
    for (let shape of shapes) {
        if (shape.contains(mouseX, mouseY)) {
            shape.shatter(); // Break shape into pieces
        }
    }
}

// Class representing a large shape that can shatter
class Shape {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y); // Position of the shape
        this.w = w; // Width of the shape
        this.h = h; // Height of the shape
        this.particles = []; // Array to store shattered particles
        this.shattered = false; // Track if shape has been shattered
    }

    // Check if mouse click is inside the shape
    contains(mx, my) {
        return mx > this.pos.x && mx < this.pos.x + this.w &&
               my > this.pos.y && my < this.pos.y + this.h;
    }

    // Shatter the shape into multiple particles
    shatter() {
        if (!this.shattered) {
            for (let i = 0; i < 30; i++) { // Create 30 particles
                let px = this.pos.x + random(this.w); // Random x within shape
                let py = this.pos.y + random(this.h); // Random y within shape
                this.particles.push(new Particle(px, py));
            }
            this.shattered = true; // Mark shape as shattered
        }
    }

    // Update and display particles or shape
    run() {
        if (!this.shattered) {
            // Draw shape before it shatters
            fill(200, 50, 50); // Red color
            noStroke();
            rect(this.pos.x, this.pos.y, this.w, this.h);
        } else {
            // Display particles if shattered
            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].update(); // Move particle
                this.particles[i].show(); // Display particle
                
                // Remove particle if it has faded out
                if (this.particles[i].isDead()) {
                    this.particles.splice(i, 1);
                }
            }
        }
    }

    // Check if the shape is empty (no particles left)
    isEmpty() {
        return this.shattered && this.particles.length === 0;
    }
}

// Class representing a single particle from a shattered shape
class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y); // Initial position
        this.vel = p5.Vector.random2D().mult(random(1, 3)); // Random movement direction
        this.lifespan = 255; // Lifespan (fades over time)
    }

    // Update particle movement and lifespan
    update() {
        this.pos.add(this.vel); // Move particle
        this.lifespan -= 5; // Reduce lifespan to fade out
    }

    // Display the particle as a fading circle
    show() {
        fill(255, this.lifespan); // White color with transparency
        noStroke();
        ellipse(this.pos.x, this.pos.y, 6); // Draw small particle
    }

    // Check if the particle is completely faded
    isDead() {
        return this.lifespan <= 0;
    }
}
