let mover;

function setup() {
    createCanvas(800, 600); //set the canvas of 800 X 600 pixel

    mover = new Mover(400, 200, 4); // Create a new Mover object at position (400, 200) with mass 4
}
function draw() {
    background(255, 153, 153); // set the backgroud color of canvas 

    let gravity = createVector(0, 0.1); // Create a gravity vector
    mover.applyForce(gravity); /// Apply gravity force to the mover object

    // If the mouse is pressed, apply a wind force to the right
    if (mouseIsPressed) {
        let wind = createVector(0.1, 0); //create wind force
        mover.applyForce(wind); // Apply the wind force to the mover object
    }

    mover.update(); // Update the position and velocity of the mover object
    mover.show(); // Display the mover object on the canvas
    mover.checkEdges(); // Check if the mover has hit the edges of the canvas then mover bounce

}

class Mover {
    constructor() {
        this.mass = 1; // Set the mass of the object to 1  
        this.position = createVector(width / 2, 30);  // Set the initial position of the mover to the center of the canvas horizontally and a bit above vertically
        this.velocity = createVector(0, 0);  // Initial velocity is zero
        this.acceleration = createVector(0, 0); // Initial acceleration is zero
    }

    // Newton’s second law
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);  // Add the acceleration to the object's existing acceleration
    }


    // Update the position and velocity of the mover based on the current acceleration
    update() {
        this.velocity.add(this.acceleration); // Add acceleration to velocity
        this.position.add(this.velocity); // Add velocity to position to move the object
        this.acceleration.mult(0); // Reset the acceleration to 0 for the next frame
    }

    // Function to display the mover object on the canvas
    show() {
        stroke(0);
        fill(175);
        circle(this.position.x, this.position.y, this.mass * 16);  // Draw the mover as a circle with size proportional to its mass

    }

    // Check if the mover has hit the edges of the canvas, and make it bounce back
    checkEdges() {
        // Check if the mover has hit the right edge of the canvas
        if (this.position.x > width) {
            this.position.x = width;
            this.velocity.x *= -1;
        }
        // Check if the mover has hit the left edge of the canvas
        else if (this.position.x < 0) {
            this.velocity.x *= -1;
            this.position.x = 0;
        }
        // Check if the mover has hit the bottom edge of the canvas
        if (this.position.y > height) {
             this.velocity.y *= -1;
            this.position.y = height;
        }
    }
}