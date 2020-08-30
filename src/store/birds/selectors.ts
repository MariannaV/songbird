import { createSelector } from 'reselect'
import { IStore } from '../../store'
import { NBirds } from './@types'

export const birdsSelectors = {
  get getBirds() {
    return createSelector(
      (store: IStore) => store,
      (store) => store.birds
    )
  },
  get getBirdsList() {
    return createSelector(this.getBirds, (birds) => birds.list)
  },
  get getBirdsMap() {
    return createSelector(this.getBirds, (birds) => birds.map)
  },
  getBird({ birdId }: { birdId: NBirds.IBird['birdId'] }) {
    return createSelector(this.getBirdsMap, (birdsMap) => birdsMap[birdId])
  },
  get getBirdsLoading() {
    return createSelector(this.getBirds, (birds) => birds.isLoading)
  },
}
