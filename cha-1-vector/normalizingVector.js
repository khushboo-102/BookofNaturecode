function setup() {
    createCanvas(1500, 800)
}
function draw() {
    background("pink");

    let mouse = createVector(mouseX, mouseY);
    let center = createVector(width / 2, height / 2);
    mouse.sub(center);

    translate(width / 2, height / 2);
    stroke(200);
    line(0, 0, mouse.x, mouse.y);
    mouse.normalize();
    mouse.mult(50);
    fill("pink")
    stroke(0);
    strokeWeight(8);
    line(0, 0, mouse.x, mouse.y);
}