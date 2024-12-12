

// Instead of a bunch of floats, you now have just two variables.
let position;
let velocity;
let mover;

function setup() {
  createCanvas(800, 600);
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
  circle(position.x, position.y, 50);

  fill("red")
//   square(770,200,170)
//   square(-140,200,170)
rect(770,200,30,200)
rect(-1,200,30,200)


}


// let mover;
// function setup() {
//     createCanvas(800, 600)

//     mover = new Mover();
// }
// function draw() {
//     background("pink")
//     mover.update()
//     mover.show()
// }

// class Mover {
//     constructor() {
//         this.position = createVector(width / 2, height / 2)
//         this.velocity = createVector(2.5, 2)
//     }

//     update() {
//         let mouse = createVector(mouseX, mouseY);
//         // this.position.add(this.velocity);
//     }
//     show() {
//         fill("green")
//         stroke("black")
//         rect(770, 200, 30, 200)
//         rect(-1, 200, 30, 200)
//         // You still sometimes need to refer to the individual components of a p5.Vector and can do so using the dot syntax: position.x, velocity.y, and so forth.
//         // if (position.x > width || position.x < 0) {
//         //     velocity.x = velocity.x * -1;
//         // }
//         // if (position.y > height || position.y < 0) {
//         //     velocity.y = velocity.y * -1;
//         // }

//         stroke(0);
//         fill(127);
//         circle(this.position.x, this.position.y, 50);
//     }

// }