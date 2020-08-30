import { Dispatch, Store } from 'redux'
import { requestCreator } from '../../helpers/request-creator'
import { IStore } from '../../store'
import { NBirds } from './@types'

export const API_Birds = {
  birdsListFetch: (parameters: { regionCode: string; limit?: number }) => async (
    dispatch: Dispatch<NBirds.IBirdsFetch>,
    getStore: Store<IStore>['getState']
  ) => {
    try {
      dispatch({ type: NBirds.ActionTypes.BIRDS_FETCH_START })
      type IBird = { comName: string; sciName: string; [key: string]: unknown }

      const apiSettings = {
          host: 'https://api.ebird.org',
          version: 'v2',
          token: 'b9mrkrk64c1v',
        },
        birdSpecies = await requestCreator<Array<IBird>>({
          host: apiSettings.host,
          url: `${apiSettings.version}/data/obs/${parameters.regionCode}/recent`,
          method: requestCreator.methods.get,
          data: {
            maxResults: Number(parameters.limit) * 2, //due to next filtration need to fetch more data
            sppLocale: 'en',
          },
          headers: {
            'X-eBirdApiToken': apiSettings.token,
          },
        })

      const birdsMap: Record<string, NBirds.IBird> = {}

      const birdsData = await Promise.all<any>(
        birdSpecies
          .map(({ comName }) => {
            const birdClass = comName.replace(/\s/g, '_')
            return [
              API_Birds.birdByClassGet({ birdClass: birdClass.replace(/\s/g, '_').toLocaleLowerCase() }).catch(
                (error) => error
              ),
              API_Birds.birdAudioByClassGet({ birdClass }).catch((error) => error),
            ]
          })
          .flat()
      )

      let amountBirdWithAllData = 0
      for (let birdIndex = 0; birdIndex < birdSpecies.length; birdIndex += 1) {
        const { comName, sciName: nameByScience } = birdSpecies[birdIndex],
          birdId = comName.replace(/\s/g, '_'),
          [birdData, birdAudio]: [NBirds.IBirdSummary, NBirds.IBirdAudio] = [
            birdsData[birdIndex * 2],
            birdsData[birdIndex * 2 + 1],
          ]

        const dataNeededFields = ['title', 'extract', 'originalimage', 'thumbnail'],
          audioNeededFields = ['url', 'file']

        const bird = {
          birdId,
          nameByScience,
          ...dataNeededFields.reduce((accumulator, currentKey) => {
            // @ts-ignore
            accumulator[currentKey] = birdData?.[currentKey]
            return accumulator
          }, {} as NBirds.IBirdSummary),
          audio: audioNeededFields.reduce((accumulator, currentKey) => {
            // @ts-ignore
            accumulator[currentKey] = birdAudio?.[currentKey]
            return accumulator
          }, {} as NBirds.IBirdAudio),
        }

        //we fetch more data than it needed so skip extra bird information
        if (amountBirdWithAllData === parameters.limit) break

        //skip broken birds
        if (bird.originalimage && bird.audio.file) {
          birdsMap[birdId] = bird
          amountBirdWithAllData += 1
        }
      }

      dispatch({
        type: NBirds.ActionTypes.BIRDS_FETCH_SUCCESS,
        payload: birdsMap,
      })
    } catch (error) {
      dispatch({ type: NBirds.ActionTypes.BIRDS_FETCH_FAIL, errors: error })
      //TODO: notify
    }
  },

  async birdByClassGet({ birdClass }: { birdClass: string }) {
    const apiSettings = {
        host: 'https://en.wikipedia.org/api',
        version: 'rest_v1',
      },
      result = await requestCreator<NBirds.IBirdSummary>({
        host: apiSettings.host,
        url: `${apiSettings.version}/page/summary/${birdClass}`,
        method: requestCreator.methods.get,
      })
    return result
  },
  async birdAudioByClassGet({ birdClass }: { birdClass: string }) {
    const apiSettings = {
        host: 'https://www.xeno-canto.org/api',
        version: '2',
      },
      query = [birdClass, 'q:A'].join('+'),
      url = `${apiSettings.version}/recordings?query=${query}`,
      result = await requestCreator<{ recordings: Array<NBirds.IBirdAudio> }>({
        //due to CORS need to use external proxy
        host: 'https://jsonp.afeld.me',
        url: `?url=${apiSettings.host}/${url}`,
        method: requestCreator.methods.get,
      })
    return result.recordings[0]
  },
}
