let balloon;

function setup() {
    createCanvas(1200, 800);
    balloon = new Balloon(500, 400, 1);
}
function draw() {
    background(0, 153, 153);

    let helium = createVector(0, -0.05);

    let windStrength = noise(frameCount * 0.01) * 0.2 - 0.1; // Varies between -0.1 and 0.1

    let wind = createVector(windStrength, 0);


    balloon.applyForce(helium);
    balloon.applyForce(wind);


    balloon.update();
    balloon.edges();
    balloon.show();
}

class Balloon {
    constructor(x, y, mass) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.mass = mass;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    edges() {
        if (this.pos.y <= 0 || this.pos.y >= height) {
            this.vel.y *= -1;
        }
        else if (this.pos.x >= width || this.pos.x <= 0) {
            this.vel.x *= -1;
        }
    }
    show() {
        fill(255, 0, 100);
        ellipse(this.pos.x, this.pos.y, this.mass * 50, this.mass * 60);

        fill(255, 0, 100);
        triangle(this.pos.x - 5, this.pos.y + 30, this.pos.x + 5, this.pos.y + 30, this.pos.x, this.pos.y + 50);

        stroke(204, 0, 102);
        strokeWeight(1.5);
        line(this.pos.x, this.pos.y + 50, this.pos.x, this.pos.y + 100);

    }
}