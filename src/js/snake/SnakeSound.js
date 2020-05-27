import EAT from '../../audio/eat.wav'

const EAT_SOUND = new Audio(EAT);

export const snakeEatSound = () => {
  EAT_SOUND.play();
}
