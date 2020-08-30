import { Dispatch } from 'redux'
import { NBirdGame } from './@types'

export const API_BirdGame = {
  birdInformationOpen: (parameters: NBirdGame.IBirdInformationOpen['payload']) => (
    dispatch: Dispatch<NBirdGame.IBirdInformationOpen>
  ) => dispatch({ type: NBirdGame.ActionTypes.BIRD_INFORMATION_OPEN, payload: parameters }),
  questionAnswer: (parameters: NBirdGame.IQuestionAnswer['payload']) => (
    dispatch: Dispatch<NBirdGame.IQuestionAnswer>
  ) => dispatch({ type: NBirdGame.ActionTypes.QUESTION_ANSWER, payload: parameters }),
  // eslint-disable-next-line unicorn/consistent-function-scoping
  questionAsk: () => (dispatch: Dispatch<NBirdGame.IQuestionAsk>) =>
    dispatch({ type: NBirdGame.ActionTypes.QUESTION_ASK }),
}
