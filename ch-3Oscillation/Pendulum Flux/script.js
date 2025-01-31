// let bob;
// let anchor;
// let spring;
// let gravity;

// function setup() {
//     createCanvas(400, 800);
//     bob = new Particle(350, 300)
//     anchor = new Particle(300, 0);
//     spring = new Spring(0.01, 200, bob, anchor);
//     gravity = createVector(0, 0.1);
// }

// function draw() {
//     background(112, 50, 126);
//     spring.show();  
//     spring.update();  
//     bob.show();
//     bob.update();
//     anchor.show();
//     anchor.update();

    
//     if (mouseIsPressed) {
//         bob.position.set(mouseX, mouseY);
//         bob.position.set(0, 0);
//     }
// }
// class Spring {
//     constructor(k, restLenght, a, b) {
//         this.k = k;
//         this.restLenght = restLenght;
//         this.a = a;
//         this.b = b;
//     }
    
//     update() {
//         let force = p5.Vector.sub(this.b.position, this.a.position);
//         let x = force.mag() - this.restLenght;
//         force.normalize();
//         force.mult(-1 * this.k * x);
//         this.a.applyForce(force);
//         force.mult(-1);
//         this.b.applyForce(force);

//     }
//     show() {
//         strokeWeight(4);
//         stroke(255);
//         line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y)
//     }
// }

// class Particle {
//     constructor(x, y) {
//         this.acceleration = createVector(0, 0);
//         this.velocity = createVector(0, 0);
//         this.position = createVector(x, y);
//         this.mass = 1;
//     }
//     applyForce(force) {
//         let f = force.copy();
//         f.div(this.mass);
//         this.acceleration.add(f)
//     }

//     update() {
//         this.velocity.mult(0.09);
//         this.velocity.add(this.acceleration);
//         this.position.add(this.velocity);
//         this.acceleration.mult(0);
//     }
//     show() {
//         stroke(265);
//         strokeWeight(2);
//         fill(45, 147, 244);
//         ellipse(this.position.x, this.position.y, 64)
//     }
// }
let bob;       // The moving end of the spring (pendulum bob)
let anchor;    // The fixed end of the spring
let spring;    // The spring connecting bob and anchor
let gravity;   // Gravity force applied to the bob

function setup() {
    createCanvas(400, 800); // Creates a 400x800 pixel canvas

    // Initialize bob (movable particle) and anchor (fixed point)
    bob = new Particle(350, 0);
    anchor = new Particle(200, 400);

    // Create a spring connecting bob and anchor with a spring constant (k) and rest length
    spring = new Spring(0.01, 200, bob, anchor);

    // Gravity force acting downward on the bob
    gravity = createVector(0, 0.1);
}

function draw() {
    background(112, 50, 126); // Sets background color

    // Apply gravity force to the bob
    bob.applyForce(gravity);

    // Update physics for spring and bob
    spring.update();
    bob.update();

    // Display spring, bob, and anchor on the canvas
    spring.show();
    bob.show();
    anchor.show();

    // If the mouse is pressed, move the bob to the mouse location
    if (mouseIsPressed) {
        bob.position.set(mouseX, mouseY); // Move bob to mouse position
        bob.velocity.set(0, 0); // Stop movement while dragging
    }
}

// Spring class represents the connection between the bob and anchor
class Spring {
    constructor(k, restLength, a, b) {
        this.k = k; // Spring constant (stiffness)
        this.restLength = restLength; // Natural length of the spring
        this.a = a; // First particle (bob)
        this.b = b; // Second particle (anchor)
    }
    
    update() {
        // Calculate the direction of the spring force
        let force = p5.Vector.sub(this.b.position, this.a.position);
        
        // Calculate the displacement from the rest length
        let x = force.mag() - this.restLength;

        // Normalize force and apply Hooke's Law (F = -k * x)
        force.normalize();
        force.mult(-1 * this.k * x);

        // Apply force to both particles (equal and opposite)
        this.a.applyForce(force);
        force.mult(-1); // Reverse the force for the second particle
        this.b.applyForce(force);
    }

    show() {
        strokeWeight(4);
        stroke(255); // Set spring color to white
        line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y); // Draw the spring
    }
}

// Particle class represents the bob and anchor
class Particle {
    constructor(x, y) {
        this.acceleration = createVector(0, 0); // Initial acceleration
        this.velocity = createVector(0, 0); // Initial velocity
        this.position = createVector(x, y); // Initial position
        this.mass = 1; // Mass of the particle
    }

    applyForce(force) {
        let f = force.copy();
        f.div(this.mass); // Apply Newton’s second law (F = ma)
        this.acceleration.add(f);
    }

    update() {
        // Apply damping to smooth the motion
        this.velocity.mult(0.99); 
        this.velocity.add(this.acceleration); // Update velocity with acceleration
        this.position.add(this.velocity); // Update position with velocity
        this.acceleration.mult(0); // Reset acceleration after each update
    }

    show() {
        stroke(255); // White stroke
        strokeWeight(2);
        fill(45, 147, 244); // Blue color for the bob
        ellipse(this.position.x, this.position.y, 64); // Draw the bob
    }
}
