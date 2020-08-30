import React from 'react'
import { NavLink, generatePath } from 'react-router-dom'
import { routesMap, ROUTES } from '../../consts/routes'
import styles from './index.scss'

interface IHeaderMenuItem {
  title: React.ReactNode
  url: string
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
    url: generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname),
  },
  {
    title: 'Australian',
    url: generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, { regionCode: 'AU' }),
  },
  {
    title: 'British',
    url: generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, { regionCode: 'GB' }),
  },
  {
    title: 'Brazilian',
    url: generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, { regionCode: 'BR' }),
  },
  {
    title: 'African',
    url: generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, { regionCode: 'ZA' }),
  },
  {
    title: 'Japanese',
    url: generatePath(routesMap.get(ROUTES.PageGame)!.props.pathname, { regionCode: 'JP' }),
  },
]
