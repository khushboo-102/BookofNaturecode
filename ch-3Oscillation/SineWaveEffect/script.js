let angle = 0;// Initialize the angle to 0
function setup(){
    createCanvas(400,400) // Create a 400x400 pixel canvas
}
function draw (){
    background(0,10) // Set a semi-transparent black background for the trail effect
    translate(200,200) // Set a semi-transparent black background for the trail effect
    fill(252,235,33) // Set the fill color to yellow
    let r = sin(angle)*200; /// Calculate the radius based on the sine of the angle
    circle(0,0,r *2) // Draw a circle with diameter equal to twice the radius
    angle +=0.1 // Increment the angle for the animation
}

