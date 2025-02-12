let emitter;
function setup() {
    createCanvas(600, 400);
    emitter = new Emitter(width / 2, 20);
}

function draw() {
    background(102, 51, 0)
    emitter.addParticle();
    emitter.run();
}

// Emitter class to manage all particles
class Emitter {
    constructor(x, y) {
        this.origin = createVector(x, y);
        this.particles = [];
    }

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

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}

// Base Particle class
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(random(-1, 1), random(-1, 0));
        this.lifespan = 255.0;
    }

    run() {
        let gravity = createVector(0, 0.05);
        this.applyForce(gravity);
        this.update();
        this.show();
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
        this.acceleration.mult(0);
    }

    show() {
        stroke(255, this.lifespan);
        strokeWeight(2);
        fill(127, this.lifespan);
        circle(this.position.x, this.position.y, 8);
    }

    isDead() {
        return this.lifespan < 0.0;
    }
}

// Confetti subclass with rotating squares
class Confetti extends Particle {
    show() {
        let angle = map(this.position.x, 0, width, 0, TWO_PI * 2);
        rectMode(CENTER);
        fill(200, 100, 255, this.lifespan);
        stroke(255, this.lifespan);
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        square(0, 0, 12);
        pop();
    }
}

// Firework subclass with expanding/shrinking stars
class Firework extends Particle {
    constructor(x, y) {
        super(x, y);
        this.size = random(6, 12);
    }

    update() {
        super.update();
        this.size = this.size + sin(frameCount * 0.2) * 0.5; // Dynamic size change
    }

    show() {
        stroke(255, 200, 50, this.lifespan);
        fill(255, 100, 0, this.lifespan);
        push();
        translate(this.position.x, this.position.y);
        drawStar(0, 0, this.size, this.size * 2, 5);
        pop();
    }
}

// Function to draw a star
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
