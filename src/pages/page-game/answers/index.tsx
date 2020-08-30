import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import answerStyles from './index.scss'
import { birdGameSelectors } from '../../../store/birdGame/selectors'
import { API_BirdGame } from '../../../store/birdGame/actions'
import { birdsSelectors } from '../../../store/birds/selectors'

export function AnswersSection(): React.ReactElement {
  const answerIds = useSelector(birdGameSelectors.getGameVariantsOfAnswer),
    rightAnswerIndex = useSelector(birdGameSelectors.getGameRightAnswerIndex),
    isAnswered = useSelector(birdGameSelectors.getGameQuestionSsAnswered)

  const Answers = React.useMemo(
      () =>
        answerIds.map((answerId, answerIndex) => (
          <Answer answerId={answerId} isRightAnswer={answerIndex === rightAnswerIndex} key={`answer-${answerId}`} />
        )),
      [answerIds, rightAnswerIndex]
    ),
    classes = React.useMemo(
      () => [answerStyles.answersSection, isAnswered && answerStyles.sectionIsAnswered].filter(Boolean).join(' '),
      [isAnswered]
    )

  return <section children={Answers} className={classes} />
}

interface IAnswer {
  answerId: string
  isRightAnswer: boolean
}

function Answer(properties: IAnswer) {
  const { answerId, isRightAnswer } = properties,
    questionIsAnswered = useSelector(birdGameSelectors.getGameQuestionSsAnswered),
    [isAnswered, setAsAnswered] = React.useState<boolean>(false),
    answerData = useSelector(birdsSelectors.getBird({ birdId: answerId })),
    classes = React.useMemo(
      () =>
        [answerStyles.answer, isAnswered && answerStyles.isAnswered, isRightAnswer && answerStyles.isRightAnswer]
          .filter(Boolean)
          .join(' '),
      [isAnswered, isRightAnswer]
    )

  const dispatch = useDispatch(),
    onClick = React.useCallback(() => {
      dispatch(API_BirdGame.birdInformationOpen({ openedId: answerId }))
      if (!questionIsAnswered) {
        // eslint-disable-next-line @typescript-eslint/tslint/config
        void new Audio(require(`../../../assets/audio/${isRightAnswer ? 'correct' : 'error'}.mp3`).default).play()
        dispatch(API_BirdGame.questionAnswer({ isRightAnswer }))
        setAsAnswered(true)
      }
    }, [answerId, isRightAnswer, questionIsAnswered, dispatch])

  return (
    <Button
      children={answerData.title}
      disabled={isAnswered && !questionIsAnswered}
      onClick={onClick}
      className={classes}
    />
  )
}
