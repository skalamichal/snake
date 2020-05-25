import {APPLE_CLASS, COLS, ROWS, SNAKE_BODY_CLASS} from "./SnakeOptions";

export class SnakeGrid {

  /**
   *
   * @param grid {String}
   */
  constructor(grid) {
    this.grid = document.getElementById(grid);
    this.build();
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
   * Remove the snake body from the cell
   * @param pos
   */
  removeSnakeBody(pos) {
    this.getCell(pos).classList.remove(SNAKE_BODY_CLASS);
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
