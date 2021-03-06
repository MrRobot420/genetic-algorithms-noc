// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// A class to describe a population of "creatures"


// Initialize the population
class Population {
    constructor(m, num, startCapital) {
      this.mutationRate = m; // Mutation rate
      this.population = new Array(num); // Array to hold the current population
      this.matingPool = []; // ArrayList which we will use for our "mating pool"
      this.generations = 0; // Number of generations
      this.initialStartCapital = startCapital;
      //make a new set of creatures
      for (let i = 0; i < this.population.length; i++) {
        let position = createVector(10, (height / 4) + (i * 18));
        this.population[i] = new Bot(position, new DNA(), startCapital);
      }
    }
  
  
    live(course) {
      // For every creature
      for (let i = 0; i < this.population.length; i++) {
        // If it finishes, mark it down as done!
        this.population[i].checkTarget();
        this.population[i].run(course);
      }
    }
  
    // Did anything finish?
    targetReached() {
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].exceededStartCapital) return true;
      }
      return false;
    }
  
    // Calculate fitness for each creature
    calcFitness() {
      for (let i = 0; i < this.population.length; i++) {
        this.population[i].calcFitness();
      }
    }

    getLivingCount() {
      let livingBots = this.population;
      livingBots = livingBots.filter((bot) => {
        return (!bot.broke);
      })
      return livingBots.length;
    }

    getInitialCount() {
      return this.population.length;
    }
  
    // Generate a mating pool
    selection() {
      // Clear the ArrayList
      this.matingPool = [];
  
      // Calculate total fitness of whole population
      let maxFitness = this.getMaxFitness();
  
      // Calculate fitness for each member of the population (scaled to value between 0 and 1)
      // Based on fitness, each member will get added to the mating pool a certain number of times
      // A higher fitness = more entries to mating pool = more likely to be picked as a parent
      // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
      for (let i = 0; i < this.population.length; i++) {
        let fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
        let n = int(fitnessNormal * 100); // Arbitrary multiplier
        for (let j = 0; j < n; j++) {
          this.matingPool.push(this.population[i]);
        }
      }
    }
  
    // Making the next generation
    reproduction() {
      // Refill the population with children from the mating pool
      for (let i = 0; i < this.population.length; i++) {
        // Sping the wheel of fortune to pick two parents
        let m = int(random(this.matingPool.length));
        let d = int(random(this.matingPool.length));
        // Pick two parents
        let mom = this.matingPool[m];
        let dad = this.matingPool[d];
        // Get their genes
        let momgenes = mom.getDNA();
        let dadgenes = dad.getDNA();
        // Mate their genes
        let child = momgenes.crossover(dadgenes);
        // Mutate their genes
        child.mutate(this.mutationRate);
        // Fill the new population with the new child
        let position = createVector(10, height / 4 + (i * 18));
        this.population[i] = new Bot(position, child, this.initialStartCapital);
      }
      this.generations++;
    }
  
    getGenerations() {
      return this.generations;
    }
  
    // Find highest fitness for the population
    getMaxFitness() {
      let record = 0;
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].getFitness() > record) {
          record = this.population[i].getFitness();
        }
      }
      return record;
    }

    getBestGenes(record) {
      let indexOfBestDNA = this.population.findIndex(bot => bot.fitness === record)
      return this.population[indexOfBestDNA].dna.genes
    }
    
    getRecordAmount(record) {
      let indexOfBestDNA = this.population.findIndex(bot => bot.fitness === record)
      return this.population[indexOfBestDNA].recordAmount
    }
  }