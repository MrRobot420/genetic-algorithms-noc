// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// DNA is an array of actions (Buy, Sell, Hold)

class DNA {
  
  constructor(newgenes) {
    this.actions = ['B', 'S', 'H'];
    
    // The genetic sequence
    if (newgenes) {
      this.genes = newgenes;
    } else {
      this.genes = [];
      // Constructor (makes a DNA of random actions)
      for (let i = 0; i < lifetime; i++) {
        let randomIndex = int(random(this.actions.length));
        this.genes[i] = this.actions[randomIndex];
      }
    }
  }
  
  // CROSSOVER
  // Creates new DNA sequence from two (this & and a partner)
  crossover(partner) {
    let child = new Array(this.genes.length);
    // Pick a midpoint
    let crossover = int(random(this.genes.length));
    // Take "half" from one and "half" from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > crossover) child[i] = this.genes[i];
      else child[i] = partner.genes[i];
    }
    let newgenes = new DNA(child);
    return newgenes;
  }

  // Based on a mutation probability, picks a new random Vector
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        let randomIndex = int(random(this.actions.length));
        this.genes[i] = this.actions[randomIndex];
      }
    }
  }
}