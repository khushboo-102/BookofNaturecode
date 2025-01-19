let moverA;
let moverB;

function setup() {
    createCanvas(600, 600);     // Create a 600x600 pixel canvas

    // Initialize two Mover objects with different positions and masses
    moverA = new Mover(200, 200, 10);// Mover A with mass 10 at position (200, 200)
    moverB = new Mover(300, 200, 2);// Mover B with mass 2 at position (300, 200)

}

function draw() {
    background(0, 102, 0);

    let gravity = createVector(0, 0.1); // Define the gravity force (pulls downward)
    // Apply gravity force to both movers
    moverA.applyForce(gravity);
    moverB.applyForce(gravity);

    // If the mouse is pressed, apply wind force (horizontal rightward force)
    if (mouseIsPressed) {
        let wind = createVector(0.1, 0);
        moverA.applyForce(wind);
        moverB.applyForce(wind);
    }

    moverA.checkEdges();// Check if mover A hits the edges of the canvas
    moverA.update();// Update position and velocity of mover A
    moverA.show(); // Show mover A


    moverB.checkEdges(); // Check if mover B hits the edges of the canvas
    moverB.update();// Update position and velocity of mover B
    moverB.show(); // Show mover B
}

class Mover {
    constructor(x, y, m) {
        // Initialize position, velocity, acceleration, and mass for the mover
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.mass = m;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f); // Add calculated acceleration to current acceleration
    }
    // Update the position and velocity based on current acceleration and velocity
    update() {
        this.vel.add(this.acc); // Add acceleration to velocity
        this.pos.add(this.vel);    // Add velocity to position
         this.acc.set(0, 0); // Reset acceleration to (0, 0) for next frame
    }

    show() {
        fill("pink");
        circle(this.pos.x, this.pos.y, this.mass * 10);// Draw circle with diameter based on mass
    }

    
     // If the mover hits the left or right edges, reverse horizontal velocity
    checkEdges() {
        if (this.pos.y <= 0 || this.pos.y >= height) {
            this.vel.y *= -1;
        }
        else if (this.pos.x <= 0 || this.pos.x >= width) {
            this.vel.x *= -1;
        }

    }

}