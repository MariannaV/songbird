import React from 'react'
import { Button, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from '../../modules/optimizations'
import { API_Birds } from '../../store/birds/actions'
import { birdsSelectors } from '../../store/birds/selectors'
import { birdGameSelectors } from '../../store/birdGame/selectors'
import { API_BirdGame } from '../../store/birdGame/actions'

const AnswersSection: LoadableComponent<unknown> = getModuleAsync({
    moduleName: 'AnswersSection',
    moduleImport: () => import(/* webpackChunkName: "AnswersSection", webpackPrefetch: true */ './answers'),
  }),
  InformationSection: LoadableComponent<unknown> = getModuleAsync({
    moduleName: 'InformationSection',
    moduleImport: () => import(/* webpackChunkName: "InformationSection", webpackPrefetch: true */ './information'),
  })

//TODO: add error boundaries
export function PageGame(): React.ReactElement {
  const dispatch = useDispatch(),
    isLoading = useSelector(birdsSelectors.getBirdsLoading)

  React.useEffect(() => {
    dispatch(API_Birds.birdsListFetch({ regionCode: 'RU', limit: 12 /* 6 */ }))
  }, [])

  return (
    <main>
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

function ButtonNextLevel() {
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

  return <Button children="Next Level" disabled={!isAnswered} onClick={onClick} loading={Boolean(isSubmitting)} />
}
