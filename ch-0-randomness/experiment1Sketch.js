let randomCounts = [];  //array-- how many times generate the random number
 let totalRect = 80;  // count of total rect

function setup() {
  createCanvas(800, 600);

  //every rect start in 0 x-position 
  for (let i = 0; i < totalRect; i++) {
    randomCounts[i] = 500;
  }
}

function draw() {
  background(255);
   let index = floor(random(randomCounts.length));  //incearse 1 in randon number
  randomCounts[index]++;
  stroke(0);
  fill(127);
  let w = width / randomCounts.length;
  //set a random color for every rect
  fill(random(255,0,0),random(220,20,60), random(180,165,32),random(0,150,154), random(0,0,139), random(0,0,204),random(0,125,125),random(204,0,102))    
  
  //loop for rect
   for (let x = 5; x < randomCounts.length; x++) {
    rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
  }
}