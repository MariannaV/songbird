import produce from 'immer'
import { NBirdGame } from './@types'

function getInitialState(): NBirdGame.IStore {
  const questionsForRound = 6
  return {
    score: 0,
    questionNumber: 0,
    questionsForRound,
    isAnswered: false,
    answerIndex: getRandomInt(questionsForRound),
    attemptsMade: 0,
    openedId: null,
  }
}

export const birdGameReducer = produce((draft: NBirdGame.IStore, action: NBirdGame.IActions) => {
  // eslint-disable-next-line @typescript-eslint/tslint/config,sonarjs/no-small-switch
  switch (action.type) {
    case NBirdGame.ActionTypes.BIRD_INFORMATION_OPEN: {
      draft.openedId = action.payload.openedId
      break
    }

    case NBirdGame.ActionTypes.QUESTION_ANSWER: {
      const { isRightAnswer } = action.payload
      if (!isRightAnswer) {
        draft.attemptsMade += 1
        break
      }
      if (draft.questionsForRound > draft.attemptsMade) draft.score += draft.questionsForRound - draft.attemptsMade
      draft.isAnswered = true

      break
    }

    case NBirdGame.ActionTypes.QUESTION_ASK: {
      draft.questionNumber += 1
      draft.answerIndex = getRandomInt(draft.questionsForRound)
      draft.attemptsMade = 0
      draft.openedId = null
      draft.isAnswered = false
      break
    }

    default:
      break
  }
}, getInitialState())

function getRandomInt(max: number) {
  // eslint-disable-next-line @typescript-eslint/tslint/config
  return Math.floor(Math.random() * Math.floor(max))
}
