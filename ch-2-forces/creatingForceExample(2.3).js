let moverA, moverB;

function setup() {
    createCanvas(600, 600);

    // Create two movers with different masses
    moverA = new Mover(200, 100, 10); // Mass = 2
    moverB = new Mover(400, 100, 2); // Mass = 4
}

function draw() {
    background("pink");

    // Create a "gravity" force
    let gravity = createVector(0, 0.1);

    // Scale gravity by each mover's mass and apply it
    let gravityA = p5.Vector.mult(gravity, moverA.mass);
    moverA.applyForce(gravityA);

    let gravityB = p5.Vector.mult(gravity, moverB.mass);
    moverB.applyForce(gravityB);

    // Apply a wind force on mouse press
    if (mouseIsPressed) {
        let wind = createVector(0.5, 0); // Wind force to the right
        moverA.applyForce(wind);
        moverB.applyForce(wind);
    }

    // Update and display both movers
    moverA.update();
    moverA.checkEdges();
    moverA.show();

    moverB.update();
    moverB.checkEdges();
    moverB.show();
}

class Mover {
    constructor(x, y, mass) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.mass = mass; // Assign mass
        this.radius = mass * 10; // Radius proportional to mass
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass); // F = ma
        this.acc.add(f);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    checkEdges() {
        // Bounce off the edges
        if (this.pos.x + this.radius > width) {
            this.pos.x = width - this.radius;
            this.vel.x *= -1;
        }
        if (this.pos.x - this.radius < 0) {
            this.pos.x = this.radius;
            this.vel.x *= -1;
        }
        if (this.pos.y + this.radius > height) {
            this.pos.y = height - this.radius;
            this.vel.y *= -1;
        }
        if (this.pos.y - this.radius < 0) {
            this.pos.y = this.radius;
            this.vel.y *= -1;
        }
    }

    show() {
        fill("green");
        noStroke();
        circle(this.pos.x, this.pos.y, this.radius * 2);
    }
}