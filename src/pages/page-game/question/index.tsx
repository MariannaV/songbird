import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from 'antd'
import questionStyles from './index.scss'
import { birdGameSelectors } from '../../../store/birdGame/selectors'
import { birdsSelectors } from '../../../store/birds/selectors'

export function QuestionSection(): React.ReactElement {
  const birdId = useSelector(birdGameSelectors.getGameRightAnswerId),
    birdData = useSelector(birdsSelectors.getBird({ birdId })),
    questionIsAnswered = useSelector(birdGameSelectors.getGameQuestionSsAnswered)

  const classes = React.useMemo(
    () =>
      [questionStyles.questionSection, questionIsAnswered && questionStyles.questionIsAnswered]
        .filter(Boolean)
        .join(' '),
    [questionIsAnswered]
  )

  const renderedPicture = React.useMemo(() => {
      const previewSource = birdData?.thumbnail?.source || birdData.originalimage?.source,
        originalSource = birdData?.originalimage?.source

      return (
        <picture className={questionStyles.birdPicture} data-original-image={originalSource}>
          <img
            src={!questionIsAnswered ? require('../../../assets/bird-stub.jpg').default : previewSource}
            alt="birdData.title"
          />
        </picture>
      )
    }, [birdData.thumbnail, birdData.originalimage, questionIsAnswered]),
    renderedTitle = React.useMemo(
      () => (
        <Typography.Title
          children={!questionIsAnswered ? '******' : birdData.title}
          className={questionStyles.birdName}
          level={2}
        />
      ),
      [questionIsAnswered, birdData.title]
    )

  return (
    <section className={classes}>
      {renderedPicture}
      {renderedTitle}
      {/*{renderedAudio}*/}
    </section>
  )
}
