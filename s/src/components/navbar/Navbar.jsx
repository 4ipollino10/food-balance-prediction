import Links from "./links/Links"

import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
        <Links />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar