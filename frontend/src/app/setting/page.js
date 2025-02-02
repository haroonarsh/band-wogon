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
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

function Page() {

    // const [isDarkMode, setIsDarkMode] = useState(false);
    // const [isHidden, setIsHidden] = useState(false);
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("changeEmail");
    const [isOn, setIsOn] = useState({
        autoPlay: false,
        weeklyShow: false,
        savedShow: false,
        marketingEmail: false
    });

                // Change password code
    const [input, setInput] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
        email: '',
        newEmail: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handlePassword = async (e) => {
        e.preventDefault();
        // console.log("input", input);

        const formData = new FormData();
        formData.append('password', input.password);
        formData.append('newPassword', input.newPassword);
        formData.append('confirmPassword', input.confirmPassword);

        localStorage.removeItem('user');
        localStorage.removeItem('userData');
        const userDataToken = localStorage.getItem('UserAccessToken');
        const googleUserToken = localStorage.getItem('accessToken');

        try {
            const response = await axios.put('http://localhost:8000/api/user/update-password', formData, {
                headers: {
                    'Authorization': `Bearer ${userDataToken || googleUserToken}`,
                    'Content-Type': 'application/json'
                }
            })
            // console.log("response", response);
            if (userDataToken === null || userDataToken === "undefined") {
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                toast.success("Password updated successfully");
                router.push('/login');
            } else {
                localStorage.setItem('userData', JSON.stringify(response.data.data.user));
                toast.success("Password updated successfully");
                router.push('/home');
            }
            
        } catch (error) {
            // console.log("erroR", error);
            toast.error(error.response.data.message);
        }
        
    }

                    // Change email code
    const handleEmail = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', input.email);
        formData.append('newEmail', input.newEmail);
        formData.append('password', input.password);

        localStorage.removeItem('user');
        localStorage.removeItem('userData');
        const userDataToken = localStorage.getItem('UserAccessToken');
        const googleUserToken = localStorage.getItem('accessToken');

        try {
            const response = await axios.put('http://localhost:8000/api/user/update-email', formData, {
                headers: {
                    'Authorization': `Bearer ${userDataToken || googleUserToken}`,
                    'Content-Type': 'application/json'
                }
            })
            // console.log("response", response);
            if (userDataToken === null || userDataToken === "undefined") {
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                toast.success("Email updated successfully");
                router.push('/login');
            } else {
                localStorage.setItem('userData', JSON.stringify(response.data.data.user));
                toast.success("Email updated successfully");
                router.push('/home');
            }
        } catch (error) {
            // console.log("erroR", error);
            toast.error(error.response.data.message);
        }
    }

                    // Delete account code
    const handleDelete = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('password', input.password);

  // 1. Get tokens BEFORE deleting localStorage
  const userDataToken = localStorage.getItem('UserAccessToken');
  const googleUserToken = localStorage.getItem('accessToken');
  const storedUser = localStorage.getItem('userData');
  const googleUser = localStorage.getItem('user');

  console.log("userDataToken", userDataToken);
  console.log("googleUserToken", googleUserToken);
  console.log("storedUser", storedUser);
  console.log("googleUser", googleUser);

  // 2. Determine which token to use
//   const authToken = storedUser ? userDataToken : googleUserToken;

  try {
    const response = await axios.delete(
      'http://localhost:8000/api/user/delete-user',
    //   { data: formData },
      {
        data: formData,
        headers: {
            'Authorization': `Bearer ${userDataToken || googleUserToken}`,
            'Content-Type': 'application/json'
        }
      }
    );

    if (response) {
      // 3. Clear localStorage AFTER successful deletion
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      localStorage.removeItem('UserAccessToken');
      localStorage.removeItem('accessToken');

      toast.success("Account deleted successfully");
      router.push('/login');
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error.response?.data?.message || "Deletion failed");
  }
};


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
                    <form onSubmit={handleEmail} className={styles.change_email}>
                        <h1>Change email</h1>
                        <div className={styles.email}>
                            <MdOutlineMail size={22} color='#A3A3A3' />
                            <input type="email" name='email' value={input.email} onChange={handleChange} placeholder='Email' required />
                        </div>
                        <div className={styles.email}>
                            <MdOutlineMail size={22} color='#A3A3A3' />
                            <input type="email" name='newEmail' value={input.newEmail} onChange={handleChange} placeholder='New email' required />
                        </div>
                        <div className={styles.password}>
                            <MdLockOutline size={24} color='#A3A3A3' />
                            <input type="password" name='password' value={input.password} onChange={handleChange} placeholder='Password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>

                        <button type='submit' className={styles.button}>Save changes</button>
                    </form>
                );
            case 'changePassword':
                return (
                    <form onSubmit={handlePassword} className={styles.change_email}>
                        <h1>Change password</h1>
                        <div className={styles.email}>
                            <MdLockOutline size={22} color='#A3A3A3' />
                            <input type="password" name='password' value={input.password} onChange={handleChange} placeholder='Old password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>
                        <div className={styles.email}>
                            <MdLockOutline size={22} color='#A3A3A3' />
                            <input type="password" name='newPassword' value={input.newPassword} onChange={handleChange} placeholder='New password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>
                        <div className={styles.password}>
                            <MdLockOutline size={24} color='#A3A3A3' />
                            <input type="password" name='confirmPassword' value={input.confirmPassword} onChange={handleChange} placeholder='Confirm password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>

                        <button type='submit' className={styles.button}>Save changes</button>
                    </form>
                )
            case 'deleteAccount': 
                return (
                    <form onSubmit={handleDelete} className={styles.change_email}>
                        <h1>Delete account</h1>
                        <div className={styles.email}>
                            <MdLockOutline size={22} color='#A3A3A3' />
                            <input type="password" name='password' value={input.password} onChange={handleChange} placeholder='password' required />
                            <BiHide size={24} color='#A3A3A3' cursor={'pointer'} />
                        </div>

                        <button type='submit' className={styles.button}>Save changes</button>
                    </form>
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
            <div className={styles.header}>
                <Header />
            </div>
                    {/* sidebar */}
            <Sidebar />

                    {/* main */}
            <div className={styles.main}>
                <div className={styles.blank}>
                    <div className={styles.settings}>
                    <div className={styles.heading_div}>
                    <FaArrowLeft className={styles.icon}
                    onClick={() => router.push('/profile-screen')}
                    />
                    <h1 className={styles.heading}>Settings</h1>
                    </div>
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
