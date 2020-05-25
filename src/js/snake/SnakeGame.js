import {Snake} from "./Snake";
import {SnakeGrid} from "./SnakeGrid";
import {SnakeLevels} from "./SnakeOptions";

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
    this.level = 1;
    this.speed = SnakeLevels[this.level];
    this.score = 0;
    this.grid.addApple();

    this.updateInfo();
    this.processLoop();
  }

  updateScore() {
    this.score++;
  }

  speedUp() {
    this.level++;
    this.speed = this.level > SnakeLevels.length ? SnakeLevels[SnakeLevels.length - 1] : SnakeLevels[this.level - 1];
    console.log(this.speed);
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
    this.speedElm.textContent = this.level;
  }

}
