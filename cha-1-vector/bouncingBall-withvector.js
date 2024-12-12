// Instead of a bunch of floats, you now have just two variables.
let position;
let velocity;

function setup() {
  createCanvas(1500, 900);
  // Note that createVector() has to be called inside setup().
  position = createVector(100, 100);
  velocity = createVector(2.5,2);
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
  circle(position.x, position.y, 20);
}