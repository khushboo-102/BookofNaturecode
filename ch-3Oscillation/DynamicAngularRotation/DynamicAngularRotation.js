// Initialize the angle variable, which will determine the current rotation
let angle = 0;
// Initialize the angular velocity, which controls how fast the angle changes
// let angleV = 0;
let angleV = 0.4;
//Initialize the angular acceleration, which controls how fast the angle changes
let angleA = 0;
// let angleA = 0.01;
function setup() {
    createCanvas(400, 400) // Create a 400x400 pixel canvas
    angleMode(RADIANS)  // Set the angle mode to RADIANS
}
function draw() {

    // Dynamically adjust the angular acceleration based on the mouse's X position
    // As the mouse moves, the angular acceleration will map between -0.01 and 0.01
    angleA = map(mouseX, 0, width, -0.01, 0.01)
    // Constrain the angular velocity to ensure it doesn't exceed the range of -0.5 to 0.5
    angleV = constrain(angleV, -0.5, 0.5)
    // Set the background color
    background(146, 83, 161)
    // Set the fill color for the rectangle
    fill(240, 99, 264)
    // Set the rectangle's drawing mode to CENTER
    rectMode(CENTER)
    // Move the origin of the canvas to the center
    translate(200, 200)
    // Rotate the canvas by the current angle

    rotate(angle)
    // Draw a rectangle centered at the new origin
    rect(0, 0, 256, 32);
    // Update the angular velocity by adding the angular acceleration
    angle += angleV;
    angleV += angleA;
}