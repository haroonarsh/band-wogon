"use client"

import React, { useEffect, useState } from 'react'
import styles from './login.module.css'
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';

function Login() {
  const { data: session, status } = useSession();
  console.log("session : ",session);
  
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json();

      const { user, accessToken } = data;

             // Store the user data and accessToken in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);

      console.log('Login successful:', user);
      
      if (response.ok) {
        toast.success('Login successfuly')
        router.push('/home');
      } else {
        toast.error(`Error: ${data.error}`)
      }

      
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      router.push('/home');
    } 
  }, [session, router]);
  if (status === 'loading') {
    return (
      <p>Loading...</p>
    )
  }
  if (session) {
    return null
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
            onClick={() => signIn('google', { callbackUrl: '/home' })}
            > <img src="./images/google.png" alt="" />Sign up with Google</button>
            <button className={styles.button_4}> <img src="./images/facebook.png" alt="" />Sign up with Facebook</button>
            <button className={styles.button_5}> <img src="./images/apple-48.png" alt="" />Sign up with Apple</button>
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