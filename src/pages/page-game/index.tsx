import React from 'react'
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from '../../modules/optimizations'

import { API_Birds } from '../../store/birds/actions'
import { birdsSelectors } from '../../store/birds/selectors'

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
    isLoading = useSelector(birdsSelectors.getBirdsLoading)

  React.useEffect(() => {
    dispatch(API_Birds.birdsListFetch({ regionCode: 'RU', limit: 12 /* 6 */ }))
  }, [])

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
