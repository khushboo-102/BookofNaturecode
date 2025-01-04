let mover;

function setup() {
    createCanvas(1400, 800)  //create the canvas for animation
    mover = new Mover(600, 400)  // create a  Mover object at position (200, 200)
}
function draw() {
    background("green")  //set the background color
    //condition     
    if (mouseIsPressed) {
        let gravity = createVector(0, 1)
        mover.applyForce(gravity); //apply the gravity in mover
    }
    //  let gravity = createVector(0,1);
    //  mover.applyForce(gravity)
    mover.update(); //update the postion and velocity of mover
    mover.edges(); //check if the mover hit the bottom of canvas then mover reverse as bounce effect
    mover.show(); //show the mover on canvas
}

class Mover {
    constructor(x, y) {
        this.pos = createVector(x, y) //position of mover
        this.vel = createVector(0, 0); //velocity of mover
    }
    applyForce(force) {
        this.acc = force; //set the acceleration to the applied force

    }
    // condition to check if the mover hit the bottom of canvas
    edges() {
        if (this.pos.y >= height) {
            this.pos.y = height //Set the position to the bottom edge
            this.vel.y *= -1; //Reverse the vertical velocity (bounce)
        }
    }


    update() {
        this.vel.add(this.acc)  //add the acceleration to velocity
        this.pos.add(this.vel) //add the velocity to position
    }
    //show the mover as ellipse
    show() {
        stroke(225) // set the stroke of mover
        strokeWeight(2) //set the strokeWeight of mover
        fill("pink") // set the color of mover
        ellipse(this.pos.x, this.pos.y, 30) //mover as a ellipse
    }
}
