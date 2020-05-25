import {MIN_SNAKE_LENGTH, ROWS, START_POS, COLS} from "./SnakeOptions";
import {DOWN, LEFT, RIGHT, UP} from "./SnakeDirection";

export class Snake {

  /**
   * Construct snake and assign the grid for it.
   * @param game {SnakeGame}
   * @param grid {SnakeGrid}
   */
  constructor(game, grid) {
    this.snake = undefined;
    this.direction = UP;

    this.game = game;
    this.grid = grid;

    // make sure we allow change only once per move
    this.directionChangeAllowed = true;

    document.addEventListener('keydown', event => this.processKey(event))
  }

  reset() {
    this.snake = [];
    this.pos = START_POS;
    this.snake.push(this.pos);
  }

  validate(next) {
    if (next > COLS * ROWS && this.direction === DOWN) {
      return next -= COLS * ROWS;
    } else if (next < 0 && this.direction === UP) {
      return next += COLS * ROWS;
    } else if (next % COLS === COLS - 1 && this.direction === LEFT) {
      return next += COLS;
    } else if (next % COLS === 0 && this.direction === RIGHT) {
      return next -= COLS;
    }
    return next;
  }

  loop() {
    let next = this.validate(this.pos + this.direction);

    // is empty, we just need to move the snake
    if (this.grid.isEmpty(next)) {
      this.move();
    } else if (this.grid.isApple(next)) {
      this.eat();
    } else if (this.grid.isSnake(next)) {
      this.game.end();
    }

    this.directionChangeAllowed = true;
  }

  /**
   * process the key down event
   * @param event
   */
  processKey(event) {
    if (!this.directionChangeAllowed) return;

    if (event.key === 'ArrowLeft' && this.direction !== RIGHT) {
      this.direction = LEFT;
    } else if (event.key === 'ArrowRight' && this.direction !== LEFT) {
      this.direction = RIGHT;
    } else if (event.key === 'ArrowUp' && this.direction !== DOWN) {
      this.direction = UP;
    } else if (event.key === 'ArrowDown' && this.direction !== UP) {
      this.direction = DOWN;
    }

    if (['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'].includes(event.key)) {
      this.directionChangeAllowed = false;
    }
  }

  move() {
    this.pos = this.validate(this.pos + this.direction);
    this.snake.push(this.pos);
    this.grid.setSnakeBody(this.pos);

    // remove the last position
    if (this.snake.length > MIN_SNAKE_LENGTH) {
      const last = this.snake.shift();
      this.grid.removeSnakeBody(last);
    }
  }

  eat() {
    this.pos = this.validate(this.pos + this.direction)
    this.snake.push(this.pos);
    this.grid.setSnakeBody(this.pos);
    this.grid.addApple();

    this.game.updateScore();

    if (this.snake.length % 5 === 0) {
      this.game.speedUp();
    }
    this.game.updateInfo();
  }

}