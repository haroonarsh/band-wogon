"use client"

import React, { useEffect, useState } from 'react'
import styles from './upcoming-schedules.module.css'
import Header from '@/components/header/Header'
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

function Page() {

    const router = useRouter();
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Function to filter out past shows
    const filterPastShows = (showsList) => {
        const currentDate = new Date();
        return showsList.filter(show => {
            // Convert the date string to a Date object
            const endDateTime = new Date(show.date);
            // Check if the show date is in the past
            if (show.endTime) {
                const [hours, minutes] = show.endTime.split(':');
                endDateTime.setHours(parseInt(hours, 10));
                endDateTime.setMinutes(parseInt(minutes, 10));
            } else {
                // Set the time to 23:59:59 if endTime is not provided
                endDateTime.setHours(23, 59, 59);
            }

            return endDateTime > currentDate;
        });
    };

    // Fetch user data and shows
    useEffect(() => {
        const fetchUserAndShows = async () => {
            try {
                // Get user data from localStorage
                const storedUser = JSON.parse(localStorage.getItem('userData') || localStorage.getItem('user'));
                setUser(storedUser);

                // Fetch shows from backend
                const token = localStorage.getItem('UserAccessToken') || localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:8000/api/user/get-shows', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.data) {
                    const showsData = Array.isArray(response?.data?.data.shows) ? response.data.data.shows : [response.data.data.shows];

                    // initialize shows
                    const filteredShows = filterPastShows(showsData);
                    setShows(filteredShows);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error loading shows');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndShows();

        // Set up automatic refresh every minutes
        const intervalId = setInterval(() => [
            setShows(prevShows => {
                const updatedShows = filterPastShows(prevShows);
                return updatedShows;
            })
        ], 60000);
        // Clean up the interval
        return () => clearInterval(intervalId);
    }, []);

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
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatTime = (timeString) => {
        const time = new Date(`2000-01-01T${timeString}`);
        return time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };
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
                    onClick={() => router.push('/create-page')}
                    />
                    <h1 className={styles.heading}>Upcoming schedule</h1>
                    </div>
                    {user?.artistProfile && (
                        <div className={styles.artist}>
                        <img src={user?.profileImage || "./images/frame2.png"} alt="Artist Image" />
                        <h2>{user.username}</h2>
                    </div>
                    )}

                    {shows.length === 0 ? (
                        <div className={styles.noShows}>
                            <p>No upcoming shows found</p>
                        </div>
                    ) : (
                         shows.map(show => (
                            <div className={styles.show} key={show._id}>
                        <img src={show.image || "./images/Image(1).png"} alt={show.name} />
                        <div className={styles.show_info}>
                            <div className={styles.show2}>
                            <h3>{show.name} <img src="./icons/viral.png" alt="" /></h3>
                            <span><MdOutlineLocationOn size={18} /> <p> {show.location}</p></span>
                            <span><MdOutlineCalendarMonth size={16} />  <p>
                                        {formatDate(show.date)} {show.startTime && `, ${formatTime(show.startTime)}`}
                                    </p></span>
                            
                            <span>
                            <FaRegClock size={16} />
                            {show.endTime && (
                                <p> 
                                    {formatTime(show.startTime)} - {formatTime(show.endTime)}
                                </p>
                            )}
                            </span>
                            
                            </div>
                        </div>
                        <button className={styles.button}
                        onClick={() => router.push(`/edit-show/${show._id}`)}
                        >
                            Edit
                        </button>
                    </div>
                        ))
                    )
                    }
                    
                    

                    <button className={styles.add_show}
                    onClick={() => router.push('/create-show')}
                    ><FaPlus /> Add show </button>
                </div>
            </div>
        </>
    )
}

export default Page
