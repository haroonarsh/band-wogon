"use client"

import React, { useEffect, useState } from 'react'
import styles from './profile-screen.module.css'
import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { FaAngleRight } from "react-icons/fa6";
// import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Page() {

    const [ user, setUser ] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Get the user data from localStorage
        const storedUser = localStorage.getItem('userData');
        const googeleUser = localStorage.getItem('user');
        if (storedUser || googeleUser) {
            setUser(JSON.parse(storedUser) || JSON.parse(googeleUser));
        }
    }, [])
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
                    <img src={user?.profileImage} alt="Profile" />
                    <div className={styles.profile_info}>
                    <h2>Andy Warhool</h2>
                    <p className={`neutral5 ${styles.username}`}>@andywarhool234</p>
                    </div>
                    <button className={styles.button_3}
                    onClick={() => router.push('/edit-profile')}
                    >Edit profile</button>
                </div>
                <div className={styles.saved}>
                    <p>View saved & hidden artists</p> 
                    <FaAngleRight />
                </div>
                <div className={styles.artist}
                onClick={() => router.push('/artist-page-management')}
                >
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
