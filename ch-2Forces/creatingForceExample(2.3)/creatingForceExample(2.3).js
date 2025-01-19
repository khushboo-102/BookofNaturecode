let moverA, moverB;

function setup() {
    createCanvas(600, 600); //create a canvas of size 600 X 600 pixle

    // Create two movers with different masses and position
    moverA = new Mover(200, 100, 10); // Mass = 10
    moverB = new Mover(400, 100, 2); // Mass = 2
}

function draw() {
    background("pink"); //set the background color

    // Create a "gravity" force
    let gravity = createVector(0, 0.1);

    // Scale gravity by each mover's mass and apply it
    let gravityA = p5.Vector.mult(gravity, moverA.mass); // Gravity for mover A
    moverA.applyForce(gravityA); // Apply gravity to mover A

    let gravityB = p5.Vector.mult(gravity, moverB.mass);  // Gravity for mover Bz
    moverB.applyForce(gravityB); // Apply gravity to mover B

    // Apply a wind force on mouse press
    if (mouseIsPressed) {
        let wind = createVector(0.5, 0); // Wind force to the right
        moverA.applyForce(wind); // Apply wind to mover A
        moverB.applyForce(wind); // Apply wind to mover B
    }

    // Update and display both movers
    moverA.update();  //Update mover A's position and velocity
    moverA.checkEdges(); // check if the moverA hit any edges of canvas then moverA reverse as bounce effect
    moverA.show(); //display the moverA on canvas

    moverB.update(); //Update moverB's position and velocity
    moverB.checkEdges(); // check if the moverA hit any edges of canvas then moverA reverse as bounce effect
    moverB.show(); //display the moverA on canvas
}

class Mover {
    constructor(x, y, mass) {
        this.pos = createVector(x, y); // Set the initial position of the mover
        this.vel = createVector(0, 0); // Set the initial velocity to zero
        this.acc = createVector(0, 0); // Set the initial acceleration to zero
        this.mass = mass; // mass of movers
        this.radius = mass * 10; //Set the radius proportional to the mass for visual representation
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass); // Divide the force by mass to get acceleration
        this.acc.add(f);  //Add the resulting acceleration to the current acceleration
    }

    update() {
        this.vel.add(this.acc); // Update velocity by adding acceleration
        this.pos.add(this.vel); // Update position by adding velocity
        this.acc.set(0, 0); // Reset acceleration for the next frame
    }

    // Method to check if the mover is out of bounds
    checkEdges() {
        // If the mover hits the right edge, it bounces back
        if (this.pos.x + this.radius > width) {
            this.pos.x = width - this.radius;
            this.vel.x *= -1;
        }
        // If the mover hits the left edge, it bounces back
        if (this.pos.x - this.radius < 0) {
            this.pos.x = this.radius;
            this.vel.x *= -1;
        }
        // If the mover hits the bottom edge, it bounces back
        if (this.pos.y + this.radius > height) {
            this.pos.y = height - this.radius;
            this.vel.y *= -1;
        }
        // If the mover hits the top edge, it bounces back
        if (this.pos.y - this.radius < 0) {
            this.pos.y = this.radius;
            this.vel.y *= -1;
        }
    }

    // display the mover as a green circle on the canvas
    show() {
        fill("green");
        noStroke();
        circle(this.pos.x, this.pos.y, this.radius * 2);
    }
}