import React from 'react'
import { useSelector } from 'react-redux'
import { birdGameSelectors } from '../../../store/birdGame/selectors'
import { NBirds } from '../../../store/birds/@types'
import { birdsSelectors } from '../../../store/birds/selectors'
import informationStyles from './index.scss'

export function InformationSection(): React.ReactElement {
  const birdId = useSelector(birdGameSelectors.getGameOpenedId),
    Information = React.useMemo(
      () =>
        !birdId ? <p children="Послушайте плеер. Выберите птицу из списка" /> : <BirdInformation birdId={birdId} />,
      [birdId]
    ),
    sectionClassNames = React.useMemo(
      () =>
        [informationStyles.informationSection, !birdId && informationStyles.isEmptySection].filter(Boolean).join(' '),
      [birdId]
    )

  return <section children={Information} className={sectionClassNames} />
}

function BirdInformation(properties: { birdId: NBirds.IBird['birdId'] }) {
  const { birdId } = properties,
    birdData = useSelector(birdsSelectors.getBird({ birdId }))

  return (
    <>
      <picture className={informationStyles.birdPicture} data-original-image={birdData.originalimage.source}>
        <img src={birdData.thumbnail.source} alt={birdData.title} />
      </picture>
      <h3 children={birdData.title} className={informationStyles.birdName} />
      <h6 children={birdData.nameByScience} className={informationStyles.birdClass} />
      {/*<audio className={informationStyles.birdPlayer} />*/}
      <p children={birdData.extract} className={informationStyles.birdDescription} />
    </>
  )
}
