import '../css/snake.less';

import {SnakeGame} from './snake/SnakeGame';

window.addEventListener('DOMContentLoaded', (event) => {
  const game = new SnakeGame('grid');
  const runBtn = document.querySelector('#runBtn');
  runBtn.addEventListener('click', event => game.run());
});
