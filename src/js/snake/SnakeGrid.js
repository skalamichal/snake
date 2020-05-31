import {
  APPLE_CLASS,
  COLS, MIN_CELL_SIZE,
  ROWS,
  SNAKE_BODY_CLASS,
  SNAKE_DOWN_CLASS,
  SNAKE_HEAD_CLASS, SNAKE_LEFT_CLASS, SNAKE_RIGHT_CLASS,
  SNAKE_UP_CLASS
} from "./SnakeOptions";
import {DOWN, LEFT, RIGHT, UP} from "./SnakeDirection";

export class SnakeGrid {

  /**
   *
   * @param grid {String}
   */
  constructor(grid) {
    this.grid = document.getElementById(grid);
    this.build();

    const resizeObserver = new ResizeObserver(() => this.updateCellSize());
    resizeObserver.observe(document.querySelector('body'));
  }

  updateCellSize() {
    const w = this.grid.getBoundingClientRect().width * .9,
      h = this.grid.getBoundingClientRect().height * .9,
      cw = Math.floor(w / COLS),
      ch = Math.floor(h / ROWS);

    let size = Math.max(Math.min(cw, ch), MIN_CELL_SIZE);

    document.documentElement.style.setProperty('--cell-size', `${size}px`);
    document.documentElement.style.setProperty('--vh', window.innerHeight/100 + 'px');
  }

  /**
   * Return the grid HTML element
   * @return {HTMLElement}
   */
  get element() {
    return this.grid;
  }

  build() {
    const cells = COLS * ROWS;
    for (let i = 0; i < cells; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('id', 'cell' + i);
      this.grid.appendChild(cell);
    }
  }

  reset() {
    const cells = this.grid.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => cell.classList.remove(APPLE_CLASS, SNAKE_BODY_CLASS));
  }

  getCell(pos) {
    return document.getElementById('cell' + pos);
  }

  /**
   * Set the snake body to the cell at given pos
   * @param pos
   */
  setSnakeBody(pos) {
    this.getCell(pos).classList.add(SNAKE_BODY_CLASS);
  }

  /**
   * Set the snake head to the cell at given pos
   * @param pos
   * @param direction
   */
  setSnakeHead(pos, direction) {
    const cell = this.getCell(pos);
    cell.classList.add(SNAKE_BODY_CLASS, SNAKE_HEAD_CLASS);
    if (direction === UP) {
      cell.classList.add(SNAKE_UP_CLASS);
    } else if (direction === DOWN) {
      cell.classList.add(SNAKE_DOWN_CLASS);
    } else if (direction === LEFT) {
      cell.classList.add(SNAKE_LEFT_CLASS);
    } else if (direction === RIGHT) {
      cell.classList.add(SNAKE_RIGHT_CLASS);
    }
  }

  removeSnakeHead(pos) {
    this.getCell(pos).classList.remove(SNAKE_RIGHT_CLASS, SNAKE_LEFT_CLASS, SNAKE_DOWN_CLASS, SNAKE_UP_CLASS, SNAKE_HEAD_CLASS);
  }

  /**
   * Remove the snake body from the cell
   * @param pos
   */
  removeSnake(pos) {
    this.getCell(pos).classList.remove(SNAKE_BODY_CLASS, SNAKE_RIGHT_CLASS, SNAKE_LEFT_CLASS, SNAKE_DOWN_CLASS, SNAKE_UP_CLASS, SNAKE_HEAD_CLASS);
  }

  isEmpty(pos) {
    const cell = this.getCell(pos);

    return cell.classList.length === 1;
  }

  isApple(pos) {
    return this.getCell(pos).classList.contains(APPLE_CLASS);
  }

  isSnake(pos) {
    return this.getCell(pos).classList.contains(SNAKE_BODY_CLASS);
  }

  getRandomPos() {
    return Math.floor(Math.random() * COLS * ROWS);
  }

  addApple() {
    const apples = this.grid.getElementsByClassName(APPLE_CLASS);
    Array.from(apples).forEach(appleCell => appleCell.classList.remove(APPLE_CLASS));

    let pos = this.getRandomPos();
    if (this.isEmpty(pos)) {
      const cell = this.getCell(pos);
      cell.classList.add(APPLE_CLASS);
    } else {
      this.addApple();
    }
  }

}
