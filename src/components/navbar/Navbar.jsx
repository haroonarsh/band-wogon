import React from 'react'
import styles from './navbar.module.css'

function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <img className={styles.img} src="./icons/instant_mix.png" alt="" />
        <div>
          <img className={styles.img} src="./icons/genres.png" alt="" />
          <p>Genre</p>
          <img className={styles.arrow} src="./icons/arrow_drop_down.png" alt="" />
        </div>
        <div>
          <img className={styles.img} src="./icons/schedule.png" alt="schelude" />
          <p>Time</p>
          <img className={styles.arrow} src="./icons/arrow_drop_down.png" alt="" />
        </div>
        <div>
          <img className={styles.img} src="./icons/favorite.png" alt="" />
          <p>Saved</p>
        </div>
        <div>
          <img className={styles.img} src="./icons/check_circle.png" alt="" />
          <p>Verified</p>
        </div>
      </div>
    </>
  )
}

export default Navbar