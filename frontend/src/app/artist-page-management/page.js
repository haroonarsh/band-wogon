"use client"

import React, { useEffect, useState } from 'react'
import styles from './artist-page-management.module.css'
import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { FaRegCheckCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

function page() {

    const router = useRouter();
    const [user, setUser] = useState(null);

            // Get the user data from localStorage
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
                <h1 className={styles.heading}>Artist page management</h1>
                </div>
                <div className={styles.content}>
                    <img src="./logo.png" alt="" />
                    <h1>Create an artist page</h1>
                    <div className={styles.artist}>
                        <FaRegCheckCircle size={20} className={styles.icon} color='#1ed760' />
                        <p>List your upcoming shows</p>
                    </div>
                    <div className={styles.artist}>
                        <FaRegCheckCircle size={20} className={styles.icon} color='#1ed760' />
                        <p>Link social media, music, and payment accounts</p>
                    </div>
                    <div className={styles.artist}>
                        <FaRegCheckCircle size={20} className={styles.icon} color='#1ed760' />
                        <p>See performance metrics from past shows</p>
                    </div>
                    <button className={styles.button}
                    onClick={() => router.push('/create-page')}
                    ><FaPlus /> Create page</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default page