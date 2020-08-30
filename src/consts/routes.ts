import { Route, RouteProps } from 'react-router-dom'
import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from '../modules/optimizations'

export interface IRouteParams extends RouteProps {
  id: ROUTES
  pathname: string
  name?: string
  Component: LoadableComponent<any>
}

export enum ROUTES {
  PageGame,
  PageNotMatch,
}

export const routesMap = new Map<ROUTES, { props: IRouteParams }>([])

routesMap.set(
  ROUTES.PageGame,
  new Route<IRouteParams>({
    id: ROUTES.PageGame,
    name: 'Homepage',
    pathname: '/:regionCode?',
    Component: getModuleAsync({
      moduleName: 'PageGame',
      moduleImport: () => import(/* webpackChunkName: "PageGame", webpackPrefetch: true */ '../pages/page-game'),
    }),
  })
)

routesMap.set(
  ROUTES.PageNotMatch,
  new Route<IRouteParams>({
    id: ROUTES.PageNotMatch,
    name: '404',
    pathname: '*',
    Component: getModuleAsync({
      moduleName: 'PageNoMatch',
      moduleImport: () => import(/* webpackChunkName: "PageNoMatch", webpackPrefetch: true */ '../pages/page-no-match'),
    }),
  })
)

export const routes: Array<{ props: IRouteParams }> = Array.from(routesMap.values())
