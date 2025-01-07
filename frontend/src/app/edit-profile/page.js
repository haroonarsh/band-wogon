"use client"

import Header from '@/components/header/Header'
import React, { useContext, useEffect, useState } from 'react'
import styles from './edit-profile.module.css'
import Sidebar from '@/components/sidebar/Sidebar'
import { BiEditAlt } from "react-icons/bi";
import axios from 'axios'
import { useRouter } from 'next/navigation'
// import { AuthContext } from '@/context/AuthContext'

function Page() {

    // const [user, setUser] = useState(null);
    // const { user, login } = useContext(AuthContext);
    const router = useRouter();
    const userData = JSON.parse(localStorage.getItem("user"));

    console.log("User data:", userData);
    const accessToken = localStorage.getItem("accessToken");
    console.log("Access token:", accessToken);
    
    

    const [form, setForm] = useState({
        username: userData?.username || "",
        email: userData?.email || "",
        profileImage: null,
    });

    const [previewImage, setPreviewImage] = useState(userData?.profileImage || null);

    useEffect(() => {
        if (!userData) {
            router.push("/profile-screen");
        }
    }, [ userData, router ]);
    const handleFileChange = (e) => {   
        const file = e.target.files[0];
        setForm({ ...form, profileImage: file });
        setPreviewImage(URL.createObjectURL(file));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("email", form.email);
        if (form.profileImage) {
            formData.append("profileImage", form.profileImage);
        }

        try {
            const { data } = await axios.patch("/api/user/edit-profile", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

                        // Store the user data and accessToken in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.accessToken);

            console.log("Profile updated successfully:", data);
            alert("Profile updated successfully!");
            router.push("/home");
        } catch (error) {
            console.error("Error updating profile:", error.message);
            alert("Failed to update profile!");
        }
    }

                // =============================

    // Fetch the current user data
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const storedUser = localStorage.getItem("user");
    //             setUser(JSON.parse(storedUser));
    //             if (!storedUser) {
    //                 alert("User not logged in!");
    //                 return;
    //             } else {
    //                 alert("User logged in:" + storedUser);
    //             }

    //             const res = await axios.get(`/api/user/profile?userId=${JSON.parse(storedUser)._id}`);
    //             alert("User data response:", res.data);
                
    //             const user = res.data.user;
    //             console.log("User data user:", user);
    //             console.log("User id:", user.userId);
                
                

    //             setFormData({
    //                 userId: user._id,
    //                 username: user.username,
    //                 email: user.email,
    //                 profileImage: null,
    //             });
    //             alert("User data:" + user.username);

    //             setPreviewImage(user.profileImage);
    //         } catch (error) {
    //             alert("Error fetching user data:" + error);
    //             console.error("Error fetching user data:", error);
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setFormData({ ...formData, profileImage: file });
    //     setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const form = new FormData();
    //         form.append("userId", formData.userId);
    //         form.append("username", formData.username);
    //         form.append("email", formData.email);
    //         if (formData.profileImage) {
    //             form.append("profileImage", formData.profileImage);
    //         }

    //         const res = await axios.post("/api/user/edit-profile", form, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });

    //         if (res.status === 200) {
    //             alert("Profile updated successfully!");
    //         }
    //     } catch (error) {
    //         console.error("Error updating profile:", error);
    //         alert("Failed to update profile!");
    //     }
    // };

    return (
        <>
                    {/* Header */}
            <Header />
                    {/* sidebar */}
            <Sidebar />

                    {/* main */}
            <div className={styles.main}>
                <div className={styles.blank}><div></div></div>
                <div className={styles.main_content}>
                    <h1 className={styles.heading}>Edit profile</h1>
                <div className={styles.profile}>
                    <form onSubmit={handleSubmit} encType='multipart/form-data' className={styles.profile_info}>
                        <div className='relative'>
                        <img src={ previewImage || user?.profileImage } alt="profile preview" />
                        <label className={styles.edit}>
                        <BiEditAlt  />
                        </label>
                        <input
                            type="file"
                            // id="fileInput"
                            // name='profileImage' 
                            accept="image/*"
                            onChange={handleFileChange}
                            // style={{ display: "none" }}
                        />
                        </div>
                        <h1 className={styles.name}>{ form.username || "User Name"}</h1>

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
