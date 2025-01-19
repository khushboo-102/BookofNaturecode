let balloon;

function setup() {
    createCanvas(1200, 800);  //create a canvas(1200,800)
    balloon = new Balloon(500, 400, 1); // create a balloon object at the position(500,400) with mass 1
}
function draw() {
    background(0, 153, 153); // set the background color

    let helium = createVector(0, -0.05); // create the hekllium force in which balloon moving upwards

    let windStrength = noise(frameCount * 0.01) * 0.2 - 0.1; // Varies between -0.1 and 0.1

    let wind = createVector(windStrength, 0); //wind force on the balloon


    balloon.applyForce(helium);// apply the helium force(upward) in balloon
    balloon.applyForce(wind); //apply the win force in balloon


    balloon.update(); //update the postion and velocity of balloon
    balloon.edges(); // check if the ballon hit the any edges of a canvas then the balloon reverse
    balloon.show(); //show the baqllon on canvas
}

class Balloon {
    constructor(x, y, mass) {
        this.pos = createVector(x, y); //initial postion of the balloon
        this.vel = createVector(0, 0); //initial velocity of the balloon that is starts at 0 
        this.acc = createVector(0, 0); //acceleration of balloon that is starts at 0
        this.mass = mass; //mass of the balloon
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass); // newton's second law in which force divided by mass gives acceleration
        this.acc.add(f); //add the acceleration to balloon's acceleration
    }

    update() {
        this.vel.add(this.acc); // add acceleration to velocity
        this.pos.add(this.vel); // add velocity to position
        this.acc.set(0, 0); // reset the acceleration  
    }
    //conditon to check if the balloon hit any edges of canvas then the ballloon reverse the vertical velocity 
    edges() {
        if (this.pos.y <= 0 || this.pos.y >= height) {
            this.vel.y *= -1;
        }
        else if (this.pos.x >= width || this.pos.x <= 0) {
            this.vel.x *= -1;
        }
    }
    //draw the balloon
    show() {
        fill(255, 0, 100); //set the color of ellipse
        ellipse(this.pos.x, this.pos.y, this.mass * 50, this.mass * 60); // upper body part of balloon as a ellipse

        fill(255, 0, 100); //set the trianlge's color
        triangle(this.pos.x - 5, this.pos.y + 30, this.pos.x + 5, this.pos.y + 30, this.pos.x, this.pos.y + 50); //Draw the triangle shape at the bottom of the balloon


        stroke(204, 0, 102); //set the line color
        strokeWeight(1.5);
        line(this.pos.x, this.pos.y + 50, this.pos.x, this.pos.y + 100); //draw the line for string 

    }
}