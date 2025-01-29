class Wave {
    constructor(amp, period, phase) {
        this.amplitude = amp; // Wave height
        this.period = period; // Wave width
        this.phase = phase; // Initial shift
        this.speed = random(0.02, 0.05); // Random speed for movement
    }
    // Calculates the wave's height (y-value) at a given x-position
    evaluate(x) {
        return sin(this.phase + TWO_PI * x / this.period) * this.amplitude;
    }

    update() {
        this.phase += this.speed; // Move the wave by updating phase
    }
}

let waves = [];// Array to store multiple waves

function setup() {
    createCanvas(600, 400);
    // Create 6 waves with random amplitude, period, and phase
    for (let i = 0; i < 6; i++) {
        waves[i] = new Wave(random(20, 80), random(100, 600), random(TWO_PI));
    }
}

function draw() {
    background(204, 255, 229); // Set background color

    // Update each wave to animate
    for (let wave of waves) {
        wave.update();
    }

    // Draw the moving waves
    for (let x = 0; x < width; x += 10) {
        let y = 0;
        // Sum up the contributions of all waves at position x
        for (let wave of waves) {
            y += wave.evaluate(x);
        }
        // Draw moving wave points as small black circles
        noStroke();
        fill(0);
        ellipse(x, y + height / 2, 10);
    }
}
