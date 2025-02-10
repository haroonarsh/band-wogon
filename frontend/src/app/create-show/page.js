"use client"

import React, { useState } from 'react'
import styles from './create-show.module.css'
import Header from '@/components/header/Header'
import { BiEditAlt } from "react-icons/bi";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Google_map from '@/components/google_map/GoogleMap';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

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
    const genresList = ['Blues', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 
                      'Hip-Hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 
                      'Reggae', 'R&B', 'Rock', 'Soul'];

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

    const handleGenreToggle = (genre) => {
        setForm(prev => ({
            ...prev,
            genres: prev.genres.includes(genre)
                ? prev.genres.filter(g => g !== genre)
                : [...prev.genres, genre]
        }));
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('date', form.date);
            formData.append('time', form.time);
            formData.append('location', form.location);
            formData.append('bio', form.bio);
            formData.append('latitude', form.latitude);
            formData.append('longitude', form.longitude);
            form.genres.forEach(genre => formData.append('genres', genre));
            if(form.image) formData.append('image', form.image);

            const token = localStorage.getItem('UserAccessToken') || localStorage.getItem('accessToken');
            
            const response = await axios.post('/api/user/create-show', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if(response.data.success) {
                toast.success('Show created successfully!');
                router.push('/home');
            }
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
                    <form className={styles.artist}>
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
                            <input type="text" placeholder='Andy Warhol' />
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
                                onClick={() => handleGenreToggle(genre)}
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
                        <button className={styles.button}
                        // onClick={() => router.push('/home')}
                        >Create show</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Page
