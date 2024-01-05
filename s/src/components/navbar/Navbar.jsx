import Link from "next/link"
import Links from "./links/Links"

import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}> 
      <div className="navbar-button">
        <Links />
      </div>
    </div>
  )
}

export default Navbar