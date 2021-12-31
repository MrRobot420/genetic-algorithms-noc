// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Rocket class -- this is just like our Boid / Particle class
// the only difference is that it has DNA & fitness


class Bot {
    constructor(pos, dna, totalRockets) {
      // All of our physics stuff
      this.position = pos.copy();
      this.r = 4;
      this.dna = dna;
  
      this.fitness = 0;
      this.geneCounter = 0;
    }
  
    // FITNESS FUNCTION
    // distance = distance from target
    // finish = what order did i finish (first, second, etc. . .)
    // f(distance,finish) =   (1.0f / finish^1.5) * (1.0f / distance^6);
    // a lower finish is rewarded (exponentially) and/or shorter distance to target (exponetially)
    calcFitness() {
      if (this.recordDist < 1) this.recordDist = 1;
  
      // Reward finishing faster and getting close
      this.fitness = (1 / (this.finishTime * this.recordDist));
  
      // Make the function exponential
      this.fitness = pow(this.fitness, 6);
  
      if (this.hitObstacle) this.fitness *= 0.1; // lose 90% of fitness hitting an obstacle
      if (this.hitTarget) this.fitness *= 3; // twice the fitness for finishing!
    }
  
    // Run in relation to all the obstacles
    // If I'm stuck, don't bother updating or checking for intersection
    run(os) {
      if (!this.hitObstacle && !this.hitTarget && !this.outOfBounds) {
        this.applyForce(this.dna.genes[this.geneCounter]);
        this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
        this.update();
        // If I hit an edge or an obstacle
        this.obstacles(os);
      }
      // Draw me!
      if (!this.hitObstacle && !this.outOfBounds) {
        this.display();
      }
    }
  
    // Did I make it to the target?
    checkTarget() {
      let d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
      if (d < this.recordDist) this.recordDist = d;
  
      if (target.contains(this.position) && !this.hitTarget) {
        this.hitTarget = true;
      } else if (!this.hitTarget) {
        this.finishTime++;
      }
    }
  
    update() {
      
    }
  
    display() {
      
  
      pop();
    }
  
    getFitness() {
      return this.fitness;
    }
  
    getDNA() {
      return this.dna;
    }
  }