import React from 'react'
import { Button, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import resultStyles from './index.scss'
import { birdGameSelectors } from '../../../store/birdGame/selectors'
import { API_BirdGame } from '../../../store/birdGame/actions'
import { headerMenu } from '../../../components/header/header-navigation'

export function ResultScreen(): React.ReactElement {
  const score = useSelector(birdGameSelectors.getGameScore),
    questionsForRound = useSelector(birdGameSelectors.getGameQuestionsForRound),
    questionsAmount = headerMenu.length - 1, //-1 due to train question
    allScopes = questionsForRound * questionsAmount,
    isMaximumScopes = score === allScopes

  const renderedMessage = React.useMemo(() => `You got ${score} points out of ${allScopes}.`, [score, allScopes]),
    renderedFailedMessage = React.useMemo(
      () => (
        <div className={resultStyles.description}>
          <Typography.Title level={3} children="Sorry.. you can do it better..." className={resultStyles.title} />
          {renderedMessage}
        </div>
      ),
      []
    ),
    renderedCongratsMessage = React.useMemo(
      () => (
        <div className={resultStyles.description}>
          <Typography.Title level={3} children="You are win!!!" className={resultStyles.title} />
          {renderedMessage}
          <img src={require('assets/congrats-bird.jpg').default} alt="Congrats!" />
        </div>
      ),
      []
    )

  const dispatch = useDispatch(),
    onStartAgainClick = React.useCallback(() => dispatch(API_BirdGame.gameRestart()), [])

  return (
    <section className={resultStyles.resultsSection}>
      {isMaximumScopes ? renderedCongratsMessage : renderedFailedMessage}
      <Button type="primary" children="Start game again" className={resultStyles.button} onClick={onStartAgainClick} />
    </section>
  )
}
