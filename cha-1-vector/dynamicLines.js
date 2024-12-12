function setup() {
  createCanvas(400, 400);
  background(0)
  
}

function draw() {

  translate(width /2 ,height/2)
  // let v = createVector(random(-250,50),(random(-250,100)));
  v = p5.Vector.random2D();
  v.mult(random(-50,100))
  strokeWeight(4)
  stroke(255)
  // fill("green")
  line(0,0,v.x,v.y)
}