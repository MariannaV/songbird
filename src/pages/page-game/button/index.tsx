import React from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { birdGameSelectors } from '../../../store/birdGame/selectors'
import { API_BirdGame } from '../../../store/birdGame/actions'
import buttonStyles from './index.scss'

export function ButtonNextLevel() {
  const [isSubmitting, setSumbitting] = React.useState<null | boolean>(null),
    isAnswered = useSelector(birdGameSelectors.getGameQuestionSsAnswered)

  const dispatch = useDispatch(),
    onClick = React.useCallback(() => {
      try {
        setSumbitting(true)
        dispatch(API_BirdGame.questionAsk())
      } catch (error) {
        //show ant notification
        console.error(error)
      } finally {
        setSumbitting(false)
      }
    }, [dispatch])

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
