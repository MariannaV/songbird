import React from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { birdGameSelectors } from '../../../store/birdGame/selectors'
import { API_BirdGame } from '../../../store/birdGame/actions'
import { headerMenu } from '../../../components/header/header-navigation'
import buttonStyles from './index.scss'

export function ButtonNextLevel() {
  const history = useHistory(),
    [isSubmitting, setSumbitting] = React.useState<null | boolean>(null),
    isAnswered = useSelector(birdGameSelectors.getGameQuestionSsAnswered),
    questionNumber = useSelector(birdGameSelectors.getGameQuestionNumber)

  const dispatch = useDispatch(),
    onClick = React.useCallback(() => {
      try {
        setSumbitting(true)
        dispatch(API_BirdGame.questionAsk())
        history.push(headerMenu[questionNumber + 1].url)
      } catch (error) {
        //show ant notification
        console.error(error)
      } finally {
        setSumbitting(false)
      }
    }, [dispatch, questionNumber])

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
