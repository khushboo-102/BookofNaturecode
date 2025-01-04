let mover;

function setup() {
    createCanvas(1000, 600);  //set the canvas(1000 ,600)pixels

    mover = new Mover(400, 200, 4); //create a mover object at position (400,200) with 4 mass
}

function draw() {
    background("orange"); // set the canvas's background color

    let gravity = createVector(0, 0.1); // Create a gravity vector with no horizontal force (x = 0) and a vertical downward force (y = 0.1)
    mover.applyForce(gravity); //  apply the gravity force in mover

    if (mouseIsPressed) {
        let wind = createVector(0.1, 0); // create a wind force vector 
        mover.applyForce(wind); //apply the wind in mover
    }

    mover.update(); // update the velocity and position of mover
    mover.show(); // show the mover on canvas
    mover.edges(); // check if the mover hit any edges, the mover reverse vertical velocity
}

class Mover {
    constructor(x, y, mass) {
        this.pos = createVector(x, y); //postion of mover
        this.vel = createVector(0, 0); //velocity of mover
        this.acc = createVector(0, 0); //acceleration of mover
        this.mass = mass; // mass of mover
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass); //second law of newton (divide the force by the object's mass to get acceleration)
        this.acc.add(f); // add the acceleration to mover's acceleration
    }

    update() {
        this.pos.add(this.vel); // add the velocity to position
        this.vel.add(this.acc); // add acceleration to velocity
        this.acc.set(0, 0); //reset the acceleration
    }
    show() {
        stroke("white"); 
        fill("black");
        circle(this.pos.x, this.pos.y, this.mass * 15); //create a mover as circle
    }
    //conditon to check if the mover hits any edges, mover reverse vertical velocity
    edges() {
        if (this.pos.x >= width || this.pos.x <= 0) {
            this.vel.mult(-1);
        }
        else if (this.pos.y >= height || this.pos.y <= 0) {
            this.vel.mult(-1);
        }
    }
}