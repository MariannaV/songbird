import React from 'react'
import { NavLink, generatePath } from 'react-router-dom'
import { routesMap, ROUTES } from '../../consts/routes'
import styles from './index.scss'

interface IHeaderMenuItem {
  title: React.ReactNode
  url: string
  routeParams: Record<string, any>
}

export function HeaderNavigation() {
  const Menu = React.useMemo(
    () =>
      headerMenu.map(({ url, title, ...restMenuItem }) => (
        <NavLink to={url} children={title} exact className={styles.headerNavigationLink} key={`menuItem-${title}`} />
      )),
    []
  )
  return <nav children={Menu} className={styles.headerNavigation} />
}

export const headerMenu: Array<IHeaderMenuItem> = [
  {
    title: 'Train',
    get url() {
      return generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, this.routeParams)
    },
    routeParams: {},
  },
  {
    title: 'Australian',
    get url() {
      return generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, this.routeParams)
    },
    routeParams: { regionCode: 'AU' },
  },
  {
    title: 'British',
    get url() {
      return generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, this.routeParams)
    },
    routeParams: { regionCode: 'GB' },
  },
  {
    title: 'Brazilian',
    get url() {
      return generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, this.routeParams)
    },
    routeParams: { regionCode: 'BR' },
  },
  {
    title: 'African',
    get url() {
      return generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, this.routeParams)
    },
    routeParams: { regionCode: 'ZA' },
  },
  {
    title: 'Japanese',
    get url() {
      return generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, this.routeParams)
    },
    routeParams: { regionCode: 'JP' },
  },
]
