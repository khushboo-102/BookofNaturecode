let r = 100; /// Set the radius of the shap
function setup() {
    createCanvas(400, 400)// Create a canvas of size 400x400
}
function draw() {
    background(0, 10) //set the background
    translate(200, 200) //Move the origin to the center of the canvas
    stroke(255) // Set the stroke color to white
    strokeWeight(4) // Set the thickness of the stroke
    noFill()
    // Map the mouseX position to control the angle increment dynamically
    let increment = map(mouseX, 0, width, 0.01, PI);
    beginShape() // Begin defining the shape
        // Loop through angles from 0 to TWO_PI to create the polygon
    for (let a = 0; a < TWO_PI; a += increment) {
        let x = r * cos(a) // Calculate the x-coordinate
        let y = r * sin(a) // Calculate the y-coordinate
        vertex(x, y) // Define the vertex at the calculated coordinates
        // point(x,y)
        endShape(CLOSE);// Close the shape to form a complete polygon
    }
}