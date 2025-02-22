"use client"

import React, { useState, useEffect } from 'react'
import styles from './upcoming_shows.module.css'
import { MdOutlineLocationOn } from "react-icons/md";
// import { GiMusicSpell } from "react-icons/gi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import Header from '@/components/header/Header';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
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

    const [shows, setShows] = useState([]);
    const { id } = useParams();
    const router = useRouter();
    const [isOpenTab, setIsOpenTab] = useState("upcoming");
    const [loading, setLoading] = useState(true);

    // Fetch shows based on selected tab
    useEffect(() => {

        const fetchShows = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/get-artist-shows/${id}?type=${isOpenTab}`);
                const artistData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                console.log("response", response);
                
                console.log("artistData", artistData);
                if (artistData) {
                    setShows(artistData);
                }
            } catch (error) {
                console.error('Error fetching upcoming shows:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchShows();
    }, [isOpenTab, id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatTimeRange = (startTime, endTime) => {
        if (!startTime || !endTime) return '';
        const format = (time) => new Date(`2000-01-01T${time}`)
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return `${format(startTime)} - ${format(endTime)}`;
    };

    if (loading) {
        return (
            /* From Uiverse.io by devAaus */ 
            <div className="flex items-center justify-center h-screen bg-zinc-900">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
                    </div>
                </div>
            </div>
        )
    }

    const icon = "./icons/viral.png"
    // const events = {
    //     upcoming: [
    //         shows.map(show => (
    //             <div key={show._id}>
    //                 <div className={styles.show}>
    //                     <div className={styles.location}>
    //                         <MdOutlineLocationOn className={styles.icon} />
    //                         <p className={styles.location_name}>{show.location}</p>
    //                     </div>
    //                     <div className={styles.date}>
    //                         <MdOutlineCalendarMonth className={styles.icon} />
    //                         <p className={styles.date_name}>{show.date}</p>
    //                     </div>
    //                     <div className={styles.time}>
    //                         <FaRegClock className={styles.icon} />
    //                         <p className={styles.time_name}>{show.time}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         ))
    //     ],
    //     past: [
    //         {
    //             name: "Vincent van Gogh",
    //             location: "Amsterdam",
    //             date: "12 May, Fri",
    //             time: "1:00 PM - 8:00 PM",
    //         },
    //         {
    //             name: "Leonardo da Vinci",
    //             location: "Florence",
    //             date: "20 Apr, Thu",
    //             time: "10:00 AM - 5:00 PM",
    //         },
    //     ],
    // };

    // const filterEvents = isOpenTab === "upcoming" ? events.upcoming : events.past;
  return (
    <>
            {/* header */}
        <Header />

    <div className={styles.upcoming_shows}>
        <div className={styles.blank}><div></div></div>
        <div className={styles.upcoming}>
        <div className={styles.header}>
        <MdOutlineKeyboardArrowLeft className={styles.icon3} onClick={() => router.push('/home')} />
          <h1 className='heading_3_medium'>{"Artist Shows"}</h1>
          </div>
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
            
            {loading ? (
                <div>Loading...</div>
            ) : (
                shows.length === 0 ? (
                    <div className={styles.noShows}>
                        No {isOpenTab} shows found
                    </div>
                ) : (
                    shows.map(show => (
                        <div key={show._id} className={styles.show_details}>
                            <img 
                                src={show.image || './images/Image(1).png'} 
                                alt={show.name} 
                                className={styles.showImage}
                            />
                            <div className={styles.show_info}>
                                <h3>
                                    {show.name}
                                    {show.isTrending || <img src={icon} />}
                                </h3>
                                <span><MdOutlineLocationOn size={18} /> <p> {show.location}</p></span>
                                <span>
                                    <MdOutlineCalendarMonth size={16} />
                                    <p>
                                    {formatDate(show.date)}
                                    </p>
                                </span>
                                <span>
                                    <FaRegClock size={16} />
                                    <p>
                                    {formatTimeRange(show.startTime, show.endTime)}
                                    </p>
                                </span>
                            </div>
                            <button className={styles.button_2}>
                                Save
                            </button>
                        </div>
                    ))
                )
            )}
        </div>
    </div>
    </div>
    </>
  )
}

export default UpcomingShow