import {MIN_SNAKE_LENGTH, ROWS, START_POS, COLS} from "./SnakeOptions";
import {DOWN, LEFT, RIGHT, UP} from "./SnakeDirection";

import * as Hammer from "hammerjs";

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

    // is game running
    this.gameOver = true;

    document.addEventListener('keydown', event => this.processKey(event))

    const hammer = new Hammer.Manager(this.grid.element);
    const swipe = new Hammer.Swipe();
    hammer.add(swipe);
    hammer.on('swipe', event => this.processSwipe(event));
  }

  reset() {
    this.snake = [];
    this.pos = START_POS;
    this.snake.push(this.pos);
    this.gameOver = false;
  }

  validate(next) {
    if (next > COLS * ROWS && this.direction === DOWN) {
      return next -= COLS * ROWS;
    } else if (next < 0 && this.direction === UP) {
      return next += COLS * ROWS;
    } else if ((next < 0 || next % COLS === COLS - 1) && this.direction === LEFT) {
      return next += COLS;
    } else if (next % COLS === 0 && this.direction === RIGHT) {
      return next -= COLS;
    }
    return next;
  }

  loop() {
    if (this.gameOver) return;

    let next = this.validate(this.pos + this.direction);

    // is empty, we just need to move the snake
    if (this.grid.isEmpty(next)) {
      this.move();
    } else if (this.grid.isApple(next)) {
      this.eat();
    } else if (this.grid.isSnake(next)) {
      this.game.end();
      this.gameOver = true;
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

  processSwipe(event) {
    if (!this.directionChangeAllowed) return;

    if (event.direction === 2 && this.direction !== RIGHT) {
      this.direction = LEFT;
    } else if (event.direction === 4 && this.direction !== LEFT) {
      this.direction = RIGHT;
    } else if (event.direction === 8 && this.direction !== DOWN) {
      this.direction = UP;
    } else if (event.direction === 16 && this.direction !== UP) {
      this.direction = DOWN;
    }

    this.directionChangeAllowed = false;
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
