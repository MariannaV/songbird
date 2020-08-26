import React from 'react'
import informationStyles from './index.scss'

export function InformationSection(): React.ReactElement {
  const birdId: IBirdId = '2',
    Information = React.useMemo(() => {
      if (!birdId) return <p children="Послушайте плеер. Выберите птицу из списка" />
      const data = birdsMap[birdId]
      return (
        <>
          {/*<picture className={informationStyles.birdPicture} />*/}
          <h3 children={data.name} className={informationStyles.birdName} />

          <h6 children={data.class} className={informationStyles.birdClass} />
          {/*<audio className={informationStyles.birdPlayer} />*/}
          <p children={data.description} className={informationStyles.birdDescription} />
        </>
      )
    }, [birdId]),
    sectionClassNames = React.useMemo(
      () =>
        [informationStyles.informationSection, !birdId && informationStyles.isEmptySection].filter(Boolean).join(' '),
      [birdId]
    )

  return <section children={Information} className={sectionClassNames} />
}

type IBirdId = string

interface IBird {
  birdId: IBirdId
  name: string
  class: string //birdClassId for IBirdClasses { birdClassId: string, name: string }
  description: string
}

const birdsMap: Record<IBirdId, IBird> = {
  '2': {
    birdId: '2',
    name: 'Ворон',
    class: 'Corvus corax',
    description:
      'Ворон – крупная птица. Длина тела достигает 70 сантиметров, размах крыльев – до полутора метров. Вороны населяют окрестности Тауэра. В Англии бытует поверье, что в день, когда черные вороны улетят от Тауэра, монархия рухнет.',
    // preview: './',
  },
}
