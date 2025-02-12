let emitter;
function setup(){
    createCanvas(600,400);
    emitter = new Emitter(width / 2, 20);
}
function draw(){
    background(102,102,53);
    emitter.addParticle();
    emitter.run();
}
class Emitter {
    constructor(x, y) {
      this.origin = createVector(x, y);
      this.particles = [];
    }
  
    addParticle() {
      let r = random(1);
      if (r < 0.5) {
        this.particles.push(new Particle(this.origin.x, this.origin.y));
      } else {
        this.particles.push(new Confetti(this.origin.x, this.origin.y));
      }
    }
  
    run() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i];
        p.run();
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }
  class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(random(-1, 1), random(-1, 0));
      this.lifespan = 255.0;
    }
  
    run() {
      let gravity = createVector(0, 0.05);
      this.applyForce(gravity);
      this.update();
      this.show();
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    // Method to update position
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
      this.acceleration.mult(0);
    }
  
    // Method to display
    show() {
      stroke(0, this.lifespan);
      strokeWeight(2);
      fill(127, this.lifespan);
      circle(this.position.x, this.position.y, 8);
    }
  
    isDead() {
      return this.lifespan < 0.0;
    }
  }
  class Confetti extends Particle {
    // Override the show method
    show() {
      let angle = map(this.position.x, 0, width, 0, TWO_PI * 2);
  
      rectMode(CENTER);
      fill(127, this.lifespan);
      stroke(0, this.lifespan);
      strokeWeight(2);
      push();
      translate(this.position.x, this.position.y);
      rotate(angle);
      square(0, 0, 12);
      pop();
    }
  }
  