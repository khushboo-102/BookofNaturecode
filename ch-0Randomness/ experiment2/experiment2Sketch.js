let rectX = 0; // Initial X position of the rectangle
let speed = 5; // Speed of the rectangle
let rectCount = 10; // Number of rectangles to display
let rectWidth = 100; // Width of the rectangle
let rectHeight = 50; //height of the rectangle

function setup() {
    createCanvas(1850, 950); // Create a canvas of 1850 X 950
}

function draw() {
    background(173, 204, 255); // background color
    fill(178, 102, 255); // Set rectangle color
    // rect(rectX, 400, 100, 50); // Draw the rectangle (x, y, width, height)
 

    for (let i = 0; i < rectCount; i++) {
        let currentX = rectX + (i * 250); // Offset each rectangle by 200px for visibility
        rect(currentX, 400, rectWidth, rectHeight); // Draw the rectangle
    }
    rectX += speed; // Move the rectangle rightside

    // If the rectangle moves beyond the canvas width, reset to the left
    if (rectX > width) {
        rectX = 0;
    }

    //Heading
    textSize(40)
    stroke(178, 102, 255)
    strokeWeight(2)
    text("Moving rectangles right side", 700, 90)
}