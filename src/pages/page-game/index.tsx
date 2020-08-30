import React from 'react'
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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
    moduleImport: () => import(/* webpackChunkName: "InformationSection", webpackPrefetch: true */ './button'),
  })

//TODO: add error boundaries
export function PageGame(): React.ReactElement {
  const dispatch = useDispatch(),
    { regionCode = 'RU' } = useParams(),
    isLoading = useSelector(birdsSelectors.getBirdsLoading),
    questionsForRound = useSelector(birdGameSelectors.getGameQuestionsForRound)

  React.useEffect(() => {
    dispatch(API_Birds.birdsListFetch({ regionCode, limit: 2 * questionsForRound }))
  }, [regionCode, questionsForRound])

  return (
    <main className={[commonStyles.wrapper, pageStyles.pageContent].join(' ')}>
      {isLoading ? (
        <Spin size="large" className={pageStyles.spinner} />
      ) : (
        <>
          <QuestionSection />
          <AnswersSection />
          <InformationSection />
          <ButtonNextLevel />
        </>
      )}
    </main>
  )
}
