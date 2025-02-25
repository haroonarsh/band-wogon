'use client';

import React, { useEffect, useState } from 'react'
import styles from './sidebar.module.css'
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { GiGuitarHead } from "react-icons/gi";
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

function Sidebar() {

    const [showSidebar, setShowSidebar] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);

    console.log("USER : ",user);

            // Check if user data exists in localStorage
  useEffect(() => {
          // Get the user data from localStorage
          const storedUser = localStorage.getItem('userData');
          const googeleUser = localStorage.getItem('user');
        //   console.log("storedUser", storedUser);
        //     console.log("googeleUser", googeleUser);
          
          if (storedUser || googeleUser) {
              setUser(JSON.parse(storedUser) || JSON.parse(googeleUser));
          }
      }, [])

            // logout function
    const handleLogout = () => {
        const removeUser = localStorage.removeItem('user');
        localStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('UserAccessToken');
        // console.log("logout success");
        // console.log("removeUser", removeUser);
        
        router.push('/login');
    }

    const logoutGoogle = () => {
        const response = axios.get('http://localhost:8000/logout', { withCredentials: true });

        if (response.status === 200) {
            localStorage.removeItem('user');
            localStorage.removeItem('userData');
            localStorage.removeItem('UserAccessToken');
            localStorage.removeItem('accessToken');
        }
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    return (
        <>
            <div className={styles.sidebar}>
                <div className={`${pathname === '/home' ? styles.active : styles.location}`}
                onClick={() => router.push('/home')}
                >
                    <MdOutlineLocationOn className={styles.icon}/>
                </div>
                <div className={`${pathname === '/profile-screen' || pathname === '/edit-profile' ? styles.active : styles.profile}`}
                onClick={() => router.push('/profile-screen')}
                >
                    <MdOutlinePersonOutline className={styles.icon_2}/>
                </div>
                <div className={`${ pathname === '/notification' ? styles.active : styles.notification}`}
                onClick={() => router.push('/notification')}
                >
                    <MdNotificationsNone className={styles.icon3}/>
                </div>
                <div className={`${ pathname === '/setting' ? styles.active2 : styles.sitting}`}
                onClick={() => router.push('/setting')}
                >
                    <IoMdSettings className={styles.icon4}/>
                </div>
                {user && (
                    <div className={`${user?.role === 'artist' ? styles.show : styles.hide} ${pathname === '/artist-page-management' || pathname === '/create-page' || pathname === '/create-page2' ? styles.active : styles.artist}`}
                    onClick={() => router.push('/artist-page-management')}
                    >
                        <GiGuitarHead className={styles.icon_2}/>
                    </div>
                )}
                <div className={styles.move_item}
                onClick={handleLogout || logoutGoogle}
                >
                    <TbLogout className={styles.icon5}/>
                </div>
                <div className={styles.right_arrow}
                onClick={toggleSidebar}
                >
                    <MdOutlineKeyboardArrowRight className={styles.icon6}/>
                </div>
            </div>

                    {/* // Show sidebar */}
            {showSidebar && (
                <div className={styles.show_sidebar}>
                <div className={styles.show_location}
                onClick={() => router.push('/home')}>
                <MdOutlineLocationOn className={`${pathname === '/home' ? styles.icon2 : styles.icon}`}/>
                <p className={`${pathname === '/home' ? styles.active3 : ''}`}>Explore</p>
                </div>
                <div className={styles.show_profile} 
                onClick={() => router.push('/profile-screen')}>
                <MdOutlinePersonOutline className={`${pathname === '/profile-screen' || pathname === '/edit-profile' ? styles.icon2 : styles.icon}`}/>
                <p className={`${pathname === '/profile-screen' || pathname === '/edit-profile' ? styles.active3 : styles.inactive}`}>Profile</p>
                </div>
                <div className={styles.show_notification}
                onClick={() => router.push('/notification')}>
                <MdNotificationsNone className={`${pathname === '/notification' ? styles.icon2 : styles.icon}`}/>
                <p className={`${pathname === '/notification' ? styles.active3 : styles.inactive}`}>Notifications</p>
                </div>
                <div className={styles.show_sitting}
                onClick={() => router.push('/setting')}>
                <IoMdSettings className={`${pathname === '/setting' ? styles.icon2 : styles.icon}`}/>
                <p className={`${pathname === '/setting' ? styles.active3 : styles.inactive}`}>Settings</p>
                </div>
                {user.role === 'artist' && (
                    <div className={styles.show_profile}
                    onClick={() => router.push('/artist-page-management')}>
                    <GiGuitarHead className={`${pathname === '/artist-page-management' || pathname === '/create-page' || pathname === '/create-page2' ? styles.icon2 : styles.icon}`}/>
                    <p className={`${pathname === '/artist-page-management' || pathname === '/create-page' || pathname === '/create-page2' ? styles.active3 : styles.inactive}`}>Artist page</p>
                    </div>
                )}
                <div className={styles.show_move_item}
                onClick={handleLogout || logoutGoogle}
                >
                <TbLogout className={styles.icon}/>
                <p>Log out</p>
                </div>
                <div className={styles.show_left_arrow}
                onClick={toggleSidebar}
                >
                <MdOutlineKeyboardArrowLeft className={styles.icon}/>
                </div>

            </div>
            )}
        </>
    )
}

export default Sidebar
