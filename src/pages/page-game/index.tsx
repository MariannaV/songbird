import React from 'react'
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from '../../modules/optimizations'

import { API_Birds } from '../../store/birds/actions'
import { birdsSelectors } from '../../store/birds/selectors'
import { birdGameSelectors } from '../../store/birdGame/selectors'

import commonStyles from '../../styles/index.scss'
import pageStyles from './index.scss'

const AnswersSection: LoadableComponent<unknown> = getModuleAsync({
    moduleName: 'AnswersSection',
    moduleImport: () => import(/* webpackChunkName: "AnswersSection", webpackPrefetch: true */ './answers'),
  }),
  InformationSection: LoadableComponent<unknown> = getModuleAsync({
    moduleName: 'InformationSection',
    moduleImport: () => import(/* webpackChunkName: "InformationSection", webpackPrefetch: true */ './information'),
  }),
  QuestionSection: LoadableComponent<unknown> = getModuleAsync({
    moduleName: 'QuestionSection',
    moduleImport: () => import(/* webpackChunkName: "QuestionSection", webpackPrefetch: true */ './question'),
  }),
  ButtonNextLevel: LoadableComponent<unknown> = getModuleAsync({
    moduleName: 'ButtonNextLevel',
    moduleImport: () => import(/* webpackChunkName: "ButtonNextLevel", webpackPrefetch: true */ './button'),
  }),
  ResultScreen: LoadableComponent<unknown> = getModuleAsync({
    moduleName: 'ResultScreen',
    moduleImport: () => import(/* webpackChunkName: "ResultScreen", webpackPrefetch: true */ './results'),
  })

//TODO: add error boundaries
export function PageGame(): React.ReactElement {
  const dispatch = useDispatch(),
    isLoading = useSelector(birdsSelectors.getBirdsLoading),
    questionsForRound = useSelector(birdGameSelectors.getGameQuestionsForRound),
    gameIsOver = useSelector(birdGameSelectors.getGameIsOver)

  React.useEffect(() => {
    dispatch(API_Birds.birdsListFetch({ regionCode: 'RU', limit: questionsForRound }))
  }, [])

  const classes = React.useMemo(
      () =>
        [commonStyles.wrapper, pageStyles.pageContent, gameIsOver && pageStyles.resultsScreen]
          .filter(Boolean)
          .join(' '),
      [gameIsOver]
    ),
    pageContent = React.useMemo(() => {
      if (gameIsOver) return <ResultScreen />
      if (isLoading) return <Spin size="large" className={pageStyles.spinner} />
      return (
        <>
          <QuestionSection />
          <AnswersSection />
          <InformationSection />
          <ButtonNextLevel />
        </>
      )
    }, [isLoading, gameIsOver])

  return <main children={pageContent} className={classes} />
}
