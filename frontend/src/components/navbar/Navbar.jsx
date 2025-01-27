import React, { useState } from 'react'
import styles from './navbar.module.css'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className={styles.navbar}>
        <img className={styles.logo} src="./icons/instant_mix.png" alt="" />
        <div className={`${isOpen ? styles.genreActive : styles.genre}`} 
        onClick={toggleDropdown}>
          <img className={styles.img} src="./icons/genres.png" alt="" />
          <p>Genre</p>
          <img className={styles.arrow} src="./icons/arrow_drop_down.png" alt="" />
        </div>

            {/* // dropdown  */}
        {isOpen && (
          <ul className={styles.dropdown}>
          <li>
        <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Classical</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Blues</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>EDM</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Country</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Funk</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Folk</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Jazz</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Hip-Hop</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Metal</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Latin</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Punk</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Pop</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Rock</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Reggae</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>Soul</p>
          </li>
          <li>
          <input type="checkbox" id={styles.dropdown} name="dropdown" />
          <p>R&B</p>
          </li>
        </ul>
        )}

        <div className={styles.time}>
          <img className={styles.img} src="./icons/schedule.png" alt="schelude" />
          <p>Time</p>
          <img className={styles.arrow} src="./icons/arrow_drop_down.png" alt="" />
        </div>
        <div className={styles.saved}>
          <img className={styles.img} src="./icons/favorite.png" alt="" />
          <p>Saved</p>
        </div>
        <div className={styles.verified}>
          <img className={styles.img} src="./icons/check_circle.png" alt="" />
          <p>Verified</p>
        </div>
      </div>
    </>
  )
}

export default Navbar