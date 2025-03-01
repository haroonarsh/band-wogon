"use client";

import React, { useState, useRef } from 'react'
import styles from './create-page2.module.css'
import Header from '@/components/header/Header'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineFacebook } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { GrSpotify } from "react-icons/gr";
import { FaSoundcloud } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { BiLogoVenmo } from "react-icons/bi";
import { SiCashapp } from "react-icons/si";
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { set } from 'mongoose';
import Sidebar from '@/components/sidebar/Sidebar';
import { Autocomplete, LoadScript } from '@react-google-maps/api';

function Page() {

    const [form, setForm] = useState({
        artistName: '',
        location: '',
        bio: '',
        startDate: '',
        showPerformed: '',
        genres: [],
        artistImage: null,
    });
    const router = useRouter()
    const [previewImage, setPreviewImage] = useState(null);
    const autoCompleteRef = useRef(null);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, artistImage: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const handlePlaceSelect = () => {
        if (!autoCompleteRef.current) {
            console.log("autoCompleteRef", autoCompleteRef.current);
            return;
        };
        const place = autoCompleteRef.current.getPlace();

        if (!place || !place.geometry) {
          console.log("place", place);
          return;
        }
        if (place.geometry) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address;

          setForm(prev => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            location: address
          }))
        }
      }

    const handleGenreSelection = (genre) => {
        setForm((prevState) => {
            const updatedGenres = prevState.genres.includes(genre)
            ? prevState.genres.filter((g) => g !== genre)
            : [...prevState.genres, genre];
            return { ...prevState, genres: updatedGenres };

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // localStorage.removeItem('user');
        // localStorage.removeItem('userData');
        const userDataToken = localStorage.getItem('UserAccessToken');
        const googleUserToken = localStorage.getItem('accessToken');
            try {   
                const formData = new FormData();
                formData.append('artistName', form.artistName);
                formData.append('location', form.location);
                formData.append('bio', form.bio);
                formData.append('startDate', form.startDate);
                formData.append('showPerformed', form.showPerformed);
      
                    // Append genres as individual entries
                form.genres.forEach(genre => {
                formData.append('genres', genre);
                });

                if (form.artistImage) {
                    formData.append('artistImage', form.artistImage);
                }
                const response = await axios.post('http://localhost:8000/api/user/create-artist-page', formData, {
                    headers: {
                        Authorization: `Bearer ${userDataToken === null || userDataToken === "undefined" 
                        ? googleUserToken 
                        : userDataToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                
                 if (response.success === true || response.status === 200 || response.data.success === true) {
                    toast.success(response.data.message);
                    router.push('/upcoming-schedules');

                 } else {
                    toast.error( response.data.message || "Something went wrong");
                 }
                 
            } catch (error) {
                toast.error(error.response.data.message);
            }
        
    }

    return (
        <>
                    {/* Header */}
                    <div className={styles.header}>
            <Header />
            </div>
                    {/* Sidebar */}
                    <div className={styles.sidebar}>
            <Sidebar />
            </div>

                    {/* Main */}
            <div className={styles.main}>
                <div className={styles.blank}><div></div></div>
                <div className={styles.main_content}>
                <div className={styles.heading_div}>
                    <FaArrowLeft className={styles.icon}
                    onClick={() => router.push('/create-page')}
                    />
                    <h1 className={styles.heading}>Create page</h1>
                    </div>
            <div className={styles.create_page}>
                    <div  className='relative'>   
                        <img className={styles.profile} src={previewImage || './images/frame2.png'} alt="profile preview" />
                        <label htmlFor="fileInput" className={styles.edit}>
                        <BiEditAlt  />
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            name='artistImage' 
                            accept="image/*"
                            // value={form.profileImage}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <LoadScript
                            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                            libraries={['places']}
                        >
                        {/* <Autocomplete
                             onLoad={autocomplete => {
                                autoCompleteRef.current = autocomplete;
                                autocomplete.setComponentRestrictions({ country: "pk"});
                             }}
                             onPlaceChanged={handlePlaceSelect}
                            > */}
                    <div className={styles.inputs}>
                        <input 
                        type="text" 
                        placeholder='Artist Name' 
                        name='artistName'
                        value={form.artistName}
                        onChange={handleChange}
                        />
                        {/* <div className={styles.autocomplete}> */}
                        {/* <LoadScript
                            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                            libraries={['places']}
                        > */}
                        <Autocomplete
                             onLoad={autocomplete => {
                                autoCompleteRef.current = autocomplete;
                                autocomplete.setComponentRestrictions({ country: "pk"});
                             }}
                             onPlaceChanged={handlePlaceSelect}
                             className={styles.autocomplete}
                            >
                            <input  
                            className={styles.location}
                            type="text"
                            name='location'
                            value={form.location}
                            onChange={handleChange}
                            placeholder='Search locations in Pakistan...'
                            />
                            </Autocomplete>
                        {/* </LoadScript> */}
                        {/* </div> */}
                        <input 
                        type="text" 
                        placeholder='Bio' 
                        name='bio'
                        value={form.bio}
                        onChange={handleChange}
                        />
                    </div>
                    {/* </Autocomplete> */}
                    </LoadScript>
                    <h1>When did you start performing</h1>

                    <div className={styles.dates}>
                        <h2 className='paragraph_small_medium'>Start date</h2>
                        <div className={styles.date}>
                            <input 
                            type='date' 
                            placeholder='2023'
                            name='startDate'
                            value={form.startDate}
                            onChange={handleChange}
                            />
                            {/* <input 
                            type="date" 
                            placeholder='2023'
                            name='startDate'
                            value={form.startDate}
                            onChange={handleChange}
                            /> */}
                        </div>
                    </div>

                    <h1>How many shows have you performed</h1>
                    <div className={styles.inputs}>
                        <input 
                        type="number" 
                        placeholder='Number of shows' 
                        name='showPerformed'
                        value={form.showPerformed}
                        onChange={handleChange}
                        />
                    </div>

                    <h1 className={styles.genre}>Genre</h1>
                    <p className='paragraph_medium_medium'>Select all that apply</p>

                    <div className={styles.genres}>
                        {['Blues', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 'Hip-Hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'Reggae', 'R&B', 'Rock', 'Soul'].map((genre) => (
                            <button
                            key={genre}
                            className={form.genres.includes(genre) ? styles.selected : styles.unselected}
                            onClick={() => handleGenreSelection(genre)}
                            >
                                {genre}
                            </button> 
                        ))}                        
                    </div>

                    <h1>Link Social accounts</h1>

                    <div className={styles.social}> <p><MdOutlineFacebook size={20} /> Facebook</p></div>
                    <div className={styles.social}> <p><FaXTwitter size={20} /> Twitter</p></div>
                    <div className={styles.social}> <p><GrSpotify size={20} /> Spotify</p></div>
                    <div className={styles.social}> <p><FaSoundcloud size={20} /> Sound cloud</p></div>
                    <div className={styles.social}> <p><FaYoutube size={20} /> Youtube</p></div>

                    <h1>Link Payment accounts</h1>

                    <div className={styles.social}> <p><BiLogoVenmo size={20} /> Venmo</p></div>
                    <div className={styles.social}> <p><SiCashapp size={20} /> Cashapp</p></div>

                    <h1>Admin accounts</h1>

                    <div className={styles.admin}>
                        <img className={styles.admin_image} src="./images/Image(1).png" alt=""  />
                        <div className={styles.admin_info}>
                            <h2>Andy Warhool <img src="./icons/viral.png" alt="" /></h2>
                            <p className='paragraph_small_regular'>andywarhool234</p>
                        </div>
                        <button className={styles.butto}>Approve</button>
                    </div>

                    <button className={styles.button_2}><FaPlus />Add users</button>

                    <button onClick={handleSubmit} className={styles.button_3}>Done</button>
                    </div>
            
                </div>
                </div>
        </>
    )
}

export default Page