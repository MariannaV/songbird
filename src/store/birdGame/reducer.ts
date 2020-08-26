import produce from 'immer'
import { NBirdGame } from './@types'

function getInitialState(): NBirdGame.IStore {
  return {
    score: 0,
  }
}

export const birdGameReducer = produce((draft: NBirdGame.IStore, action: NBirdGame.IActions) => {
  /*switch (action.type) {

  }*/
}, getInitialState())
