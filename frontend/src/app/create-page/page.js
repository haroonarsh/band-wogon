"use client"

import React, { useState } from 'react'
import styles from './create-page.module.css'
import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/navigation';


function Page() {

    const router = useRouter();

    return (
        <>
            {/* Header */}
            <div className={styles.header}>
            <Header />
            </div>
            {/* Sidebar */}
            <div className={styles.sidebar}>
            <Sidebar />
            </div>

            {/* Main */}
        <div className={styles.main}>
            <div className={styles.blank}><div></div></div>
            <div className={styles.main_content}>
                <div className={styles.heading_div}>
                <h1 className={styles.heading}>Create page</h1>
                </div>

                <div className={styles.content_div}>
                    <div className={styles.content}>
                    <div className={styles.dots}>
                    <PiDotsThreeOutlineFill size={20} cursor={'pointer'} />
                    </div>
                    <div className={styles.artist}>
                        <img src="./images/Image(1).png" alt="" />
                        <h2>BandWagon music</h2>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={() => router.push('/edit-profile')}>Edit profile</button>
                        <button onClick={() => router.push('/upcoming-schedules')}>Show schedule</button>
                        <button onClick={() => router.push('/past-shows')}>Past shows</button>
                    </div>
                </div>
                <button className={styles.button} 
                onClick={() => router.push('/create-page2')}
                ><FaPlus /> Create page</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Page
