let angles= []; // Array to store angles for each point's position along the wave
let angleV = [];  // Array to store the angular velocity (speed) for each point
let r = 4;  // Radius for the small circles (although circles are not drawn in this version)

function setup(){
    createCanvas(600,400)  // Set up the canvas (600x400)
    let total = floor(width / (r * 2)); // Calculate the number of points based on the width of the canvas
    // Initialize the angles and angular velocities for each point
    for (let i =0; i<total +1; i++){
        angles[i] = map(i,0,total,0,2*TWO_PI); // Map angles from 0 to 2π for the full wave
        angleV[i] = i/200  // Set each point's speed based on its index
    }
}
function draw(){
    background(204,255,255) // Set the background color
    translate(300,200); // Move the origin to the center of the canvas
    noFill();
    //  fill(252,238,33)
    stroke(252,238,33); // Set the stroke color for the wave
    beginShape(); // Begin drawing the wave shape
        // Loop through each point in the wave
    for(let i=0;i<angles.length;i++){
        let y = map(sin(angles[i]) ,-1,1,-200,200) // Use sine wave to calculate the y-position
        strokeWeight(4); // Set stroke thickness for drawing the wave
        let x = map(i,0,angles.length,-300,300); // Space points evenly along the x-axis
        vertex(x,y); // Add a vertex at (x, y) for the wave
        // circle(x,0,r * 2)
        angles[i] += angleV[i] // Increment the angle based on the point's velocity                                                                                                                                  
        // angles[i]+=0.02
    }

    endShape(); // End the shape drawing
}                                                                                                                                                           