"use client"

import React from 'react'
import styles from './artist-page-management.module.css'
import Header from '@/components/header/Header'
// import Sidebar from '@/components/sidebar/Sidebar'
import { FaRegCheckCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

function page() {
  return (
    <>
               {/* Header */}
               <Header />
            {/* Sidebar */}
        {/* <Sidebar /> */}

            {/* Main */}
        <div className={styles.main}>
            <div className={styles.blank}><div></div></div>
            <div className={styles.main_content}>
                <h1 className={styles.heading}>Artist page management</h1>
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
                    <button className={styles.button}><FaPlus /> Create page</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default page