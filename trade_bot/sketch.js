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
let recordAmount; // Fastest time to highest amount
let recordtime; 

let target; // Target position
let courses;
let numPts;
let bestAmount;

//let diam = 24;          // Size of target

let obstacles = []; //an array list to keep track of all the obstacles!

function setup() {
  createCanvas(1900, 950);
  frameRate(10)

  courses = [100, 200, 90, 250, 400, 300, 230, 260, 200, 380, 500, 220, 700, 540, 600]
optimalGenes = ['B', 'B', 'B', 'H', 'S', 'S', 'B', 'H', 'B', 'S', 'S', 'B', 'S', 'S', 'H']
  // The number of cycles we will allow a generation to live
  lifetime = courses.length;
  startCapital = 2000;

  // Initialize variables
  lifecycle = 0;
  recordAmount = startCapital;
  record = 0;
  recordGeneration = 0;
  recordPercentage = 0;
  bestGenes = [];

  // Create a population with a mutation rate, and population max
  let mutationRate = 0.01;
  population = new Population(mutationRate, 40, startCapital);

  numPts = courses.length;
}

function draw() {
  background(27, 30, 65);

  // If the generation hasn't ended yet
  if (lifecycle < lifetime) {
    population.live(courses[lifecycle]);
    if ((population.targetReached()) && (lifecycle < recordtime)) {
      recordtime = lifecycle;
      recordGeneration = population.getGenerations();
    }
    lifecycle++;
    // sleep(1000);
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
    bestGenes = population.getBestGenes(record);
    bestAmount = population.getRecordAmount(record)
    console.log(bestGenes);
    population.reproduction();
  }

  // Display some info
  fill(255);
  textSize(18);
  textStyle(BOLD);
  text("Generation #: " + population.getGenerations(), 10, 18);
  text("Cycles left: " + (lifetime - lifecycle), 10, 36);
  text("Bots: " + population.getLivingCount(), 10, 54);
  text('Best DNA: ' + bestGenes, 10, 90)
  text(`Best Capital: ${bestAmount} ???`, 10, 108)

  drawLines();
  drawEllipses();
}

function drawEllipses(){
  noStroke();
  let offset = 800;
    // draw ellipses
  for(let i = 0; i < courses.length; i++){
    let x = i * ((width - 500) / (numPts-1)) + 400;
    let y = offset - courses[i];
    ellipse(x, y, 7);
  }
}

function drawLines(){
  stroke(250);
  let offset = 800
 // draw lines
  let px = 400;
  let py = offset;
  for(let i =0; i < courses.length; i++){
    let x = i * ((width - 500) / (numPts-1)) + 400;
    let y = offset - courses[i];
    line(px, py, x, y);
    
  	//store the last position
    px = x;
    py = y;
  } 
}