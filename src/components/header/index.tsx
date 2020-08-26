import React from 'react'
import styles from './index.scss'
import { HeaderNavigation } from './header-navigation'

export function Header(): React.ReactElement {
  return (
    <header className={styles.header}>
      <a href="/" role="button" className={styles.headerLogo} />
      <UserStatistics />
      <HeaderNavigation />
    </header>
  )
}

const UserStatistics = () => {
  const score = 0 //TODO: from store
  return <div children={`Score: ${score}`} className={styles.userStatistics} />
}
