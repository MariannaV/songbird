import { NBirds } from '../birds/@types'

export namespace NBirdGame {
  export interface IStore {
    score: number
    questionNumber: number
    questionsForRound: number
    answerIndex: number
    isAnswered: boolean
    openedId: null | NBirds.IBird['birdId']
    attemptsMade: number
  }

  export type IActions = IBirdInformationOpen | IQuestionAnswer | IQuestionAsk

  export enum ActionTypes {
    BIRD_INFORMATION_OPEN = 'BIRD_INFORMATION_OPEN',
    QUESTION_ANSWER = 'QUESTION_ANSWER',
    QUESTION_ASK = 'QUESTION_ASK',
  }

  export type IBirdInformationOpen = {
    type: ActionTypes.BIRD_INFORMATION_OPEN
    payload: {
      openedId: IStore['openedId']
    }
  }

  export type IQuestionAnswer = {
    type: ActionTypes.QUESTION_ANSWER
    payload: {
      isRightAnswer: boolean
    }
  }

  export type IQuestionAsk = {
    type: ActionTypes.QUESTION_ASK
  }
}
