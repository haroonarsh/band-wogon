import React from 'react'
import styles from './login.module.css'
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

function Login() {
  return (
    <>
    <div className={styles.section}>

        

                {/* // right section */}
        <section className={styles.right_section}>
          <FaArrowLeft className={styles.icon}/>
            <h1 className='heading_1_Semibold'>Sign In to BandWagon</h1>
            <div className={styles.input_section}>
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
            <p className={styles.forget}>Forget Password</p>
            <p className={styles.or}><span>_______________________</span> or <span>_______________________</span></p>

            <button className={styles.button_3}> <img src="./images/google.png" alt="" />Sign up with Google</button>
            <button className={styles.button_4}> <img src="./images/facebook.png" alt="" />Sign up with Facebook</button>
            <button className={styles.button_5}> <img src="./images/apple-48.png" alt="" />Sign up with Apple</button>
        </section>

                {/* // left section */}
                <section className={styles.left_section}>
          <div className={styles.text_section}>
            <h1 className='heading_1_Semibold'>Hello, Friend</h1>
            <p className='paragraph_large_medium'>It is a long established fact that a reader will be distracted by the readable.</p>
            <button className={styles.button}>Sign Up</button>
          </div>
        </section>
    </div>
    </>
  )
}

export default Login