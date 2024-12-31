let mover;

function setup() {
    createCanvas(1400, 800)  //create the canvas for animation
    mover = new Mover(600, 400)  // Initialize the Mover object at position (200, 200)
}
function draw() {
    background("green")  //set the background color

    if (mouseIsPressed) {
        let gravity = createVector(0, 1)
        mover.applyForce(gravity);
    }
    //  let gravity = createVector(0,1);
    //  mover.applyForce(gravity)
    mover.update();
    mover.edges();
    mover.show();
}

class Mover {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0);
    }
    applyForce(force) {
        this.acc = force;
    }

    edges() {
        if (this.pos.y >= height) {
            this.pos.y = height
            this.vel.y *= -1;
        }
    }


    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
    }
    show() {
        stroke(225)
        strokeWeight(2)
        fill(255, 100)
        ellipse(this.pos.x, this.pos.y, 32)
    }
}
