import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { get } from 'lodash-es'

import CONSTANTS from '../consts'
import { NBirdGame } from './birdGame/@types'
import { birdGameReducer } from './birdGame/reducer'
import { NBirds } from './birds/@types'
import { birdsReducer } from './birds/reducer'

export interface IStore {
  birdGame: NBirdGame.IStore
  birds: NBirds.IStore
}

export function configureStore(preloadedState?: any) {
  const middlewares = [thunkMiddleware],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    composedEnhancers =
      (CONSTANTS.isDev && get(global, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', Function.prototype)({ trace: true })) ||
      compose,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    enhancer = composedEnhancers(applyMiddleware(...middlewares))

  return createStore(
    combineReducers({
      birdGame: birdGameReducer,
      birds: birdsReducer,
    }),
    preloadedState,
    enhancer
  )
}
