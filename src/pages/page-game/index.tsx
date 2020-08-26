import React from 'react'
import { Button } from 'antd'
import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from '../../modules/optimizations'

//TODO: replace to routesMap
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
  return (
    <main>
      {/*<section>Question</section>*/}
      <AnswersSection />
      <InformationSection />
      <ButtonNextLevel />
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
