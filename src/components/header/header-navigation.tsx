import React from 'react'
import { Link } from 'react-router-dom'
import { routesMap, ROUTES } from '../../consts/routes'
import styles from './index.scss'

interface IHeaderMenuItem {
  title: React.ReactNode
  url: string
  disabled?: boolean
}

export function HeaderNavigation() {
  const Menu = React.useMemo(
    () =>
      menu.map(({ url, title, ...restMenuItem }) => (
        <Link to={url} children={title} {...restMenuItem} className={styles.headerNavigationLink} key={`menuItem-${title}`} />
      )),
    []
  )
  return <nav children={Menu} className={styles.headerNavigation} />
}

const menu: Array<IHeaderMenuItem> = [
  {
    title: 'Разминка',
    url: routesMap.get(ROUTES.PageGame)!.props.pathname,
  },
  {
    title: 'Воробьиные',
    url: '/1',
    disabled: true,
  },
  {
    title: 'Лесные птицы',
    url: '/2',
    disabled: true,
  },
  {
    title: 'Певчие птицы',
    url: '/3',
    disabled: true,
  },
  {
    title: 'Хищные птицы',
    url: '/4',
    disabled: true,
  },
  {
    title: 'Морские птицы',
    url: '/5',
    disabled: true,
  },
]
