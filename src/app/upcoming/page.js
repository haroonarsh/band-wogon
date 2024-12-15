"use client"

import React, { useState } from 'react'
import styles from './upcoming_shows.module.css'
import { MdOutlineLocationOn } from "react-icons/md";
// import { GiMusicSpell } from "react-icons/gi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
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
                id: 1,
                name: "Andy Warhool",
                location: "New York City",
                date: "29 Oct, Thu 8-10 PM",
                time: "3:30 PM - 10:00 PM",
            },
            {
                id: 2,
                name: "Andy Warhool",
                location: "New York City",
                date: "29 Oct, Thu 8-10 PM",
                time: "3:30 PM - 10:00 PM",
            },
            {
                id: 3,
                name: "Andy Warhool",
                location: "New York City",
                date: "29 Oct, Thu 8-10 PM",
                time: "3:30 PM - 10:00 PM",
            },
        ],
        past: [
            {
                id: 1,
                name: "Andy Warhool",
                location: "New York City",
                date: "29 Oct, Thu 8-10 PM",
                time: "3:30 PM - 10:00 PM",
            },
            {
                id: 2,
                name: "Andy Warhool",
                location: "New York City",
                date: "29 Oct, Thu 8-10 PM",
                time: "3:30 PM - 10:00 PM",
            },
            {
                id: 3,
                name: "Andy Warhool",
                location: "New York City",
                date: "29 Oct, Thu 8-10 PM",
                time: "3:30 PM - 10:00 PM",
            },
        ],
    };
  return (
    <div className={styles.upcoming_shows}>
        <div className={styles.blank}><div></div></div>
        <div className={styles.upcoming}>
        <h1 className='heading_3_medium'>Upcoming & Past Shows</h1>
        <div className={styles.show}>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${isOpenTab === "upcoming" ? styles.active : ""}`}>
                    Upcoming
                </button>
                <button className={`${styles.button} ${isOpenTab === "past" ? styles.active : ""}`}>
                    Past
                </button>
            </div>
            <div className={styles.show_details}>
                <img src="" alt="" />
                <div className={styles.show_info}>
                    <h2>Andy Warhool <img src="./icons/viral.png" alt="" /></h2>
                    <p><MdOutlineLocationOn /> New York City</p>
                    <p><MdOutlineCalendarMonth /> 29 Oct, Thu 8-10 PM</p>
                    <p><FaRegClock /> 3:30 PM - 10:00 PM</p>
                </div>
                <button className={styles.button}>Save</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default UpcomingShow