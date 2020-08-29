import { createSelector } from 'reselect'
import { IStore } from '../../store'

export const birdGameSelectors = {
  get getBirdGame() {
    return createSelector(
      (store: IStore) => store,
      (store) => store.birdGame
    )
  },
  get getGameScore() {
    return createSelector(this.getBirdGame, (birdGame) => birdGame.score)
  },
}
