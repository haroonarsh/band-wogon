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


function Show_results() {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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
                        <img src="./images/Image.png" alt="" width={90} />
                        <div className={styles.card_text}>
                            <h2>Allen Ruppersberg <img src="./icons/viral.png" alt="" /></h2>
                            <p className='paragraph_extraSmall_medium'><MdOutlineLocationOn color='#737373' size={20} /> New York City</p>
                            <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#737373' size={20} /> 29 Oct, Thu 8-10 PM</p>
                            <p className='paragraph_extraSmall_medium'><GiMusicSpell color='#737373' size={20} /> Pop, Rock, Blues</p>
                        </div>
                    </div>
                    <div className={styles.card}
                    onClick={toggleDropdown}
                    >
                        <img src="./images/Image(1).png" alt="" width={90} />
                        <div className={styles.card_text}>
                            <h2>Andy Warhool <img src="./icons/viral.png" alt="" /></h2>
                            <p className='paragraph_extraSmall_medium'><MdOutlineLocationOn color='#737373' size={20} /> New York City</p>
                            <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#737373' size={20} /> 29 Oct, Thu 8-10 PM</p>
                            <p className='paragraph_extraSmall_medium'><GiMusicSpell color='#737373' size={20} /> Pop, Rock, Blues</p>
                        </div>
                    </div>
                    <div className={styles.card}
                    onClick={toggleDropdown}
                    >
                        <img src="./images/Image(2).png" alt="" width={90} />
                        <div className={styles.card_text}>
                            <h2>Bil Gates<img src="./icons/viral.png" alt="" /></h2>
                            <p className='paragraph_extraSmall_medium'><MdOutlineLocationOn color='#737373' size={20} /> New York City</p>
                            <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#737373' size={20} /> 29 Oct, Thu 8-10 PM</p>
                            <p className='paragraph_extraSmall_medium'><GiMusicSpell color='#737373' size={20} /> Pop, Rock, Blues</p>
                        </div>
                    </div>
                    <MdKeyboardArrowRight className={styles.icon2}/>
                </div>
                </div>
            </div>

                        {/* // show results after click */}
            {isOpen && (
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
                        <img src="./images/Image(1).png" alt="" width={45}/>
                        <div className={styles.profile_text_2}>
                        <h2>Andy Warhool <img src="./icons/viral.png" alt="" /></h2>
                        <p>Artist</p>
                        </div>
                    </div>
                    <button className={styles.button_2}>View profile</button>
                </div>
                <span className={styles.line} />
                <div className={styles.check_in}>
                    <h2>853</h2>
                    <p>Check-ins</p>
                </div>
                <div className={styles.card_text2}>
                <p className='paragraph_extraSmall_medium'><MdOutlineCalendarMonth color='#d4d4d4' size={15} /> 1 Dec 2023</p>
                <p className='paragraph_extraSmall_medium'><FaRegClock color='#d4d4d4' size={15} /> 3:30 PM - 10:00 PM</p>
                <p className='paragraph_extraSmall_medium'><MdOutlineLocationOn color='#d4d4d4' size={15} /> New York, 10001</p>
                <p className='paragraph_extraSmall_medium'><GiMusicSpell color='#d4d4d4' size={15} /> Pop, Rock, Blues</p>
                </div>
                <div className={styles.map}>
                    <img src="./images/Map.png" alt="" />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.button_2}>Check-in live</button>
                    <button className={styles.button}>Get direction</button>
                </div>
            </div>
            )}
            
        </>
    )
}

export default Show_results
