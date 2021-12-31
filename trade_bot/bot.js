// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Rocket class -- this is just like our Boid / Particle class
// the only difference is that it has DNA & fitness


class Bot {
    constructor(pos, dna, startCapital) {
      // All of our physics stuff
      this.position = pos.copy();
      this.dna = dna;
  
      this.fitness = 0;
      this.geneCounter = 0;
      this.recordAmount = 100; // Some low number that will be beat instantly
      this.startCapital = startCapital;
      this.currentCapital = this.startCapital;
      this.exceededStartCapital = false;
      this.broke = false;
    }
  
    // FITNESS FUNCTION
    calcFitness() {
      if (this.recordAmount < 100) this.recordAmount = 100;
  
      // Reward finishing faster and getting close
      this.fitness = ((this.currentCapital + this.recordAmount) / 2) / this.startCapital;
  
      // Make the function exponential
      this.fitness = pow(this.fitness, 4);
  
      if (this.broke) this.fitness *= 0.1; // lose 90% of fitness hitting an obstacle
      if (this.exceededStartCapital) this.fitness *= 2; // twice the fitness for finishing!
    }
  
    // Run in relation to all the obstacles
    // If I'm stuck, don't bother updating or checking for intersection
    run(course) {
      if (this.currentCapital !== 0) {
        this.executeAction(this.dna.genes[this.geneCounter], course);
        this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      }
      // Draw me!
      this.display();  
    }

    executeAction(action, course) {
        switch (action) {
            case 'B':
                if (this.currentCapital >= course) {
                    this.currentCapital -= course;
                }
                break;
            case 'S':
                this.currentCapital += course;
                break;
            case 'H':
                break;
        }
    }
  
    // Did I earn a good amount of money?
    checkTarget() {
      if (this.recordAmount < this.currentCapital) this.recordAmount = this.currentCapital;
      if (this.startCapital < this.recordAmount) this.exceededStartCapital = true;
      if (this.currentCapital <= 0) this.broke = true;
    }
  
    display() {
      text(`Captial: ${this.currentCapital} €, Last Action: ${this.currentCapital}`, this.position.x, this.position.y);
    }
  
    getFitness() {
      return this.fitness;
    }
  
    getDNA() {
      return this.dna;
    }
  }