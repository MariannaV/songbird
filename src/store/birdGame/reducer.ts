import produce from 'immer'
import { NBirdGame } from './@types'
import { headerMenu } from '../../components/header/header-navigation'

function getInitialState(): NBirdGame.IStore {
  const questionsForRound = 6
  return {
    score: 0,
    questionNumber: 0,
    questionsForRound,
    isAnswered: null,
    answerIndex: getRandomInt(questionsForRound),
    attemptsMade: 0,
    openedId: null,
    gameOver: false,
  }
}

export const birdGameReducer = produce((draft: NBirdGame.IStore, action: NBirdGame.IActions) => {
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
      const isTrainQuestion = !draft.questionNumber
      if (!isTrainQuestion && draft.questionsForRound > draft.attemptsMade)
        draft.score += draft.questionsForRound - draft.attemptsMade
      draft.isAnswered = true
      break
    }

    case NBirdGame.ActionTypes.QUESTION_ASK: {
      if (draft.questionNumber + 1 < headerMenu.length) {
        draft.questionNumber += 1
        draft.answerIndex = getRandomInt(draft.questionsForRound)
        draft.attemptsMade = 0
        draft.openedId = null
        draft.isAnswered = false
      } else {
        draft.gameOver = true
      }
      break
    }

    case NBirdGame.ActionTypes.GAME_RESTART: {
      const newStore = getInitialState()
      Object.entries(newStore).forEach(([key, value]) => {
        // @ts-ignore
        draft[key] = value
      })
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
