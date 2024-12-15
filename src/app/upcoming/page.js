"use client"

import React, { useState } from 'react'
import styles from './upcoming_shows.module.css'
import { MdOutlineLocationOn } from "react-icons/md";
// import { GiMusicSpell } from "react-icons/gi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import Header from '@/components/header/Header';
// import { BiDollarCircle } from "react-icons/bi";
// import { FaSpotify } from "react-icons/fa";
// import { GrYoutube } from "react-icons/gr";
// import { FaSoundcloud } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { RiMoneyDollarBoxFill } from "react-icons/ri";
// import { FaVimeoV } from "react-icons/fa6";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";

function UpcomingShow() {

    const [isOpenTab, setIsOpenTab] = useState("upcoming");

    const events = {
        upcoming: [
            {
                name: "Andy Warhol",
                location: "New York City",
                date: "29 Oct, Thu",
                time: "3:30 PM - 10:00 PM",
            },
            {
                name: "Pablo Picasso",
                location: "Madrid",
                date: "15 Nov, Wed",
                time: "2:00 PM - 9:00 PM",
            },
            {
                name: "Pablo Picasso",
                location: "Madrid",
                date: "15 Nov, Wed",
                time: "2:00 PM - 9:00 PM",
            },
        ],
        past: [
            {
                name: "Vincent van Gogh",
                location: "Amsterdam",
                date: "12 May, Fri",
                time: "1:00 PM - 8:00 PM",
            },
            {
                name: "Leonardo da Vinci",
                location: "Florence",
                date: "20 Apr, Thu",
                time: "10:00 AM - 5:00 PM",
            },
        ],
    };

    const filterEvents = isOpenTab === "upcoming" ? events.upcoming : events.past;
  return (
    <>
            {/* header */}
        <Header />

    <div className={styles.upcoming_shows}>
        <div className={styles.blank}><div></div></div>
        <div className={styles.upcoming}>
        <h1 className='heading_3_medium'>Upcoming & Past Shows</h1>
        <div className={styles.show}>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${isOpenTab === "upcoming" ? styles.active : ""}`}
                onClick={() => setIsOpenTab("upcoming")}
                >
                    Upcoming
                </button>
                <button className={`${styles.button} ${isOpenTab === "past" ? styles.active : ""}`}
                onClick={() => setIsOpenTab("past")}
                >
                    Past
                </button>
            </div>
            
            {filterEvents.map((event, index) => (
                <div key={index} className={styles.show_details}>
                <img src="./images/Image(1).png" alt="" />
                <div className={styles.show_info}>
                    <h3>{event.name} <img src="./icons/viral.png" alt="" /></h3>
                    <p><MdOutlineLocationOn size={18} /> {event.location}</p>
                    <p><MdOutlineCalendarMonth size={16} /> {event.date}</p>
                    <p><FaRegClock size={16} /> {event.time}</p>
                </div>
                <button className={styles.button_2}>Save</button>
            </div>
            ))}
        </div>
    </div>
    </div>
    </>
  )
}

export default UpcomingShow