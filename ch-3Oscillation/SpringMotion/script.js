//==============for horizontal=====================
// let x =400; 
// let velocity = 0; 
// let restLength = 200;
// let k = 0.01;
// function setup(){
//      createCanvas(600,400)
// }
// function draw(){
//     background(112,50,126);
//     noStroke();
//     fill(145,197,244);
//     circle(x,200,60);
//     let y = x- restLength;
//     let force = - k * y;
//     velocity += force;
//     x += velocity;
//     velocity *= 0.99
// }




////=====================for vertical ===============
let y =400; // Initial position of the circle
let velocity = 0;  // Initial velocity
let restLength = 200; // Rest position of the spring
let k = 0.01; // Spring constant 
function setup(){
     createCanvas(600,400) // Create a canvas of 600x400 pixels 
}
function draw(){
    background(112,50,126);  // Set background color
    noStroke();
    fill(145,197,244); // Set circle color
    circle(300,y,60); // Draw the circle at position (300, y)
    let x = y- restLength; // Displacement from rest position
    let force = - k * x;  // Hooke's Law: F = -k * x    
    velocity += force; // Apply force to velocity
    y += velocity; // Update position based on velocity
    velocity *= 0.99 // Apply damping to slow down motion over time

}