// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Rocket class -- this is just like our Boid / Particle class
// the only difference is that it has DNA & fitness


class Bot {
    constructor(pos, dna) {
      // All of our physics stuff
      this.position = pos.copy();
      this.dna = dna;
  
      this.fitness = 0;
      this.geneCounter = 0;
      this.recordAmount = 100; // Some low number that will be beat instantly
      this.startCapital = 2000;
      this.currentCapital = this.startCapital;
      this.exceededStartCapital = false;
    }
  
    // FITNESS FUNCTION
    calcFitness() {
      if (this.recordDist < 1) this.recordDist = 1;
  
      // Reward finishing faster and getting close
      this.fitness = (1 / (this.finishTime * this.recordDist));
  
      // Make the function exponential
      this.fitness = pow(this.fitness, 6);
  
      if (this.currentCapital <= 0) this.fitness *= 0.1; // lose 90% of fitness hitting an obstacle
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
    }
  
    display() {
      text(`Captial: ${this.currentCapital} €, Last Action: ${this.currentCapital}`, this.position.x, this.position.y);
      pop();
    }
  
    getFitness() {
      return this.fitness;
    }
  
    getDNA() {
      return this.dna;
    }
  }