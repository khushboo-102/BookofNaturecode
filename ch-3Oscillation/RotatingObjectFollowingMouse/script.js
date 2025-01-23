let mover; // Declare a variable to hold the Mover object
function setup() {
    createCanvas(600, 400); //create a canvas size of 600 X 400
    mover = new Mover(); // Instantiate the Mover object
}

 function draw() {
    background(220);//set the background color

    mover.update(); // Update the position of the mover based on the current acceleration
    mover.show();   // Display the mover on the canvas
}

class Mover {
    // Constructor initializes the mover's position, velocity, acceleration, and topspeed
    constructor() {
        this.position = createVector(width / 2, height / 2);  // center of the canvas
        this.velocity = createVector();  // Initial velocity set to 0
        this.acceleration = createVector(); // Initial acceleration set to 0
        this.topspeed = 4; // Maximum speed limit for the mover
    }
    

    // The update() function updates the position of the mover
    update() {
        let mouse = createVector(mouseX, mouseY);   // Create a vector for the mouse position
        let direction = p5.Vector.sub(mouse, this.position); // Calculate the direction from the mover to the mouse

        direction.normalize(); // Normalize the direction vector (set its length to 1)
        direction.mult(0.2); // Scale the acceleration to control the mover's responsiveness

        this.acceleration = direction; // Set the mover's acceleration to the calculated direction

        this.velocity.add(this.acceleration);  // Update the velocity based on acceleration
        this.velocity.limit(this.topspeed); // Limit the velocity to the maximum speed
        this.position.add(this.velocity);  // Update the position based on the velocity
    

    }


    show() {
        //{!1} Solve for the angle by using atan().
        let angle = atan(this.velocity.y / this.velocity.x);
        stroke(0);
        fill(175);
        push();
        rectMode(CENTER);// Set the rectangle mode to draw from the center
        translate(this.position.x, this.position.y);  // Move the origin to the mover's position
        //{!1} Rotate according to that angle.
        rotate(angle); // Rotate the rectangle based on the calculated angle
        rect(0, 0, 30, 10); // Draw the rectangle
        pop(); // Restore the original drawing state
      }
}