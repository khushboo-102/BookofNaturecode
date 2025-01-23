//  let angle = 0; // Initialize the angle variable to control the point's rotation
// function setup() {
//     createCanvas(400, 400) // Create a canvas of size 400x400
// }
// function draw() {
//     background(255 ,204,229) // Set the background color
//     stroke(255); // Set the stroke color to white for the outer circle
//     strokeWeight(4) // Set the stroke thickness for the outer circle
//     noFill()
//     translate(200, 200) // Move the origin to the center of the canvas
//     let r = 150; // Set the radius of the circle
//     circle(0, 0, r * 2) // Draw the outer circle with a diameter of r * 2
//     strokeWeight(33);  // Increase stroke thickness for the rotating point
//     stroke(252, 238, 33); // Set the stroke color for the rotating point to yellow
//      // Calculate the x and y positions of the rotating point using trigonometry
//     let x = r * cos(angle)
//     let y = r * sin(angle)
//     point(x, y) // Draw the rotating point at the calculated position
//        angle += 0.07; // Increment the angle rotate speed 

// }


//============Spiraling Point Animation==========================
// let angle = 0; // Initialize the angle variable to control the point's rotation
// let r = 15  // Set the initial radius of the spiral
// function setup() {
//     createCanvas(400, 400); // Create a canvas of size 400x400
//     background(154, 0, 0); // Set the background color
// }
// function draw() {
//     translate(200, 200); // Move the origin to the center of the canvas
//     strokeWeight(10); // Set the thickness of the point
//     stroke(255, 238, 33) // Set the color of the point to yellow
//     // Calculate the x and y positions of the point using trigonometry
//     let x = r * cos(angle)
//     let y = r * sin(angle)
//     point(x, y) // Draw the point at the calculated position
//     angle += 0.04 // Increment the angle to create the rotation effect=
//     r += 0.2
// }


//===============Exercise 3.5 =======================
let r = 1; // Initial radius of the spiral
let angle = 0; // Initial angle

function setup() {
    createCanvas(400, 400); // Create a canvas of size 400x400
    background(0); // Set the background color to black
}

function draw() {
    translate(width / 2, height / 2); // Move the origin to the center of the canvas
    stroke(255); // Set the stroke color to white
    strokeWeight(2); // Set the stroke thickness

    let x = r * cos(angle); // Calculate the x-coordinate of the point
    let y = r * sin(angle); // Calculate the y-coordinate of the point

    point(x, y); // Draw the point at the calculated position

    angle += 0.1; // Increment the angle for rotation
    r += 0.1; //  this is the added line!
}