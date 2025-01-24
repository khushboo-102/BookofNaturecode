// // ============Spiraling Point Animation==========================
let angle = 0; // Initialize the angle variable to control the point's rotation
let r = 15  // Set the initial radius of the spiral
function setup() {
    createCanvas(400, 400); // Create a canvas of size 400x400
    background(154, 0, 0); // Set the background color
}
function draw() {
    translate(200, 200); // Move the origin to the center of the canvas
    strokeWeight(10); // Set the thickness of the point
    stroke(255, 238, 33) // Set the color of the point to yellow
    // Calculate the x and y positions of the point using trigonometry
    let x = r * cos(angle)
    let y = r * sin(angle)
    point(x, y) // Draw the point at the calculated position
    angle += 0.04 // Increment the angle to create the rotation
    r += 0.2
}
