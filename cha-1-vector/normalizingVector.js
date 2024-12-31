function setup() {
    createCanvas(1500, 800)
}
function draw() {
    background("pink");

    let mouse = createVector(mouseX, mouseY);
    let center = createVector(width / 2, height / 2);
    mouse.sub(center);
    //first line 
    translate(width / 2, height / 2);
    stroke("brown");
    line(0, 0, mouse.x, mouse.y);
    mouse.normalize();
    mouse.mult(100);
    //second line
    stroke("green");
    strokeWeight(10);   
    line(0, 0, mouse.x, mouse.y);
}