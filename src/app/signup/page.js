import React from 'react'
import styles from './signuppage.module.css'
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

function SignupPage() {
  return (
    <>
    <div className={styles.section}>

                {/* // left section */}
        <section className={styles.left_section}>
          <div>
            <h1 className='heading_1_Semibold'>Welcome back</h1>
            <p className='paragraph_large_medium'>It is a long established fact that a reader will be distracted by the readable.</p>
            <button className={styles.button}>Sign in</button>
          </div>
        </section>

                {/* // right section */}
        <section className={styles.right_section}>
          <FaArrowLeft className={styles.icon}/>
            <h1 className='heading_1_Semibold'>Create an account</h1>
            <div className={styles.input_section}>
              <div>
              <FaRegUser className={styles.icon}/>
              <input type="text" placeholder='Username' required />
              </div>
              <div>
              <MdOutlineEmail  className={styles.icon_2}/>
              <input type="email" placeholder='Email' required />
              </div>
              <div>
              <MdLockOutline className={styles.icon_2}/>
              <input type="password" placeholder='Password' required />
              </div>
            </div>
    
            <button className={styles.button_2}>Sign up</button>
            <p className={styles.or}><span>_______________________</span> or <span>_______________________</span></p>

            <button className={styles.button_3}> <img src="./images/google.png" alt="" />Sign up with Google</button>
            <button className={styles.button_4}> <img src="./images/facebook.png" alt="" />Sign up with Facebook</button>
            <button className={styles.button_5}> <img src="./images/apple-48.png" alt="" />Sign up with Apple</button>
        </section>
    </div>
    </>
  )
}

export default SignupPage