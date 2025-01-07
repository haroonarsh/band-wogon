"use client";

import React, { useEffect, useRef, useState } from 'react'
import styles from './header.module.css'
import { IoMdSearch } from "react-icons/io";
import { LuArrowLeft } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


function Header() {

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [user, setUser] = useState(null)
  const router = useRouter();
  // const { data: session } = useSession();
  // if (session) {
  //   const { user } = session;
  //   // console.log("user : ",user);
  // }

  useEffect(() => {
           // Get the user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.log('No user data');
    }
  }, []);

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

  // console.log("session : ",session);
  // console.log("user : ",user);
  
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
          <img className="cursor-pointer"  src={user?.profileImage} alt="profile" 
          onClick={() => router.push('/profile-screen')}
          />
        </div>
      </header>
    </>
  )
}

export default Header