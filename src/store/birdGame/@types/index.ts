import { NBirds } from '../../birds/@types'

export namespace NBirdGame {
  export interface IStore {
    score: number
    questionNumber: number
    questionsForRound: number
    answerIndex: number
    openedId: null | NBirds.IBird['birdId']
  }

  export type IActions = null

  export enum ActionTypes {}
}
