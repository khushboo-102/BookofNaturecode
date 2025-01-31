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

let bob;
let anchor;
let spring;
let gravity;

function setup() {
    createCanvas(400, 800);
    bob = new Particle(350, 0);
    anchor = new Particle(200, 400);
    spring = new Spring(0.01, 200, bob, anchor);
    gravity = createVector(0, 0.1);
}

function draw() {
    background(112, 50, 126);
    
    // Apply gravity to the bob
    bob.applyForce(gravity);

    spring.update();
    bob.update();

    spring.show();
    bob.show();
    anchor.show();

    // Mouse interaction: Drag the bob
    if (mouseIsPressed) {
        bob.position.set(mouseX, mouseY);
        bob.velocity.set(0, 0); // Stop movement when dragged
    }
}

class Spring {
    constructor(k, restLength, a, b) {
        this.k = k;
        this.restLength = restLength;
        this.a = a;
        this.b = b;
    }
    
    update() {
        let force = p5.Vector.sub(this.b.position, this.a.position);
        let x = force.mag() - this.restLength;
        force.normalize();
        force.mult(-1 * this.k * x);
        this.a.applyForce(force);
        force.mult(-1);
        this.b.applyForce(force);
    }

    show() {
        strokeWeight(4);
        stroke(255);
        line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);
    }
}

class Particle {
    constructor(x, y) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.position = createVector(x, y);
        this.mass = 1;
    }

    applyForce(force) {
        let f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.mult(0.99); // Reduced damping for smoother motion
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    show() {
        stroke(255); // Fixed color value
        strokeWeight(2);
        fill(45, 147, 244);
        ellipse(this.position.x, this.position.y, 64);
    }
}


