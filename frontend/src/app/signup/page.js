"use client";

import React, { useEffect, useState } from 'react'
import styles from './signuppage.module.css'
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';

function SignupPage() {

  // const { data: session, status } = useSession();
  // console.log("Signup session : ",session);  
    const [loading, setLoading] = useState(false)
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })


    // Handle input changes
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post(`http://localhost:8000/api/user/signup`, formData);

        if (response.status === 201 || response.status === 200) {
          toast.success(response.message);
          router.push('/login');
        }
        if (response.status === 400) {
          toast.error(response.message);
        }
        console.log(response.data);
        
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

      // Handle Google Login Redirect Callback
  const handleGoogleLogin = () => {
    try {
      // Redirect to Google login page
      window.open('http://localhost:8000/auth/google/callback', '_self');
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  }


  return (
    <>
    <div className={styles.section}>

                {/* // left section */}
        <section className={styles.left_section}>
          <div>
            <h1 className='heading_1_Semibold'>Welcome back</h1>
            <p className='paragraph_large_medium'>It is a long established fact that a reader will be distracted by the readable.</p>
            <button className={styles.button}
            onClick={() => router.push('/login')}
            >Sign in</button>
          </div>
        </section>

                {/* // right section */}
        <form onSubmit={handleSubmit} className={styles.right_section}>
          <FaArrowLeft className={styles.icon}
          onClick={() => router.push('/')}
          />
            <h1 className='heading_1_Semibold'>Create an account</h1>
            <div className={styles.input_section}>
              <div className={styles.input}>
              <FaRegUser className={styles.icon_3}/>
              <input 
              type="text" 
              placeholder='Username' 
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
              required 
              />
              </div>
              <div className={styles.input}>
              <MdOutlineEmail  className={styles.icon_2}/>
              <input 
              type="email" 
              placeholder='Email' 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value })}
              required 
              />
              </div>
              <div className={styles.input}>
              <MdLockOutline className={styles.icon_2}/>
              <input 
              type="password" 
              placeholder='Password' 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value })}
              required 
              />
              </div>
            </div>
    
            <button type='submit' className={styles.button_2} disabled={loading}>
              {loading ? 'Loading...' : 'Sign up'}
              {/* <ToastContainer /> */}
              </button>
            <p className={styles.or}><span>_______________________</span> or <span>_______________________</span></p>

            <button className={styles.button_3}
            onClick={handleGoogleLogin}
            > <img src="./images/google.png" alt="" />Sign up with Google</button>
            <button className={styles.button_4}> <img src="./images/facebook.png" alt="" />Sign up with Facebook</button>
            <button className={styles.button_5}> <img src="./images/apple-48.png" alt="" />Sign up with Apple</button>
            <p className={styles.already}>Already have an account? <span onClick={() => router.push('/login')}>Sign in</span></p>
        </form>
    </div>
    </>
  )
}

export default SignupPage