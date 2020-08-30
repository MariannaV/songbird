import React from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { birdGameSelectors } from '../../../store/birdGame/selectors'
import { API_BirdGame } from '../../../store/birdGame/actions'
import { headerMenu } from '../../../components/header/header-navigation'
import buttonStyles from './index.scss'
import { API_Birds } from '../../../store/birds/actions'

export function ButtonNextLevel() {
  const history = useHistory(),
    [isSubmitting, setSumbitting] = React.useState<null | boolean>(null),
    isAnswered = useSelector(birdGameSelectors.getGameQuestionSsAnswered),
    questionNumber = useSelector(birdGameSelectors.getGameQuestionNumber),
    questionsForRound = useSelector(birdGameSelectors.getGameQuestionsForRound)

  const dispatch = useDispatch(),
    onClick = React.useCallback(() => {
      try {
        setSumbitting(true)
        const nextLevel = headerMenu[questionNumber + 1]
        if (nextLevel) {
          dispatch(API_Birds.birdsListFetch({ regionCode: nextLevel.routeParams.regionCode, limit: questionsForRound }))
          dispatch(API_BirdGame.questionAsk())
          history.push(nextLevel.url)
        } else {
          dispatch(API_BirdGame.questionAsk())
          history.push(headerMenu[0].url)
        }
      } catch (error) {
        //show ant notification
        console.error(error)
      } finally {
        setSumbitting(false)
      }
    }, [dispatch, questionNumber, questionsForRound])

  return (
    <Button
      children="Next Level"
      disabled={!isAnswered}
      className={buttonStyles.button}
      onClick={onClick}
      loading={Boolean(isSubmitting)}
    />
  )
}
