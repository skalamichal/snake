import {Snake} from "./Snake";
import {SnakeGrid} from "./SnakeGrid";

export class SnakeGame {

  /**
   * Initialize the SnakeGame class
   * @param grid {String} - id of the grid div
   */
  constructor(grid) {
    this.grid = new SnakeGrid(grid);
    this.snake = new Snake(this, this.grid);
    this.tid = undefined;

    this.scoreElm = document.getElementById('score');
    this.speedElm = document.getElementById('speed');
    this.gameOverElm = document.getElementById('gameOver');

    this.gameOverElm.style.display = 'none';
  }

  run() {
    this.end();
    this.gameOverElm.style.display = 'none';

    this.snake.reset();
    this.grid.reset();
    this.speed = 750;
    this.score = 0;
    this.grid.addApple();

    this.updateInfo();
    this.processLoop();
  }

  updateScore() {
    this.score++;
  }

  speedUp() {
    if (this.speed < 200) {
      return;
    }
    this.speed -= 50;
  }

  loop() {
    this.tid = setTimeout(() => this.processLoop(), this.speed);
  }

  processLoop() {
    this.snake.loop();

    this.loop();
  }

  end() {
    if (this.tid) {
      clearTimeout(this.tid);
    }

    this.gameOverElm.style.display = 'grid';
  }

  updateInfo() {
    this.scoreElm.textContent = this.score;
    this.speedElm.textContent = this.speed;
  }

}
