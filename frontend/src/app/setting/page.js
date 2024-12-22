"use client"

import Header from '@/components/header/Header'
import React, { useState } from 'react'
import styles from './setting.module.css'
import Sidebar from '@/components/sidebar/Sidebar'
import { BiEditAlt } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdOutlinePersonRemoveAlt1 } from "react-icons/md";
import { BiFile } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { VscColorMode } from "react-icons/vsc";
import { MdLockOutline } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { LuSunMedium } from "react-icons/lu";
import { FiMoon } from "react-icons/fi";

function Page() {

    // const [isDarkMode, setIsDarkMode] = useState(false);
    // const [isHidden, setIsHidden] = useState(false);
    const [activeSection, setActiveSection] = useState("changeEmail");
    const [isOn, setIsOn] = useState({
        autoPlay: false,
        weeklyShow: false,
        savedShow: false,
        marketingEmail: false
    });

    const toggleSwitch = (switchKey) => {
        setIsOn((prevstate) => ({
            ...prevstate,
            [switchKey]: !prevstate[switchKey]
        }))
    }


    const randerContent = () => {
        switch (activeSection) {
            case 'changeEmail':
                return (
                    <div className={styles.change_email}>
                        <h1>Change email</h1>
                        <div className={styles.email}>
                            <MdOutlineMail size={22} color='#A3A3A3' />
                            <input type="email" placeholder='Email' required />
                        </div>
                        <div className={styles.email}>
                            <MdOutlineMail size={22} color='#A3A3A3' />
                            <input type="email" placeholder='New email' required />
                        </div>
                        <div className={styles.password}>
                            <MdLockOutline size={24} color='#A3A3A3' />
                            <input type="password" placeholder='Password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>

                        <button className={styles.button}>Save changes</button>
                    </div>
                );
            case 'changePassword':
                return (
                    <div className={styles.change_email}>
                        <h1>Change password</h1>
                        <div className={styles.email}>
                            <MdLockOutline size={22} color='#A3A3A3' />
                            <input type="password" placeholder='Old password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>
                        <div className={styles.email}>
                            <MdLockOutline size={22} color='#A3A3A3' />
                            <input type="password" placeholder='New password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>
                        <div className={styles.password}>
                            <MdLockOutline size={24} color='#A3A3A3' />
                            <input type="password" placeholder='Confirm password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>

                        <button className={styles.button}>Save changes</button>
                    </div>
                )
            case 'deleteAccount': 
                return (
                    <div className={styles.change_email}>
                        <h1>Delete account</h1>
                        <div className={styles.email}>
                            <MdLockOutline size={22} color='#A3A3A3' />
                            <input type="password" placeholder='Old password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>

                        <button className={styles.button}>Save changes</button>
                    </div>
                )
            case 'notification':
                return (
                    <div className={styles.change_notification}>
                        <h1>Notifications</h1>
                        <div className={`${styles.notification}`}>
                            <p>Playing near you now</p>
                            <div className={`${styles.switch} ${isOn.autoPlay ? styles.switchOn : styles.switchOff}`}
                            onClick={() => toggleSwitch('autoPlay')}
                            >
                            <div className={`${styles.circle} ${isOn.autoPlay ? styles.circleOn : styles.circleOff}`} />
                            </div>
                        </div>
                        <div className={`${styles.notification}`}>
                            <p>Radius</p>
                            <button className={styles.button_2}>15 miles</button>
                        </div>
                        <div className={`${styles.notification}`}>
                            <p>Weekly show lineup</p>
                            <div className={`${styles.switch} ${isOn.weeklyShow ? styles.switchOn : styles.switchOff}`}
                            onClick={() => toggleSwitch('weeklyShow')}
                            >
                            <div className={`${styles.circle} ${isOn.weeklyShow ? styles.circleOn : styles.circleOff}`} />
                            </div>
                        </div>
                        <div className={`${styles.notification}`}>
                            <p>Saved show reminders</p>
                            <div className={`${styles.switch} ${isOn.savedShow ? styles.switchOn : styles.switchOff}`}
                            onClick={() => {toggleSwitch('savedShow')}}
                            >
                            <div className={`${styles.circle} ${isOn.savedShow ? styles.circleOn : styles.circleOff}`} />
                            </div>
                        </div>
                        <div className={`${styles.notification}`}>
                            <p>Marketing emails</p>
                            <div className={`${styles.switch} ${isOn.marketingEmail ? styles.switchOn : styles.switchOff}`}
                            onClick={() => toggleSwitch('marketingEmail')}
                            >
                            <div className={`${styles.circle} ${isOn.marketingEmail ? styles.circleOn : styles.circleOff}`} />
                            </div>
                        </div>
                    </div>
                )
            case 'themes': 
            return (
                <div className={styles.change_email}>
                        <h1>Themes</h1>
                        <div className={styles.theme}>
                            <LuSunMedium size={24} color='#A3A3A3' />
                            <h2>Light Theme</h2>
                        </div>
                        <div className={styles.theme}>
                            <FiMoon size={24} color='#A3A3A3' />
                            <h2>Dark Theme</h2>
                        </div>
                    </div>
            )
        
            default:
                return null;
        }
    }
    return (
        <>
                    {/* Header */}
                    <Header />
                    {/* sidebar */}
            <Sidebar />

                    {/* main */}
            <div className={styles.main}>
                <div className={styles.blank}>
                    <div className={styles.settings}>
                        <h1 className={styles.heading}>Settings</h1>
                        <div className={styles.line}></div>
                        <div>
                            <div className={styles.account}>
                                <h2>Account</h2>
                            </div>
                            <div className={`${styles.route}`} onClick={() => setActiveSection('changeEmail')}>
                                <div>
                                <MdOutlineMail size={20} />
                                <h2>Change email</h2>
                                </div>
                                <FaAngleRight />
                            </div>
                            <div className={styles.route} onClick={() => setActiveSection('changePassword')}>
                            <div>
                                <MdOutlinePersonOutline size={20} />
                                <h2>Change password</h2>
                                </div>
                                <FaAngleRight />
                            </div>
                            <div className={styles.route} onClick={() => setActiveSection('deleteAccount')}>
                            <div>
                                <MdOutlinePersonRemoveAlt1 size={20} />
                                <h2>Delete account</h2>
                                </div>
                                <FaAngleRight />
                            </div>
                            
                            <div className={styles.account}>
                                <h2>Personal info</h2>
                            </div>
                            <div className={styles.route}>
                            <div>
                                <MdOutlinePersonOutline size={20} />
                                <h2>Privacy policy</h2>
                                </div>
                                <FaAngleRight />
                            </div>
                            <div className={styles.route}>
                            <div>
                                <BiFile size={20} />
                                <h2>Delete account</h2>
                                </div>
                                <FaAngleRight />
                                
                            </div>

                            <div className={styles.account}>
                                <h2>General</h2>
                            </div>
                            <div className={styles.route} onClick={() => setActiveSection('notification')}>
                            <div>
                                <IoMdNotificationsOutline size={20} />
                                <h2>Notifications</h2>
                                </div>
                                <FaAngleRight />
                            </div>
                            <div className={styles.route} onClick={() => setActiveSection('themes')}>
                            <div>
                                <VscColorMode size={20} />
                                <h2>Delete account</h2>
                                </div>
                                <FaAngleRight />
                            </div>
                        </div>
                    </div>
                </div>

                        {/* Main */}
                
                <div className={styles.main_content}>
                     {randerContent()}
            </div>
            </div>
        </>
    )
}

export default Page
