let movers = []; // Array to store multiple movers

function setup() {
    createCanvas(600, 600); // Create a canvas of size 600x600 pixels
      // Create 6 movers with random positions and sizes
    for (let i = 0; i < 6; i++) {
        movers.push(new Mover(random(width), random(height), random(10, 20)));  // Add each mover to the array
    }
}

function draw() {
    background("green"); // Set background color of canvas
    // Loop through each mover in the movers array
    for (let mover of movers) {
        let wind = calculateWind(mover); // Calculate wind force based on the mover's position and mouse position
        mover.applyForce(wind); // Apply wind force to the mover

        mover.update(); // Update the mover's position and velocity
        mover.checkEdges(); // Check if the mover is at the edge of the canvas and bounce it back
        mover.show();  // Display the mover on the canvas
    }
}

// Class to represent each moving circle
class Mover {
    constructor(x, y, radius) {
        this.pos = createVector(x, y); // Set initial position using random values
        this.vel = createVector(0, 0); // Set initial velocity to zero
        this.acc = createVector(0, 0); // Set initial acceleration to zero
        this.radius = radius; // Set radius based on the random value
        this.mass = radius / 10; // Larger circles have more mass
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass); 
        this.acc.add(f); // Add the resulting acceleration to the current acceleration
    }

    update() {
        this.vel.add(this.acc);  // Update velocity by adding acceleration
        this.pos.add(this.vel); // Update position by adding velocity
        this.acc.set(0, 0); // Reset acceleration to 0 for the next frame
    }

    // Check if the mover hits the edges of the canvas and bounce it back
    checkEdges() {
        // Right edge
        if (this.pos.x + this.radius > width) {
            this.pos.x = width - this.radius;
            this.vel.x *= -1;
        }
        // Left edge
        if (this.pos.x - this.radius < 0) {
            this.pos.x = this.radius;
            this.vel.x *= -1;
        }
        // Bottom edge
        if (this.pos.y + this.radius > height) {
            this.pos.y = height - this.radius;
            this.vel.y *= -1;
        }
        // Top edge
        if (this.pos.y - this.radius < 0) {
            this.pos.y = this.radius;
            this.vel.y *= -1;
        }
    }
    // Show the mover as a circle on the canvas
    show() {
        fill("255,204,255");
        noStroke();
        circle(this.pos.x, this.pos.y, this.radius * 2); // Draw a circle at the position with the given radius
    }
}

// Function to calculate wind based on the mouse position
function calculateWind(mover) {
    let mouse = createVector(mouseX, mouseY); //Create a vector for the mouse position
    let direction = p5.Vector.sub(mouse, mover.pos);   // Calculate direction from the mover to the mouse
    let distance = direction.mag(); // Calculate the distance between the mover and the mouse
    direction.normalize(); // Normalize the direction vector to have unit length
    // Map the distance to a strength value between 1 and 0 (stronger when closer to the mouse)
    let strength = constrain(map(distance, 0, width, 1, 0), 0, 1); // Strength diminishes with distance
    direction.mult(strength * 0.5); // Scale force( scale the direction by the strength)
    return direction; // Return the calculated wind vector
}