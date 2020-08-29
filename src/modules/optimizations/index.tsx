import React from 'react'
import loadable from '@loadable/component'
import { timeout as pTimeout } from 'promise-timeout'
import { Spin, Button } from 'antd'

interface IGetAsyncModule {
  moduleImport: any
  moduleName?: string
  maxTimeout?: number
  withPreload?: boolean
}

export function getModuleAsync({
  moduleName = 'default',
  moduleImport,
  maxTimeout = 3000,
  withPreload = false,
}: IGetAsyncModule) {
  const AsyncComponent = loadable(
    async (componentProperties) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      const getModule = async () => (await moduleImport(componentProperties))[moduleName]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return pTimeout(getModule(), maxTimeout).catch(() => () => {
        const [Component, setComponent] = React.useState(),
          // @ts-ignore
          onClick = React.useCallback(() => setComponent(getModuleAsync(arguments[0])), [])

        // @ts-ignore
        return !Component ? (
          <Button children="Something went wrong... click to reload" onClick={onClick} />
        ) : (
          <Component />
        )
      })
    },
    {
      fallback: <Spin />,
    }
  )

  if (withPreload) AsyncComponent.preload()

  return AsyncComponent
}
