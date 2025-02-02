"use client"

import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'
import styles from './notification.module.css'
import { PiDotsThreeOutlineFill } from "react-icons/pi";

function page() {
  return (
    <>
             {/* Header */}
             <div className={styles.header}>
                <Header />
            </div>
            {/* Sidebar */}
        <Sidebar />

            {/* Main */}
        <div className={styles.main}>
            <div className={styles.blank}><div></div></div>
            <div className={styles.main_content}>
                <div className={styles.heading_div}>
                <h1>Notifications</h1>
                </div>
                <div className={styles.notification}>
                    <img src="./images/Image(1).png" alt="" />
                    <div className={styles.notification_info}>
                        <p>Three of your favourite artist are playing live in your area!</p>
                        <p className={`${'neutral5'} ${styles.time}`}>2 hours ago</p>
                    </div>
                    <PiDotsThreeOutlineFill size={27} className={styles.dots} />
                    <span className={styles.dot}></span>
                </div>
                <div className={styles.notification}>
                    <img src="./images/Image(1).png" alt="" />
                    <div className={styles.notification_info}>
                        <p>Three of your favourite artist are playing live in your area!</p>
                        <p className={`${'neutral5'} ${styles.time}`}>20 hours ago</p>
                    </div>
                    <PiDotsThreeOutlineFill size={27} className={styles.dots} />
                    {/* <span className={styles.dot}></span> */}
                </div>
                <div className={styles.notification}>
                    <img src="./images/Image(1).png" alt="" />
                    <div className={styles.notification_info}>
                        <p>Three of your favourite artist are playing live in your area!</p>
                        <p className={`${'neutral5'} ${styles.time}`}>2 day ago</p>
                    </div>
                    <PiDotsThreeOutlineFill size={27} className={styles.dots} />
                    {/* <span className={styles.dot}></span> */}
                </div>
            </div>
        </div>
    </>
  )
}

export default page