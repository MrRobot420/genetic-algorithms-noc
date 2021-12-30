// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// A class for an obstacle, just a simple rectangle that is drawn
// and can check if a Rocket touches it

// Also using this class for target position

class Target {
    constructor(x, y, w, r, g, b) {
      this.position = createVector(x, y);
      this.w = w;
      this.color = color(r, g, b);
    }
  
    display() {
      stroke(0);
      fill(this.color);
      strokeWeight(2);
    //   rectMode(CORNER);
      circle(this.position.x, this.position.y, this.w);
    }
  
    contains(spot) {
      if (spot.x > this.position.x - this.w / 2 && spot.x < this.position.x + this.w / 2 && spot.y > this.position.y - this.w / 2 && spot.y < this.position.y + this.w / 2) {
        return true;
      } else {
        return false;
      }
    }
  
  }