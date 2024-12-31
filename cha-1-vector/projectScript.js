 


let stars = [];  // Array to store star objects

function setup() {
  createCanvas(1800, 950);

  // Create stars with random positions and velocities
  for (let i = 0; i < 100; i++) {
    let star = new Star(random(width), random(height), random(-1, 1), random(-1, 1));
    stars.push(star);
  }
}

function draw()  {
  background(0);  
   for (let star of stars) {
    star.update();  // Update star position
    star.display(); // Display the star
  }
}

class Star {
  constructor(x, y, velX, velY) {
    this.position = createVector(x, y);  // Position vector
    this.velocity = createVector(velX, velY);  // Velocity vector for movement
    this.size = random(1, 3);  // Random initial size
    this.alpha = random(100, 255);  // Random transparency for glowing effect
    this.glow = random(1, 2);  // Random initial glow intensity
  }

   update() {
     this.position.add(this.velocity);

     this.velocity.add(createVector(random(-0.1, 0.1), random(-0.1, 0.1)));

     if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;  
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;      }

     this.glow += random(-0.02, 0.02);   
    this.glow = constrain(this.glow, 1, 2); 
  }

   display() {
    noStroke();
    fill(255, 255, 255, this.alpha); 
    ellipse(this.position.x, this.position.y, this.size * this.glow, this.size * this.glow);   }
}





 
