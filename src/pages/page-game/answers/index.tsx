import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import answerStyles from './index.scss'
import { birdGameSelectors } from '../../../store/birdGame/selectors'
import { birdsSelectors } from '../../../store/birds/selectors'

export function AnswersSection(): React.ReactElement {
  const answerIds = useSelector(birdGameSelectors.getGameVariantsOfAnswer),
    rightAnswerIndex = useSelector(birdGameSelectors.getGameRightAnswerIndex),
    Answers = React.useMemo(
      () =>
        answerIds.map((answerId, answerIndex) => (
          <Answer answerId={answerId} isRightAnswer={answerIndex === rightAnswerIndex} key={`answer-${answerId}`} />
        )),
      [answerIds, rightAnswerIndex]
    )

  return <section children={Answers} className={answerStyles.answersSection} />
}

interface IAnswer {
  answerId: string
  isRightAnswer: boolean
}

function Answer(properties: IAnswer) {
  const { answerId, isRightAnswer } = properties,
    [isAnswered, setAsAnswered] = React.useState<boolean>(),
    answerData = useSelector(birdsSelectors.getBird({ birdId: answerId })),
    onClick = React.useCallback(() => {
      setAsAnswered(true)
    }, [answerId]),
    classes = React.useMemo(
      () =>
        [answerStyles.answer, isAnswered && answerStyles.isAnswered, isRightAnswer && answerStyles.isRightAnswer]
          .filter(Boolean)
          .join(' '),
      [isAnswered, isRightAnswer]
    )

  return <Button children={answerData.title} data-id={answerId} onClick={onClick} className={classes} />
}
