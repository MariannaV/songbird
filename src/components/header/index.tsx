import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { routesMap, ROUTES } from '../../consts/routes'
import { birdGameSelectors } from '../../store/birdGame/selectors'
import styles from './index.scss'
import { HeaderNavigation } from './header-navigation'

export function Header(): React.ReactElement {
  return (
    <header className={styles.header}>
      <Link to={routesMap.get(ROUTES.PageGame)!.props.pathname} className={styles.headerLogo} />
      <UserStatistics />
      <HeaderNavigation />
    </header>
  )
}

const UserStatistics = () => {
  const score = useSelector(birdGameSelectors.getGameScore)
  return <div children={`Score: ${score}`} className={styles.userStatistics} />
}
