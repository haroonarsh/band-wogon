import React, { useState } from 'react'
import styles from './sidebar.module.css'
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";


function Sidebar() {

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.location}>
                    <MdOutlineLocationOn className={styles.icon}/>
                </div>
                <div className={styles.profile}>
                    <MdOutlinePersonOutline className={styles.icon}/>
                </div>
                <div className={styles.notification}>
                    <MdNotificationsNone className={styles.icon}/>
                </div>
                <div className={styles.sitting}>
                    <IoMdSettings className={styles.icon}/>
                </div>
                <div className={styles.move_item}>
                    <TbLogout className={styles.icon}/>
                </div>
                <div className={styles.right_arrow}
                onClick={toggleSidebar}
                >
                    <MdOutlineKeyboardArrowRight className={styles.icon}/>
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
                <div className={styles.show_move_item}>
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
