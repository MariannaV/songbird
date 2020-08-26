import React from 'react'
import { Link } from 'react-router-dom'
import { routesMap, ROUTES } from '../../consts/routes'
import styles from './index.scss'

interface IHeaderMenuItem {
  title: React.ReactNode
  url: string
}

export function HeaderNavigation() {
  const Menu = React.useMemo(
    () => menu.map((menuItem) => <Link to={menuItem.url} children={menuItem.title} key={`menuItem-${menuItem.url}`} />),
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
  },
  {
    title: 'Лесные птицы',
    url: '/2',
  },
  {
    title: 'Певчие птицы',
    url: '/3',
  },
  {
    title: 'Хищные птицы',
    url: '/4',
  },
  {
    title: 'Морские птицы',
    url: '/5',
  },
]
