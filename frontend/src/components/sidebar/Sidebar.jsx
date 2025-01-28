import React, { useState } from 'react'
import styles from './sidebar.module.css'
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

function Sidebar() {

    const [showSidebar, setShowSidebar] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        const removeUser = localStorage.removeItem('user');
        localStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('UserAccessToken');
        console.log("logout success");
        console.log("removeUser", removeUser);
        
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
                <div className={`${pathname === '/profile-screen' ? styles.active : styles.profile}`}
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
                <div className={styles.show_location}>
                <MdOutlineLocationOn className={styles.icon2}/>
                <p>Explore</p>
                </div>
                <div className={styles.show_profile} >
                <MdOutlinePersonOutline className={styles.icon}/>
                <p>Profile</p>
                </div>
                <div className={styles.show_notification}>
                <MdNotificationsNone className={styles.icon}/>
                <p>Notifications</p>
                </div>
                <div className={styles.show_sitting}>
                <IoMdSettings className={styles.icon}/>
                <p>Settings</p>
                </div>
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
