// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of PVectors
// Each PVector acts as a force for each frame of animation
// Imagine an booster on the end of the rocket that can polet in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

// This example is inspired by Jer Thorp's Smart Rockets
// http://www.blprnt.com/smartrockets/

let lifetime; // How long should each generation live

let population; // Population

let lifecycle; // Timer for cycle of generation
let recordtime; // Fastest time to target

let target; // Target position

//let diam = 24;          // Size of target

let obstacles = []; //an array list to keep track of all the obstacles!

function setup() {
  createCanvas(1900, 950);
  // The number of cycles we will allow a generation to live
  lifetime = 1000;

  // Initialize variables
  lifecycle = 0;
  recordtime = lifetime;
  record = 0;
  recordGeneration = 0;
  recordPercentage = 0;

  target = new Target(width / 2, 78, 78, 200, 230, 200);

  // Create a population with a mutation rate, and population max
  let mutationRate = 0.01;
  population = new Population(mutationRate, 200);

  // Create the obstacle course
  obstacles = [];
  

  // Fat one right
  obstacles.push(new Obstacle(width / 2 - 50, height / 3, 100, 145, 0, 0, 0));
  obstacles.push(new Obstacle(width / 2 - 50, height / 3 + 230, 100, 150, 0, 0, 0));
  // obstacles.push(new Obstacle(width / 4 + 350, height / 3, 100, 20, 0, 0, 0));
  // obstacles.push(new Obstacle(width / 4 + 500, height / 3, 100, 20, 0, 0, 0));
  // Middle one
  obstacles.push(new Obstacle(width / 2 - 600, height / 2.15, 200, 20, 0, 0, 0));
  obstacles.push(new Obstacle(width / 2 - 400, height / 2.15, 200, 20, 0, 0, 0));
  obstacles.push(new Obstacle(width / 2 - 200, height / 2.15, 200, 20, 0, 0, 0));
  // Bottom one
  obstacles.push(new Obstacle(width / 4 + 425, height / 1.4, 200, 20, 0, 0, 0));
  obstacles.push(new Obstacle(width / 4 + 580, height / 1.4, 200, 20, 0, 0, 0));
  obstacles.push(new Obstacle(width / 4 + 780, height / 1.4, 200, 20, 0, 0, 0));
}

function draw() {
  background(27, 30, 65);

  // Draw the start and target positions
  target.display();


  // If the generation hasn't ended yet
  if (lifecycle < lifetime) {
    population.live(obstacles);
    if ((population.targetReached()) && (lifecycle < recordtime)) {
      recordtime = lifecycle;
      recordGeneration = population.getGenerations();
    }
    lifecycle++;
    // Otherwise a new generation
  } else {
    lifecycle = 0;
    population.calcFitness();
    population.selection();
    let currentPercentage = (population.getLivingCount() / population.getInitialCount()) * 100
    if (recordPercentage < currentPercentage && population.targetReached()) {
      recordPercentage = currentPercentage;
    }
    record = population.getMaxFitness();
    population.reproduction();
    
  }

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
  }

  // Display some info
  fill(255);
  textSize(18);
  textStyle(BOLD);
  text("Generation #: " + population.getGenerations(), 10, 18);
  text("Cycles left: " + (lifetime - lifecycle), 10, 36);
  text("Rockets left: " + population.getLivingCount(), 10, 54);
  text(`Survival rate: ${(population.getLivingCount() / population.getInitialCount()) * 100} %`, 10, 72);
  text("# # #   RECORD   # # #", 10, 108);
  text("Record cycles: " + recordtime, 10, 126);
  text(`Record Generation: #${recordGeneration}`, 10, 144);
  text(`Record Survival rate: ${recordPercentage} %`, 10, 162);
}

// Move the target if the mouse is pressed
// System will adapt to new target
function mousePressed() {
  target.position.x = mouseX;
  target.position.y = mouseY;
  recordtime = lifetime;
}