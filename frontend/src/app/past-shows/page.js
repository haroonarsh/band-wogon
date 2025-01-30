"use client"

import React from 'react'
import styles from './past-shows.module.css'
import Header from '@/components/header/Header'
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function Page() {

    const router = useRouter();
    return (
        <>
                {/* Header */}
            <div className={styles.header}>
                <Header />
            </div>

                {/* Main */}
            <div className={styles.main}>
                <div className={styles.blank}><div></div></div>
                <div className={styles.main_content}>
                <div className={styles.heading_div}>
                    <FaArrowLeft className={styles.icon}
                    onClick={() => router.push('/upcoming-schedules')}
                    />
                    <h1 className={styles.heading}>Past shows</h1>
                    </div>
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
                        <button className={styles.button}>Check-in</button>
                    </div>
                    <div className={styles.show}>
                        <img src="./images/Image(1).png" alt="" />
                        <div className={styles.show_info}>
                            <h3>Andy Warhol <img src="./icons/viral.png" alt="" /></h3>
                            <p><MdOutlineLocationOn size={18} /> New York City</p>
                            <p><MdOutlineCalendarMonth size={16} /> 29 Oct, Thu 8-10 PM</p>
                            <p><FaRegClock size={16} /> 3:30 PM - 10:00 PM</p>
                        </div>
                        <button className={styles.button}>Check-in</button>
                    </div>
                    

                    {/* <button className={styles.add_show}><FaPlus /> Add show </button> */}
                </div>
            </div>
        </>
    )
}

export default Page
