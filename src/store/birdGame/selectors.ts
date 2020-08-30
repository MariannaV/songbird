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
  get getGameQuestionNumber() {
    return createSelector(this.getBirdGame, (birdGame) => birdGame.questionNumber)
  },
  get getGameRightAnswerIndex() {
    return createSelector(this.getBirdGame, (birdGame) => birdGame.answerIndex)
  },
  get getGameOpenedId() {
    return createSelector(this.getBirdGame, (birdGame) => birdGame.openedId)
  },
  get getGameQuestionSsAnswered() {
    return createSelector(this.getBirdGame, (birdGame) => birdGame.isAnswered)
  },
  get getGameVariantsOfAnswer() {
    return createSelector(
      (store: IStore) => store,
      ({ birdGame, birds }) => {
        const firstAnswerIndex = birdGame.questionNumber * birdGame.questionsForRound
        //TODO: add randomize sorting
        return birds.list.slice(firstAnswerIndex, firstAnswerIndex + birdGame.questionsForRound)
      }
    )
  },
}
