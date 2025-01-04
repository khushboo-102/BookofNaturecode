//declear the two object
let moverA;
let moverB;

function setup() {
    createCanvas(1200, 800); //create a canvas of size 1200X800

    moverA = new Mover(400, 200, 4); //create a mover with mass 4
    moverB = new Mover(700, 200, 4); //create a mover with mass 4
}

function draw() {
    background(153, 153, 0); //set the backgroundColor

    let wind = createVector(0, 0.2); //create a wind force
    moverA.applyForce(wind); //apply the wind force in moverA
    moverB.applyForce(wind); // apply the wind force in moverB
    
    // conditon for mouse pressed
    if (mouseIsPressed) {
        let upwardForce = createVector(0, 2); //create a upward force when mouse is pressed
        moverA.applyForce(upwardForce); // apply the upward force in moverA
        moverB.applyForce(upwardForce); // apply the upward force in moverB
    }

    moverA.update(); // this function update the position and velocity of moverA
    moverA.edges(); // this function use for check for edges and put bouncing effect in moverA
    moverA.show(); // this function show the moverA on canvas

    moverB.update(); //this function update the position and velocity of moverB
    moverB.edges(); //his function use for check for edges and put bouncing effect in moverB
    moverB.show(); //this function shows the moverB on canvas
}

class Mover {
    constructor(x, y, m) {
        this.pos = createVector(x, y); //position of mover
        this.vel = createVector(0, 0); //velocity of mover
        this.acc = createVector(0, 0); //acceleration of mover
        this.mass = m; // mass of mover
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);  //Newton's second law for divide the force by mass to get acceleration
        this.acc.add(f); // add the aceleration in mover's acceleration
    }

    update() {
        this.vel.add(this.acc); //add acceleration to velocity
        this.pos.add(this.vel); //add velocity to position
        this.acc.set(0, 0); //set the acceleration to zero for the next frame
    }

    show() {
        fill("white");
        circle(this.pos.x, this.pos.y, this.mass * 10);  //mover as a circle 
    }
    //condition for check if the mover beyond the top or bottom edges of canvas then mover reverse vertical (bounce effect)
    edges() {
        if (this.pos.y <= 0 || this.pos.y >= height) {
            this.vel.y *= -1;
        }

    }
}