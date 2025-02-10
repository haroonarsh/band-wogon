"use client"

import React, { useState } from 'react'
import styles from './create-show.module.css'
import Header from '@/components/header/Header'
import { BiEditAlt } from "react-icons/bi";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Google_map from '@/components/google_map/GoogleMap';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

function Page() {

    const [form, setForm] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        bio: '',
        genres: [],
        latitude: '',
        longitude: '',
        image: null
    });
    
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                setForm(prev => ({...prev, image: file}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

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
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
        const userDataToken = localStorage.getItem('UserAccessToken');
        // const googleUserToken = localStorage.getItem('accessToken');
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('date', form.date);
            formData.append('time', form.time);
            formData.append('location', form.location);
            formData.append('bio', form.bio);
            formData.append('latitude', form.latitude);
            formData.append('longitude', form.longitude);
            form.genres.forEach(genre => {
                formData.append('genres', genre);
                });
            if(form.image) formData.append('image', form.image);

            const token = localStorage.getItem('UserAccessToken') || localStorage.getItem('accessToken');
            
            const response = await axios.post('http://localhost:8000/api/user/create-show', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("response", response);
            
            if (userDataToken === null || userDataToken === "undefined") {
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                toast.success('Show created successfully!');
                router.push('/login');
            } else {
                localStorage.setItem('userData', JSON.stringify(response.data.data.user));
                toast.success('Show created successfully!');
                router.push('/home');
            }
            // if(response.data.success) {
            //     console.log(response.data);
            //     toast.success('Show created successfully!');
            //     // router.push('/upcoming-schedules');
            //     // router.refresh();
            //     router.push('/home');
            // }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create show');
        }
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
                    <div className={styles.artist}>
                        <div className={styles.uploader}>
                            <label htmlFor="file-input" className={styles.uploadBox}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="" />
                                ) : (
                                    <div className={styles.placeholder}>
                                        <BiEditAlt className={styles.icon2} />
                                        {/* <p>Upload an image</p> */}
                                    </div>
                                )}
                            </label>

                            <input
                                type="file"
                                id="file-input"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className={styles.artist_info}>
                            <p>Name</p>
                            <input 
                            type="text" 
                            placeholder='Andy Warhol' 
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            />
                            <hr/>
                        </div>
                        <div className={styles.artist_info}>
                            <p>Date</p>
                            <input 
                            type="date"
                            name='date'
                            value={form.date}
                            onChange={handleChange}
                            />
                            <hr/>
                        </div>
                        <div className={styles.artist_info}>
                            <p>Time</p>
                            <input 
                            type="time"
                            name='time'
                            value={form.time}
                            onChange={handleChange}
                            />
                            <hr/>
                        </div>
                        <div className={styles.location}>
                            <p>Location</p>
                            <input 
                            type="text"
                            name='location'
                            value={form.location}
                            onChange={handleChange}
                            />
                            <hr/>
                        </div>
                        <div className={styles.artist_bio}>
                            <p>Latitude</p>
                            <input 
                            type="number"
                            step="any"
                            name='latitude'
                            value={form.latitude}
                            onChange={handleChange}
                            />
                            <hr/>
                        </div>
                        <div className={styles.artist_bio}>
                            <p>Longitude</p>
                            <input 
                            type="number"
                            step="any"
                            name='longitude'
                            value={form.longitude}
                            onChange={handleChange}
                            />
                            <hr/>
                        </div>
                        <div className={styles.artist_bio}>
                            <p>Bio</p>
                            <textarea
                            className={styles.textarea}
                            type="text" 
                            name='bio'
                            value={form.bio}
                            onChange={handleChange}
                            rows="4"
                            placeholder='It is a long established fact that a reader will be distracted by the eadable content of a page when looking at its layout.' 
                            />
                            <hr/>
                        </div>

                                    {/* genre */}
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
                        <div className={styles.map}>
                            <Google_map 
                                onLocationSelect={(lat, lng, address) => {
                                    setForm(prev => ({
                                        ...prev,
                                        latitude: lat,
                                        longitude: lng,
                                        location: address
                                    }));
                                }}
                            />
                        </div>
                        <button onClick={handleSubmit} className={styles.button}
                        // onClick={() => router.push('/home')}
                        >Create show</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
