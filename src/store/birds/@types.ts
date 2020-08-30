export namespace NBirds {
  export interface IStore {
    map: Record<IBird['birdId'], IBird>
    list: Array<IBird['birdId']>
    isLoading: null | boolean
  }

  export interface IBird extends IBirdSummary {
    birdId: string
    nameByScience: string
    audio: IBirdAudio
  }

  export type IActions = IBirdsFetch

  export enum ActionTypes {
    BIRDS_FETCH_START = 'BIRDS_FETCH_START',
    BIRDS_FETCH_SUCCESS = 'BIRDS_FETCH_SUCCESS',
    BIRDS_FETCH_FAIL = 'BIRDS_FETCH_FAIL',
  }

  export type IBirdsFetch =
    | { type: ActionTypes.BIRDS_FETCH_START }
    | { type: ActionTypes.BIRDS_FETCH_FAIL; errors: any }
    | {
        type: ActionTypes.BIRDS_FETCH_SUCCESS
        payload: Record<IBird['birdId'], IBird>
      }

  export interface IBirdSummary {
    title: string
    extract: string
    originalimage: { source: string; width: number; height: number }
    thumbnail: { source: string; width: number; height: number }
  }

  export interface IBirdAudio {
    url: string
    file: string
  }
}
