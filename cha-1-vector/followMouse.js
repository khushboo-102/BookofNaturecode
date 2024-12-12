let mover;
function setup() {
    createCanvas(800, 800)
 
    mover = new Mover();
}
function draw() {
    background(51, 255, 255)
    mover.update();
    mover.show();
}
class Mover {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.topspeed = 5;
    }
    update() {
        let mouse = createVector(mouseX, mouseY)
        this.acceleration = p5.Vector.sub(mouse, this.position)
        this.acceleration.setMag(6)

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topspeed);
        this.position.add(this.velocity);

    }
    show() {
        fill("yellow");
        stroke("yellow")
        strokeWeight(3)
        ellipse(this.position.x, this.position.y, 60); // Draw the mover as a circle
    }
}