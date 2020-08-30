import produce from 'immer'
import { NBirds } from './@types'

function getInitialState(): NBirds.IStore {
  return {
    map: {},
    list: [],
    isLoading: null,
  }
}

export const birdsReducer = produce((draft: NBirds.IStore, action: NBirds.IActions) => {
  switch (action.type) {
    case NBirds.ActionTypes.BIRDS_FETCH_START: {
      draft.isLoading = true
      break
    }

    case NBirds.ActionTypes.BIRDS_FETCH_SUCCESS: {
      draft.isLoading = false
      Object.entries(action.payload).forEach(([birdId, birdData]) => {
        if (!(birdId in draft.map)) {
          draft.map[birdId] = {} as any
          draft.list.push(birdId)
        }
        draft.map[birdId] = birdData
      })
      break
    }

    case NBirds.ActionTypes.BIRDS_FETCH_FAIL: {
      draft.isLoading = false
      break
    }
  }
}, getInitialState())
