function setup() {
    createCanvas(2000, 950); //set the canvas
}
function draw() {
    background("orange");

    let mouse = createVector(mouseX, mouseY);//store the current position of mouse in verctor format
    let center = createVector(width / 2, height / 2);//set the center of canvas
    mouse.sub(center);
    let m = mouse.mag();//calculate the length(magnitude) of mouse 
    fill("pink");
    rect(0, 20,1800, m); // m is the distance btw mouse and center
    translate(width / 2, height / 2);
    stroke("brown")
    line(0, 0, mouse.x, mouse.y);
}

