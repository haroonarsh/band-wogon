"use client";

import React, { useEffect, useRef, useState } from 'react'
import styles from './header.module.css'
import { IoMdSearch } from "react-icons/io";
import { LuArrowLeft } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Header() {

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [user, setUser] = useState(null)
  const router = useRouter();
  
  useEffect(() => {
          // Get the user data from localStorage
          const storedUser = localStorage.getItem('userData');
          const googeleUser = localStorage.getItem('user');
          if (storedUser || googeleUser) {
              setUser(JSON.parse(storedUser) || JSON.parse(googeleUser));
          }
      }, [])
  
            // Google login store user and token in sessionStorage
  const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/login/success", { withCredentials: true });

            setUser(response.data.user.user);
            
            localStorage.setItem('user', JSON.stringify(response.data.user.user));
            localStorage.setItem('accessToken', response.data.accessToken);
        } catch (error) {
            console.log("error", error)
        }
    }

const StoredUserData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        if (!StoredUserData) {
            getUser();
        }
    }, [])

    const switchUser = async () => {
      localStorage.removeItem('userData');
      localStorage.removeItem('user');
      const userDataToken = localStorage.getItem('UserAccessToken');
      const googleUserToken = localStorage.getItem('accessToken');

      try {
        if (user.role === "user") {
          const response = await axios.put("http://localhost:8000/api/user/become-artist",
            { withCredentials: true },
            {
              headers: {
                Authorization: `Bearer ${userDataToken === null || userDataToken === "undefined" 
                ? googleUserToken 
                : userDataToken}`,
              },
            }
          )
          if (userDataToken === null || userDataToken === "undefined") {
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            toast.success("You are now an artist");
            router.push('/login');
          } else {
            localStorage.setItem('userData', JSON.stringify(response.data.data.user));
            toast.success("You are now an artist please refresh the page");
            router.push('/home');
        } 
      } else {
        const response = await axios.put("http://localhost:8000/api/user/become-user",
          { withCredentials: true },
          {
            headers: {
              Authorization: `Bearer ${userDataToken === null || userDataToken === "undefined" 
              ? googleUserToken 
              : userDataToken}`,
            },
          }
        )
        if (userDataToken === null || userDataToken === "undefined") {
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          toast.success("You are now a user");
          router.push('/login');
        } else {
          localStorage.setItem('userData', JSON.stringify(response.data.data.user));
          toast.success("You are now a user please refresh the page");
          router.push('/home');
        }
          }
      } catch (error) {
        console.log("error", error);
        toast.error(error.response.data.message);
      }

    }

  const toggleDropdown = (e) => {
    e.preventDefault();
    setOpen(!open);
  }

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);
  
  return (
    <>
        <header className={styles.header}>
        <div className={styles.logo}>
          <img src="app-icon.png" alt="" />
          <h1 className='heading_4_regular'>BandWagon</h1>
        </div>
        <div className={styles.search}
        onClick={toggleDropdown}
        >
          <IoMdSearch className={styles.icon}/>
          <input type="text" placeholder='Search for Artist, Venues. or Addresses' />
        </div>
        {open && (
          <div className={styles.search2} ref={dropdownRef}>
          <div className={styles.search}>
            <LuArrowLeft className={styles.icon}
            onClick={toggleDropdown}/>
            <input type="text" placeholder='Search for Artist, Venues. or Addresses' />
            </div>
            <p className={styles.recent}>Recent searches</p>
  
            <div className={styles.recent_search}>
              <div className={styles.searches}>
              <img src="./images/img.png" alt="" />
              <h2>Allen Ruppersberg</h2>
              </div>
              <RxCross2 className={styles.icon}/>
            </div>
            <div className={styles.recent_search}>
              <div>
              <img src="./images/img.png" alt="" />
              <h2>Allen Ruppersberg</h2>
              </div>
              <RxCross2 className={styles.icon}/>
            </div>
  
            <div className={styles.recent_search2}>
              <p>555 55th St N, State Zip</p>
              <RxCross2 className={styles.icon2}/>
            </div>
            <div className={styles.recent_search2}>
              <p>BandWagon, 555 55th St N, City St...</p>
              <RxCross2 className={styles.icon2}/>
            </div>
          
          </div>
        )}
        
        <div className={styles.profile}>
        <button className={styles.switch}
        onClick={switchUser}
        >
          {user?.role === "artist" ? "Switch to User" : "Switch to Artist"}
        </button>
          <img className="cursor-pointer"  src={user?.profileImage} alt="profile" 
          onClick={() => router.push('/profile-screen')}
          />
        </div>
      </header>
    </>
  )
}

export default Header