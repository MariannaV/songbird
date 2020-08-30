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

  const renderedPicture = React.useMemo(() => {
    if (!birdData.thumbnail?.source && !birdData.originalimage?.source) return null
    const previewSource = birdData.thumbnail?.source || birdData.originalimage?.source,
      originalSource = birdData.originalimage?.source
    return (
      <picture className={informationStyles.birdPicture} data-original-image={originalSource}>
        <img src={previewSource} alt={birdData.title} />
      </picture>
    )
  }, [birdData.thumbnail, birdData.originalimage])

  return (
    <>
      {renderedPicture}
      <h3 children={birdData.title} className={informationStyles.birdName} />
      <h6 children={birdData.nameByScience || 'No science name'} className={informationStyles.birdClass} />
      {/*<audio className={informationStyles.birdPlayer} />*/}
      <p children={birdData.extract || 'No description'} className={informationStyles.birdDescription} />
    </>
  )
}
