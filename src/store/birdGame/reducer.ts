import produce from 'immer'
import { NBirdGame } from './@types'

function getInitialState(): NBirdGame.IStore {
  const questionsForRound = 5
  return {
    score: 0,
    questionNumber: 0,
    questionsForRound,
    answerIndex: getRandomInt(questionsForRound),
    openedId: null,
  }
}

export const birdGameReducer = produce((draft: NBirdGame.IStore, action: NBirdGame.IActions) => {
  /*switch (action.type) {

  }*/
}, getInitialState())

function getRandomInt(max: number) {
  // eslint-disable-next-line @typescript-eslint/tslint/config
  return Math.floor(Math.random() * Math.floor(max))
}
