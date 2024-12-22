"use client"

import React from 'react'
import styles from './profile-screen.module.css'
import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { FaAngleRight } from "react-icons/fa6";

function Page() {
    return (
        <>
                  {/* Header */}
            <Header />

                    {/* sidebar */}
            <Sidebar />

            {/* Main */}
        <div className={styles.main}>
            <div className={styles.blank}><div></div></div>
            <div className={styles.main_content}>
                <div className={styles.artist_profile}>
                <div className={styles.profile}>
                    <img src="./images/profile.png" alt="" />
                    <div className={styles.profile_info}>
                    <h2>Andy Warhool</h2>
                    <p className={`neutral5 ${styles.username}`}>@andywarhool234</p>
                    </div>
                    <button className={styles.button_3}>Edit profile</button>
                </div>
                <div className={styles.saved}>
                    <p>View saved & hidden artists</p> 
                    <FaAngleRight />
                </div>
                <div className={styles.artist}>
                    <p>Artist page management</p> 
                    <FaAngleRight />
                </div>
                </div>
            </div> 
        </div>
        </>
    )
}

export default Page
