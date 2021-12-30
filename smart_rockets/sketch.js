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
  createCanvas(1280, 720);
  // The number of cycles we will allow a generation to live
  lifetime = 800;

  // Initialize variables
  lifecycle = 0;
  recordtime = lifetime;

  target = new Target(width / 2, 78, 78, 200, 230, 200);

  // Create a population with a mutation rate, and population max
  let mutationRate = 0.01;
  population = new Population(mutationRate, 200);

  // Create the obstacle course
  obstacles = [];

  // Fat one
  obstacles.push(new Obstacle(width / 2 - 50, height / 3, 100, 300, 0, 0, 0));
  // Middle ones
  obstacles.push(new Obstacle(width / 4 + 100, height / 2, 200, 10, 0, 0, 0));
  obstacles.push(new Obstacle(width / 2 + 50, height / 2, 200, 10, 0, 0, 0));

  // Top ones
  obstacles.push(new Obstacle(width / 4 - 100, height / 3, 200, 10, 0, 0, 0));
  obstacles.push(new Obstacle(width / 4 + 600, height / 3, 200, 10, 0, 0, 0));
  obstacles.push(new Obstacle(width / 4 + 400, height / 3, 200, 10, 0, 0, 0));
  obstacles.push(new Obstacle(width / 4 + 200, height / 3, 200, 10, 0, 0, 0));
  
  // Bottom ones
  obstacles.push(new Obstacle(width / 4 - 100, height / 1.5, 200, 10, 0, 0, 0));
  obstacles.push(new Obstacle(width / 4 + 600, height / 1.5, 200, 10, 0, 0, 0));
}

function draw() {
  background(127);

  // Draw the start and target positions
  target.display();


  // If the generation hasn't ended yet
  if (lifecycle < lifetime) {
    population.live(obstacles);
    if ((population.targetReached()) && (lifecycle < recordtime)) {
      recordtime = lifecycle;
    }
    lifecycle++;
    // Otherwise a new generation
  } else {
    lifecycle = 0;
    population.calcFitness();
    population.selection();
    population.reproduction();
  }

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
  }

  // Display some info
  fill(0);
  noStroke();
  text("Generation #: " + population.getGenerations(), 10, 18);
  text("Cycles left: " + (lifetime - lifecycle), 10, 36);
  text("Record cycles: " + recordtime, 10, 54);
  text("Population: " + population.getLivingCount(), 10, 72);


}

// Move the target if the mouse is pressed
// System will adapt to new target
function mousePressed() {
  target.position.x = mouseX;
  target.position.y = mouseY;
  recordtime = lifetime;
}