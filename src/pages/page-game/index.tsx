import React from 'react'
import { Button, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from '../../modules/optimizations'
import { API_Birds } from '../../store/birds/actions'
import { birdsSelectors } from '../../store/birds/selectors'

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
    dispatch(API_Birds.birdsListFetch({ regionCode: 'RU', limit: 20 /* 5 */ }))
  }, [])

  return (
    <main>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <section>Question</section>
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
    onClick = React.useCallback(async () => {
      try {
        setSumbitting(true)
        await new Promise((resolve) => {
          setTimeout(() => resolve(), 1000)
        })
      } catch (error) {
        //show ant notification
        console.error(error)
      } finally {
        setSumbitting(false)
      }
    }, [])

  return <Button children="Next Level" onClick={onClick} loading={Boolean(isSubmitting)} />
}
