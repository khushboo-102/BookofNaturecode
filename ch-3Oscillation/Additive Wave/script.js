// class Wave{
//     constructor(amp,period,phase){
//         this.amplitude = amp; // The height of the wave
//         this.period = period; // The width of one complete wave cycle
//         this.phase = phase; // The starting phase (shift) of the wave
//     }
//     evaluate(x){
//         return sin(this.phase + TWO_PI *x /this.period)*this.amplitude
//   }}
// let wave ;
//  function setup(){
//     createCanvas(600,400);
//     wave = new Wave(50,300,20)

//  }
//  function draw(){
//     background(204,255.229)
//     for(let x =0; x<innerWidth;x +=10){
//         let y = wave.evaluate(x);
//         ellipse(x,y + height/2,10)
//     }
//  }


class Wave {
    constructor(amp, period, phase) {
        this.amplitude = amp; // The height of the wave
        this.period = period; // The width of one complete wave cycle
        this.phase = phase; // The starting phase (shift) of the wave
    } 
            // Calculates the wave's height (y-value) at a given x-position
    evaluate(x) {
        return sin(this.phase + TWO_PI * x / this.period) * this.amplitude
    }
  
}
let waves = []; // Array to hold multiple wave objects
function setup() {
    createCanvas(600, 400);
        // Create 6 wave objects with random properties
    for (let i = 0; i < 6; i++) {
        waves[i] = new Wave(random(20, 80), random(100, 600), random(TWO_PI))
    }

}
function draw() {
    background(204, 255.229) //set the background color
    for (let x = 0; x < width; x += 10) {
        let y = 0; // Start y position at 0
                // Sum up the contributions of all waves at position x
        for (let wave of waves) {
            y += wave.evaluate(x)
        }
        noStroke()
        ellipse(x, y + height / 2, 10) // Draw circles at computed wave positions
   }

}
