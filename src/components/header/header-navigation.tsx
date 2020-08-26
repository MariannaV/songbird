import React from 'react'
import styles from './index.scss'

interface IHeaderMenuItem {
  title: React.ReactNode
  url: string
}

export function HeaderNavigation() {
  const Menu = React.useMemo(
    () =>
      menu.map((menuItem) => (
        <a href={menuItem.url} children={menuItem.title} role="button" key={`menuItem-${menuItem.url}`} />
      )),
    []
  )
  return <nav children={Menu} className={styles.headerNavigation} />
}

const menu: Array<IHeaderMenuItem> = [
  {
    title: 'Разминка',
    url: '/',
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
