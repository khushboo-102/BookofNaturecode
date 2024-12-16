

// Instead of a bunch of floats, you now have just two variables.
let position;
let velocity;
let mover;

function setup() {
  createCanvas(800, 600);
  // Note that createVector() has to be called inside setup().
  position = createVector(100, 100);
  velocity = createVector(2.5,5);
}

function draw() {
  background("pink");
  position.add(velocity);

  // You still sometimes need to refer to the individual components of a p5.Vector and can do so using the dot syntax: position.x, velocity.y, and so forth.
  if (position.x > width || position.x <0) {
    velocity.x = velocity.x * -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y = velocity.y * -1;
  }

  stroke(0);
  fill(127);
  circle(position.x, position.y, 50);

  fill("red")
//   square(770,200,170)
//   square(-140,200,170)
rect(770,mouseY,30,200)  //
rect(-1,position.y,30,200)

}
// let position;
// let velocity;

// function setup() {
//   createCanvas(800, 600);
//   position = createVector(100, 100);  // Ball ka initial position
//   velocity = createVector(2.5, 5);    // Ball ki initial velocity
// }

// function draw() {
//   background("pink");

//   // Ball ka position update karna
//   position.add(velocity);

//   // Ball ka collision detection for horizontal walls
//   if (position.x > width || position.x < 0) {
//     velocity.x = velocity.x * -1;  // Velocity ko reverse kar rahe hain (ball ka direction change)
//   }

//   // Ball ka collision detection for vertical walls
//   if (position.y > height || position.y < 0) {
//     velocity.y = velocity.y * -1;  // Velocity ko reverse kar rahe hain (ball ka direction change)
//   }

//   // Ball ko canvas par draw karna
//   stroke(0);
//   fill(127);
//   circle(position.x, position.y, 50);  // Ball ka circle

//   // Rectangle ki position aur size define karna
//   fill("red");
//   rect(770, mouseY, 30, 200);  // Right side ka red rectangle
//   rect(-1, position.y, 30, 200); // Left side ka red rectangle

//   // Ball aur right rectangle ke saath collision detect karna
//   if (position.x + 25 > 770 && position.x - 25 < 770 + 30 && position.y > mouseY && position.y < mouseY + 200) {
//     velocity.x = velocity.x * -1;  // Ball ka velocity reverse ho jayega jab right rectangle se takraaye
//   }

//   // Ball aur left rectangle ke saath collision detect karna
//   if (position.x - 25 < 30 && position.x + 25 > -1 && position.y > position.y && position.y < position.y + 200) {
//     velocity.x = velocity.x * -1;  // Ball ka velocity reverse ho jayega jab left rectangle se takraaye
//   }
// }
