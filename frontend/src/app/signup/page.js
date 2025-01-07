"use client";

import React, { useEffect, useState } from 'react'
import styles from './signuppage.module.css'
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';

function SignupPage() {

  // const { data: session, status } = useSession();
  // console.log("Signup session : ",session);  
  
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json();
      console.log('Signup data:', data);
      

      const { user, accessToken } = data;
      console.log('Signup user:', user);
      

      // Store the user data and accessToken in localStorage
      if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.log('No user data');  
      }
      localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('userId', user._id);

      if (data.error) {
        toast.error(data.error);
        // alert(`Error: ${data.error}`);
        return;
      }
      if (response.ok) {
        // alert("Signup successful! 🎉");
        toast.success('Signup successful! 🎉')
        router.push('/login');
      } else {
        toast.error('An error occurred. Please try again.');
        // alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }


  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push('/home');
  //   }
  // }, [status, router]);

  // if (session ) {
  //   router.push('/home');
  // }
  // useEffect(() => {
  //   if (session) {
  //     router.push('/home');
  //   }
  // }, [session, router]);
  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }
  // if (session) {
  //   return null;
  // }

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
              <div>
              <FaRegUser className={styles.icon}/>
              <input 
              type="text" 
              placeholder='Username' 
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
              required 
              />
              </div>
              <div>
              <MdOutlineEmail  className={styles.icon_2}/>
              <input 
              type="email" 
              placeholder='Email' 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value })}
              required 
              />
              </div>
              <div>
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
            onClick={() => signIn('google', { callbackUrl: '/home' })}
            > <img src="./images/google.png" alt="" />Sign up with Google</button>
            <button className={styles.button_4}> <img src="./images/facebook.png" alt="" />Sign up with Facebook</button>
            <button className={styles.button_5}> <img src="./images/apple-48.png" alt="" />Sign up with Apple</button>
        </form>
    </div>
    </>
  )
}

export default SignupPage