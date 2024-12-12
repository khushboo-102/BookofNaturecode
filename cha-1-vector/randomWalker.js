let walker;
function setup() {
    createCanvas(1500, 900);
    background(0);
    walker = new Walker(width / 2, height / 2);

}
function draw() {
    walker.update();
    walker.show();

}

class Walker {
    constructor(x, y) {
        this.pos = createVector(x, y);
        // this.vel = createrVector(1,-1)
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(3))
    }
    update() {
        this.pos.add(this.vel);
    }
    show() {
        stroke("white");
        strokeWeight(2);
        fill("green")
        circle(this.pos.x, this.pos.y, 32);
    }
}
