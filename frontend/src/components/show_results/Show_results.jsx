import React, { useEffect, useRef, useState } from 'react'
import styles from './show_results.module.css'
import { RiSendPlaneLine } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiMusicSpell } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaRegClock } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';


function Show_results({ artist }) {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const [activeSection, setActiveSection] = useState(null);
    const [artists, setArtists] = useState([]);   

            // function for getting Artists
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const token = localStorage.getItem('accessToken') || localStorage.getItem('UserAccessToken');
                const response = await axios.get('http://localhost:8000/api/user/get-artist', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.data) {
                    const artistData = Array.isArray(response?.data?.data) ? response.data.data : [response.data.data];
                    setArtists(artistData);
                }
            } catch (error) {
                console.error('Error fetching artists:', error);
            } 
            

        }

        fetchArtists();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

            // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown);
        return () => document.removeEventListener('mousedown', closeDropdown);
    })


    const handleSectionClick = () => {
        switch (activeSection) {
            case 'firstSection':
                return (
                    <div className={styles.show_results_2}
                ref={dropdownRef}
                >
                <div className={styles.close} 
                onClick={toggleDropdown}
                >
                    <RxCross2 className={styles.icon_3} size={23} cursor={'pointer'} />
                </div>
                <div className={styles.profile}>
                    <div className={styles.profile_text}>
                        <img src={artists[0]?.artistImage || "./images/Image.png"} alt="" width={45}/>
                        <div className={styles.profile_text_2}>
                        <h2>{artists[0]?.artistName || 'andwarhool234'} <img src="./icons/viral.png" alt="" /></h2>
                        <p>Artist</p>
                        </div>
                    </div>
                    <button className={styles.button_2}
                    onClick={() => router.push(`/artist_profile/${artists[0]?._id}`)}
                    >View profile</button>
                </div>
                <span className={styles.line} />
                <div className={styles.check_in}>
                    <h2>{artists[0]?.showPerformed || '362'}</h2>
                    <p>Check-ins</p>
                </div>
                <div className={styles.card_text2}>
                <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#d4d4d4' size={15} /> {formatDate(artists[0]?.startDate) || 'May 12, 2023'}</p>
                <p className='paragraph_extraSmall_medium'><FaRegClock color='#d4d4d4' size={15} /> 3:30 PM - 10:00 PM</p>
                <p className='paragraph_extraSmall_medium'><MdOutlineLocationOn color='#d4d4d4' size={15} /> {artists[0]?.location || 'New York City'}</p>
                <p className='paragraph_extraSmall_medium'><GiMusicSpell color='#d4d4d4' size={15} /> {artists[0]?.genres && ((artists[0]?.genres).join(', ') ) || 'Pop, Rock'}</p>
                </div>
                <div className={styles.map}>
                    <img src="./images/Map.png" alt="" />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.button_2}>Check-in live</button>
                    <button className={styles.button}>Get direction</button>
                </div>
            </div>
                );
            case 'secondSection':
                return (
                    <div className={styles.show_results_2}
                ref={dropdownRef}
                >
                <div className={styles.close} 
                onClick={toggleDropdown}
                >
                    <RxCross2 className={styles.icon_3} size={23} cursor={'pointer'} />
                </div>
                <div className={styles.profile}>
                    <div className={styles.profile_text}>
                        <img src={artists[1]?.artistImage || "./images/Image.png"} alt="" width={45}/>
                        <div className={styles.profile_text_2}>
                        <h2>{artists[1]?.artistName || 'andwarhool234'} <img src="./icons/viral.png" alt="" /></h2>
                        <p>Artist</p>
                        </div>
                    </div>
                    <button className={styles.button_2}
                    onClick={() => router.push(`/artist_profile/${artists[1]?._id}`)}
                    >View profile</button>
                </div>
                <span className={styles.line} />
                <div className={styles.check_in}>
                    <h2>{artists[1]?.showPerformed || '362'}</h2>
                    <p>Check-ins</p>
                </div>
                <div className={styles.card_text2}>
                <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#d4d4d4' size={15} /> {formatDate(artists[1]?.startDate) || 'May 12, 2023'}</p>
                <p className='paragraph_extraSmall_medium'><FaRegClock color='#d4d4d4' size={15} /> 3:30 PM - 10:00 PM</p>
                <p className='paragraph_extraSmall_medium'><MdOutlineLocationOn color='#d4d4d4' size={15} /> {artists[1]?.location || 'New York City'}</p>
                <p className='paragraph_extraSmall_medium'><GiMusicSpell color='#d4d4d4' size={15} /> {artists[1]?.genres && ((artists[1]?.genres).join(', ') ) || 'Pop, Rock'}</p>
                </div>
                <div className={styles.map}>
                    <img src="./images/Map.png" alt="" />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.button_2}>Check-in live</button>
                    <button className={styles.button}>Get direction</button>
                </div>
            </div>
                );
            case 'thirdSection':
                return (
                    <div className={styles.show_results_2}
                ref={dropdownRef}
                >
                <div className={styles.close} 
                onClick={toggleDropdown}
                >
                    <RxCross2 className={styles.icon_3} size={23} cursor={'pointer'} />
                </div>
                <div className={styles.profile}>
                    <div className={styles.profile_text}>
                        <img src={artists[2]?.artistImage || "./images/Image.png"} alt="" width={45}/>
                        <div className={styles.profile_text_2}>
                        <h2>{artists[2]?.artistName || 'andwarhool234'} <img src="./icons/viral.png" alt="" /></h2>
                        <p>Artist</p>
                        </div>
                    </div>
                    <button className={styles.button_2}
                    onClick={() => router.push(`/artist_profile/${artists[2]?._id}`)}
                    >View profile</button>
                </div>
                <span className={styles.line} />
                <div className={styles.check_in}>
                    <h2>{artists[2]?.showPerformed || '362'}</h2>
                    <p>Check-ins</p>
                </div>
                <div className={styles.card_text2}>
                <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#d4d4d4' size={15} /> {formatDate(artists[2]?.startDate) || 'May 12, 2023'}</p>
                <p className='paragraph_extraSmall_medium'><FaRegClock color='#d4d4d4' size={15} /> 3:30 PM - 10:00 PM</p>
                <p className='paragraph_extraSmall_medium'><MdOutlineLocationOn color='#d4d4d4' size={15} /> {artists[2]?.location || 'New York City'}</p>
                <p className='paragraph_extraSmall_medium'><GiMusicSpell color='#d4d4d4' size={15} /> {artists[2]?.genres && ((artists[2]?.genres).join(', ') ) || 'Pop, Rock'}</p>
                </div>
                <div className={styles.map}>
                    <img src="./images/Map.png" alt="" />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.button_2}>Check-in live</button>
                    <button className={styles.button}>Get direction</button>
                </div>
            </div>
                );
        }
    }

    return (
        <>
            <div className={styles.show_results}>
                <div className={styles.send} >
                    <RiSendPlaneLine className={styles.icon}  />
                </div>
                <div className={styles.all_results}>
                <div className={styles.results}>
                    <p className='paragraph_small_medium'>4 Results</p>
                </div>
                <div className={styles.cards}   >
                    <MdKeyboardArrowLeft className={styles.icon2}/>
                    <div className={styles.card}
                    onClick={toggleDropdown}
                    >
                        <div className={styles.card2}
                        onClick={() => setActiveSection('firstSection')}
                        >
                            <img src={ artists[0]?.artistImage || "./images/Image.png"} alt="" width={90} />
                            <div className={styles.card_text}>
                                <h2>{artists[0]?.artistName || 'andwarhool234'} <img src="./icons/viral.png" alt="" /></h2>
                                <span className={`${styles.location} && ${'paragraph_extraSmall_medium'}`}><MdOutlineLocationOn color='#737373' size={20} /> {artists[0]?.location || 'New York City'}</span>
                                <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#737373' size={20} /> {formatDate(artists[0]?.startDate) || 'Feb 25, 2023'}</p>
                                <span className={`${styles.genres} && ${'paragraph_extraSmall_medium'}`}><GiMusicSpell color='#737373' size={20} /> {artists[0]?.genres && ((artists[0]?.genres).join(', ') ) || 'Pop, Rock'}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}
                    onClick={toggleDropdown}
                    >
                        <div className={styles.card2}
                        onClick={() => setActiveSection('secondSection')}
                        >
                            <img src={artists[1]?.artistImage || "./images/Image(1).png"} alt="" width={90} />
                            <div className={styles.card_text}>
                                <h2>{artists[1]?.artistName || 'andwarhool234'} <img src="./icons/viral.png" alt="" /></h2>
                                <span className={`${styles.location} && ${'paragraph_extraSmall_medium'}`}><MdOutlineLocationOn color='#737373' size={20} /> {artists[1]?.location || 'New York City'}</span>
                                <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#737373' size={20} /> {formatDate(artists[1]?.startDate) || 'Feb 25, 2023'}</p>
                                <span className={`${styles.genres} && ${'paragraph_extraSmall_medium'}`}><GiMusicSpell color='#737373' size={20} /> {artists[1]?.genres && ((artists[1]?.genres).join(', ') ) || 'Pop, Rock'}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}
                    onClick={toggleDropdown}
                    >
                        <div className={styles.card2}
                        onClick={() => setActiveSection('thirdSection')}
                        >
                            <img src={artists[2]?.artistImage || "./images/Image(2).png"} alt="" width={90} />
                            <div className={styles.card_text}>
                                <h2>{artists[2]?.artistName || 'andwarhool234'} <img src="./icons/viral.png" alt="" /></h2>
                                <span className={`${styles.location} && ${'paragraph_extraSmall_medium'}`}><MdOutlineLocationOn color='#737373' size={20} /> {artists[2]?.location || 'New York City'}</span>
                                <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#737373' size={20} /> {formatDate(artists[2]?.startDate) || 'Feb 25, 2023'}</p>
                                <span className={`${styles.genres} && ${'paragraph_extraSmall_medium'}`}><GiMusicSpell color='#737373' size={20} /> {artists[2]?.genres && ((artists[2]?.genres).join(', ') ) || 'Pop, Rock'}</span>
                            </div>
                        </div>
                    </div>
                    <MdKeyboardArrowRight className={styles.icon2}/>
                </div>
                </div>
            </div>

                        {/* // show results after click */}
            {isOpen && (
                handleSectionClick()
            )}
            
        </>
    )
}

export default Show_results
