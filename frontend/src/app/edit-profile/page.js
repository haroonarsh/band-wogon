"use client"

import Header from '@/components/header/Header'
import React, { useEffect, useState } from 'react'
import styles from './edit-profile.module.css'
import Sidebar from '@/components/sidebar/Sidebar'
import { BiEditAlt } from "react-icons/bi";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

function Page() {

    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        const googleUser = localStorage.getItem('user');
        if (storedUser || googleUser) {
            setUser(JSON.parse(storedUser) || JSON.parse(googleUser));
            // setUser(JSON.parse(storedUser));
        }
    }, []);

    const storedUser = localStorage.getItem('userData');
    const googleUser = localStorage.getItem('user');

    const [form, setForm] = useState({
        username: "",
        email: "",
        profileImage: "",
    })

    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, profileImage: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem("userData");
        const token = localStorage.getItem('UserAccessToken');

        if (!token) {
            toast.error("You are not logged in");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', form.username);
            formData.append('email', form.email);

            if (form.profileImage) {
                formData.append('profileImage', form.profileImage);
                console.log("Profile image:", form.profileImage);
            } else {
                console.log("No profile image selected");
            }

            const response = await axios.put('http://localhost:8000/api/user/edit-profile', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                toast.success(response.data.message);
                const updatedUser = response.data.data.user;
                const accessToken = response.data.data.accessToken; // Access token
                localStorage.setItem('userData', JSON.stringify(updatedUser));
                localStorage.setItem('UserAccessToken', accessToken);
                
                router.push('/home');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.log("Error:", error.response?.data || error.message);
        }
    }

                // Google update

    const handleGoogleSubmit = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem("userData");
        const token = localStorage.getItem('accessToken');

        if (!token) {
            toast.error("You are not logged in");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('username', form.username);
            formData.append('email', form.email);
            if (form.profileImage) {
                formData.append('profileImage', form.profileImage);
            } else {
                console.log("No profile image selected");
            }
            const response = axios.put('http://localhost:8000/update-profile', formData , {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);

            if (response.status === 200) {
                toast.success(response.data.message);
                console.log("response", response);
                
                const updatedUser = response.data.user.user;
                const accessToken = response.data.accessToken; // Access token
                localStorage.setItem('user', JSON.stringify(updatedUser));
                localStorage.setItem('accessToken', accessToken);
            }
            router.push('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.log("Error:", error.response?.data || error.message);
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
                <div className={styles.blank}><div></div></div>
                <div className={styles.main_content}>
                    <div className={styles.heading_div}>
                    <FaArrowLeft className={styles.icon}
                    onClick={() => router.push('/profile-screen')}
                    />
                    <h1 className={styles.heading}>Edit profile</h1>
                    </div>
                <div className={styles.profile}>
                    <form onSubmit={(e) => {
                        if (storedUser === null || storedUser === "undefined") {
                            handleGoogleSubmit(e);
                        } else {
                            handleSubmit(e);
                        }
                    }} encType='multipart/form-data' className={styles.profile_info}>
                        <div className='relative'>
                        <img src={ previewImage || user?.profileImage } alt="profile preview" />
                        <label htmlFor="fileInput" className={styles.edit}>
                        <BiEditAlt  />
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            name='profileImage' 
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        </div>
                        <h1 className={styles.name}>{ form.username || user?.username || "User Name"}</h1>

                        <div className={styles.username}>
                            <p>Name</p>
                            <input 
                            type="text"
                            // name='username'
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            placeholder='Enter your name' 
                            required
                            />  
                        </div>
                        <div className={styles.username}>
                            <p>Email</p>
                            <input 
                            type="email" 
                            // name='email'
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder='Enter your email'
                            required 
                            />
                        </div>
                        {/* <div className={styles.username}>
                            <p>Location</p>
                            <input type="text" placeholder='New York, 20002' />
                        </div> */}
                        <button type='submit' className={styles.button}>
                            {/* {loading ? "Saving..." : "Save"} */}
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Page
