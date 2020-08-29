import React from 'react'
import { Button } from 'antd'
import answerStyles from './index.scss'

export function AnswersSection(): React.ReactElement {
  const rightAnswerId = '3',
    answers: Array<IAnswer> = [
      {
        birdId: '0',
        name: 'Ворон',
        isAnswered: true,
      },
      {
        birdId: '1',
        name: 'Журавль',
        isAnswered: false,
      },
      {
        birdId: '2',
        name: 'Ласточка',
        isAnswered: false,
      },
      {
        birdId: '3',
        name: 'Козодой',
        isAnswered: true,
      },
      {
        birdId: '4',
        name: 'Кукушка',
        isAnswered: false,
      },
      {
        birdId: '5',
        name: 'Синица',
        isAnswered: true,
      },
    ],
    onAnswerClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      const { id: birdId } = event.currentTarget.dataset
      console.log(`Change open bird to ${birdId}`)
    }, []),
    Answers = React.useMemo(
      () =>
        answers.map((answer) => {
          const isRightAnswer = answer.birdId === rightAnswerId
          return (
            <Button
              children={answer.name}
              data-id={answer.birdId}
              onClick={onAnswerClick}
              data-is-answered={answer.isAnswered}
              data-is-right-answer={isRightAnswer}
              className={answerStyles.answer}
              key={`answer-${answer.birdId}`}
            />
          )
        }),
      [answers, rightAnswerId, onAnswerClick]
    )

  return <section children={Answers} className={answerStyles.answersSection} />
}

interface IBird {
  birdId: string //TODO: replace to global birdId
  name: string
}

interface IAnswer extends IBird {
  isAnswered: boolean
}
