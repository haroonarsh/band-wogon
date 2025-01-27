"use client"

import React, { useEffect, useState } from 'react'
import styles from './login.module.css'
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
// import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';

function Login() {
  // const { data: session, status } = useSession();
  // console.log("session : ",session);
  
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    localStorage.removeItem('userData');
    localStorage.removeItem("UserAccessToken");
    localStorage.removeItem("accessToken");
    const googleUser = localStorage.removeItem("user");

    console.log("googleUser", googleUser);
    console.log("googleUserImage", googleUser?.profileImage);
    
    
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', formData);
  
      if (response.status === 200) {
        const user = response.data.data.user; // User data
        const accessToken = response.data.data.accessToken; // Access token
        console.log("token", accessToken);
        
  
        // Store user and token in localStorage
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('UserAccessToken', accessToken);
  
        toast.success(response.data.message);
        router.push('/home'); // Navigate to the home page
      }
    } catch (error) {
      toast.error("Invalid email or password");
      console.error("Login Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

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

        

                {/* // right section */}
        <form onSubmit={handleSubmit} className={styles.right_section}>
          <FaArrowLeft className={styles.icon}
          onClick={() => router.push('/')}
          />
            <h1 className='heading_1_Semibold'>Sign In to BandWagon</h1>
            <div className={styles.input_section}>
              <div>
              <MdOutlineEmail  className={styles.icon_2}/>
              <input type="email" placeholder='Email' value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required />
              </div>
              <div>
              <MdLockOutline className={styles.icon_2}/>
              <input type="password" placeholder='Password' value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              required />
              </div>
            </div>
    
            <button type='submit' className={styles.button_2}
            >{loading ? 'Loading...' : 'Sign In'}
            </button>
            <p className={styles.forget}>Forget Password</p>
            <p className={styles.or}><span>_______________________</span> or <span>_______________________</span></p>

            <button className={styles.button_3} 
            // onClick={handleGoogleLogin}
            onClick={handleGoogleLogin}
            > <img src="./images/google.png" alt="" />Sign up with Google</button>
            <button className={styles.button_4}> <img src="./images/facebook.png" alt="" />Sign up with Facebook</button>
            <button className={styles.button_5}> <img src="./images/apple-48.png" alt="" />Sign up with Apple</button>
            <p className={styles.already}>Don't have an account? <span onClick={() => router.push('/signup')}>Sign Up</span></p>
        </form>

                {/* // left section */}
                <section className={styles.left_section}>
          <div className={styles.text_section}>
            <h1 className='heading_1_Semibold'>Hello, Friend</h1>
            <p className='paragraph_large_medium'>It is a long established fact that a reader will be distracted by the readable.</p>
            <button className={styles.button}
            onClick={() => router.push('/signup')}
            >Sign Up</button>
          </div>
        </section>
    </div>
    </>
  )
}

export default Login