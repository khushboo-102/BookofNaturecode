
let circles = [];

function setup() {
  createCanvas(800, 600); // create a canvas size of 800 X 600
  // Create multiple circles with random properties
  for (let i = 0; i < 60; i++) {
    circles.push(new MovingRotatingCircle(random(width), random(height), random(5, 20))); 
  }
}

function draw() {
  background("black"); // Clear the canvas with a black background
  
  // Draw the static red circle at the center first
  fill("red");
  stroke("white");
  strokeWeight(4)
  ellipse(width / 2, height / 2, 50); // Red circle with a radius of 25

  // Update and display each circle (drawn above the red circle)
  for (let circle of circles) {
    circle.update();
    circle.show();
  }
}

class MovingRotatingCircle {
  constructor(x, y, radius) {
    this.position = createVector(x, y); // Position of the circle (x, y)
    this.radius = radius;  // Radius of the circle
    this.angle = random(TWO_PI); // Initial random angle for rotation
    this.rotationSpeed = random(0.01, 0.05); // Random rotation speed
    // Increased speed by changing the range to random(-8, 8)
    this.velocity = createVector(random(-8, 8), random(-8, 8)); // Increased movement speed
  }

  update() {
    // Update the rotation angle
    this.angle += this.rotationSpeed;
    // Move the circle by adding the velocity to its position
     this.position.add(this.velocity);
    // Wrap around when the circle goes out of bounds (reset its position to the opposite side)
     if (this.position.x < -this.radius) {
      this.position.x = width + this.radius; // Wrap to the right side
    } else if (this.position.x > width + this.radius) {
      this.position.x = -this.radius; // Wrap to the left side
    }

    if (this.position.y < -this.radius) {
      this.position.y = height + this.radius; // Wrap to the bottom
    } else if (this.position.y > height + this.radius) {
      this.position.y = -this.radius; // Wrap to the top
    }
  }
    // Draw the circle above the red circle
    show() {
    stroke("blue");
    strokeWeight(1)
    fill(200);
    ellipse(this.position.x, this.position.y, this.radius * 2);// Draw the circle as ellipse at its position


    // Draw the rotating line inside the circle
    push();
    translate(this.position.x, this.position.y);// Move the origin to the circle's center
    rotate(this.angle); // Rotate the line by the current angle
    strokeWeight(2);
    line(0, 0, this.radius, 0); // Line from center to edge of the circle
    pop();  // Restore the previous transformation state
  }
}

// let circles = [];

// function setup() {
//   createCanvas(800, 600); // Canvas size
//   // Create multiple circles with random properties
//   for (let i = 0; i < 20; i++) {
//     circles.push(new MovingRotatingCircle(random(width), random(height), random(5, 30))); // Reduced size range
//   }
// }

// function draw() {
//   background("black"); // Clear the canvas with a black background
  
//   // Draw the static red circle at the center first
//   fill(255, 0, 0);
//   noStroke();
//   ellipse(width / 2, height / 2, 50); // Red circle with a radius of 25

//   // Update and display each circle (drawn above the red circle)
//   for (let circle of circles) {
//     circle.update();
//     circle.show();
//   }
// }

// class MovingRotatingCircle {
//   constructor(x, y, radius) {
//     this.position = createVector(x, y);
//     this.radius = radius;
//     this.angle = random(TWO_PI); // Initial random angle
//     this.rotationSpeed = random(0.01, 0.05); // Random rotation speed
//     this.velocity = createVector(random(-8, 8), random(-8, 8)); // Increased movement speed
//   }

//   update() {
//     // Update the rotation angle
//     this.angle += this.rotationSpeed;

//     // Move the circle
//     this.position.add(this.velocity);

//     // Random chance to reset the circle's position early before it touches the boundary
//     if (random() < 0.02) { // 2% chance to reset
//       this.position.x = random(width);  // Reset X position
//       this.position.y = random(height); // Reset Y position
//     }

//     // Wrap around when the circle goes out of bounds
//     if (this.position.x < -this.radius) {
//       this.position.x = width + this.radius; // Wrap to the right side
//     } else if (this.position.x > width + this.radius) {
//       this.position.x = -this.radius; // Wrap to the left side
//     }

//     if (this.position.y < -this.radius) {
//       this.position.y = height + this.radius; // Wrap to the bottom
//     } else if (this.position.y > height + this.radius) {
//       this.position.y = -this.radius; // Wrap to the top
//     }
//   }

//   show() {
//     // Draw the circle above the red circle
//     stroke(0);
//     fill(200);
//     ellipse(this.position.x, this.position.y, this.radius * 2);

//     // Draw the rotating line inside the circle
//     push();
//     translate(this.position.x, this.position.y);
//     rotate(this.angle);
//     strokeWeight(2);
//     line(0, 0, this.radius, 0); // Line from center to edge of the circle
//     pop();
//   }
// }
