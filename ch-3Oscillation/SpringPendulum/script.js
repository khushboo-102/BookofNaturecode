let bob; // The moving end of the spring
let anchor; // The fixed point of the spring
let velocity; // The velocity of the bob
let restLength = 170; // The natural length of the spring
let k = 0.010 ; // Spring constant (Hooke's Law)
let gravity; // Gravity force applied to the bob

function setup() {
    createCanvas(600, 450);
    
    // Initialize the bob's position
    bob = createVector(350, 0);
    
    // Initialize the anchor's position
    anchor = createVector(300,200);
    
    // Initialize velocity and gravity vectors
    velocity = createVector(0, 0);
    gravity = createVector(0, 0.01);
}

function draw() {
    background(112, 50, 126); // Set background color
    
    // Draw the spring (line connecting anchor to bob)
    strokeWeight(4);
    stroke(255);
    line(anchor.x, anchor.y, bob.x, bob.y);
    
    // Draw anchor point
    fill(45, 197, 244);
    circle(anchor.x, anchor.y, 35);
    
    // Draw bob
    circle(bob.x, bob.y, 65);

    // Allow the user to move the bob when the mouse is pressed
    if (mouseIsPressed) {
        bob.x = mouseX;
        bob.y = mouseY;
        velocity.set(0, 0); // Reset velocity to avoid instant snapping
    }

    // Calculate the spring force using Hooke's Law
    let force = p5.Vector.sub(bob, anchor); // Vector from anchor to bob
    let x = force.mag() - restLength; // Displacement from rest length
    force.normalize(); // Convert to unit vector
    force.mult(-1 * k * x); // Apply Hooke's Law (F = -kx)

    // Apply forces to velocity
    velocity.add(force); // Add spring force
    velocity.add(gravity); // Add gravity

    // Update bob's position
    bob.add(velocity);

    // Apply damping (optional, but velocity.mult(1) does nothing)
    velocity.mult(1); 
}
