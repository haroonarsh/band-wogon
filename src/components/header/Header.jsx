import React from 'react'
import styles from './header.module.css'
import { IoMdSearch } from "react-icons/io";

function Header() {
  return (
    <>
        <header className={styles.header}>
        <div className={styles.logo}>
          <img src="app-icon.png" alt="" />
          <h1 className='heading_4_regular'>BandWagon</h1>
        </div>
        <div className={styles.search}>
          <IoMdSearch className={styles.icon}/>
          <input type="text" placeholder='Search for Artist, Venues. or Addresses' />
        </div>
        <div className={styles.profile}>
          <img src="./images/profile.png" alt="" />
        </div>
      </header>
    </>
  )
}

export default Header