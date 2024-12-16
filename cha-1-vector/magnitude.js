
//set the canvas
function setup() {
    createCanvas(1850, 950);
}
function draw() {
    background("orange");

    let mouse = createVector(mouseX, mouseY);//store the current position of mouse in verctor format
    let center = createVector(width / 2, height / 2);//set the center of canvas
    mouse.sub(center);
    let m = mouse.mag();//calculate the length(magnitude) of mouse 
    fill("pink");
    rect(0, 0, m, 20); // m is the distance btw mouse and center
    translate(width / 2, height / 2);
    stroke("brown")
    line(0, 0, mouse.x, mouse.y);
}

