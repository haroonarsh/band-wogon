"use client"

import Header from '@/components/header/Header'
import React from 'react'
import styles from './edit-profile.module.css'
import Sidebar from '@/components/sidebar/Sidebar'
import { BiEditAlt } from "react-icons/bi";

function Page() {
    return (
        <>
                    {/* Header */}
            <Header />
                    {/* sidebar */}
            <Sidebar />

                    {/* main */}
            <div className={styles.main}>
                <div className={styles.blank}><div></div></div>
                <div className={styles.main_content}>
                    <h1 className={styles.heading}>Edit profile</h1>
                <div className={styles.profile}>
                    <div className={styles.profile_info}>
                        <div className='relative'>
                        <img src="./images/profile.png" alt="" />
                        <BiEditAlt className={styles.edit} />
                        </div>
                        <h1 className={styles.name}>Andy Warhool</h1>

                        <div className={styles.username}>
                            <p>Name</p>
                            <input type="text" placeholder='Andy Warhool' />
                        </div>
                        <div className={styles.username}>
                            <p>User name</p>
                            <input type="text" placeholder='andywarhool234' />
                        </div>
                        <div className={styles.username}>
                            <p>Location</p>
                            <input type="text" placeholder='New York, 20002' />
                        </div>
                        <button className={styles.button}>Save</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Page
