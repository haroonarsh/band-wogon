"use client"

import React from 'react'
import styles from './upcoming-schedules.module.css'
import Header from '@/components/header/Header'
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/navigation';

function Page() {

    const router = useRouter();
    return (
        <>
                {/* Header */}
            <Header />

                {/* Main */}
            <div className={styles.main}>
                <div className={styles.blank}><div></div></div>
                <div className={styles.main_content}>
                    <h1 className={styles.heading}>Upcoming schedules</h1>
                    <div className={styles.artist}>
                        <img src="./images/frame2.png" alt="" />
                        <h2>BandWagon music</h2>
                    </div>

                    <div className={styles.show}>
                        <img src="./images/Image(1).png" alt="" />
                        <div className={styles.show_info}>
                            <h3>Andy Warhol <img src="./icons/viral.png" alt="" /></h3>
                            <p><MdOutlineLocationOn size={18} /> New York City</p>
                            <p><MdOutlineCalendarMonth size={16} /> 29 Oct, Thu 8-10 PM</p>
                            <p><FaRegClock size={16} /> 3:30 PM - 10:00 PM</p>
                        </div>
                        <button className={styles.button}>Edit</button>
                    </div>
                    <div className={styles.show}>
                        <img src="./images/Image(1).png" alt="" />
                        <div className={styles.show_info}>
                            <h3>Andy Warhol <img src="./icons/viral.png" alt="" /></h3>
                            <p><MdOutlineLocationOn size={18} /> New York City</p>
                            <p><MdOutlineCalendarMonth size={16} /> 29 Oct, Thu 8-10 PM</p>
                            <p><FaRegClock size={16} /> 3:30 PM - 10:00 PM</p>
                        </div>
                        <button className={styles.button}>Edit</button>
                    </div>
                    

                    <button className={styles.add_show}
                    onClick={() => router.push('/create-show')}
                    ><FaPlus /> Add show </button>
                </div>
            </div>
        </>
    )
}

export default Page
