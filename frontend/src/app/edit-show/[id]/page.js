"use client"

import React, { useRef, useState } from 'react'
import styles from './edit-show.module.css'
import Header from '@/components/header/Header'
import { BiEditAlt } from "react-icons/bi";
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import GoogleMaps from '@/components/google_map/GoogleMap';

function Page() {

    const [form, setForm] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        bio: '',
        genres: [],
        latitude: '',
        longitude: '',
        image: null
    });
    
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();
    const autoCompleteRef = useRef(null);
    const { id } = useParams();

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
        const userDataToken = localStorage.getItem('UserAccessToken');
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('date', form.date);
            formData.append('startTime', form.startTime);
            formData.append('endTime', form.endTime);
            formData.append('location', form.location);
            formData.append('bio', form.bio);
            formData.append('latitude', form.latitude);
            formData.append('longitude', form.longitude);
            form.genres.forEach(genre => {
                formData.append('genres', genre);
                });
            if(form.image) formData.append('image', form.image);

            // const token = localStorage.getItem('UserAccessToken') || localStorage.getItem('accessToken');
            
            const response = await axios.put(`http://localhost:8000/api/user/edit-show/${id}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            console.log("response", response);
            
            if (userDataToken === null || userDataToken === "undefined") {
                toast.success('Show updated successfully!');
                router.push('/login');
            } else {
                toast.success('Show updated successfully!');
                router.push('/upcoming-schedules');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update show');
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
                        <div className={styles.time}>
                            <div className={styles.time_div}>
                            <div>
                            <p>Start Time</p>
                            <input 
                            type="time"
                            name='startTime'
                            value={form.startTime}
                            onChange={handleChange}
                            />
                            </div>
                            <div>
                            <p>End Time</p>
                            <input 
                            type="time"
                            name='endTime'
                            value={form.endTime}
                            onChange={handleChange}
                            />
                            </div>
                            </div>
                            <hr/>
                        </div>
                        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={["places"]}>

                        
                        <div className={styles.location}>
                            <p>Location</p>
                            <Autocomplete
                             onLoad={autocomplete => {
                                autoCompleteRef.current = autocomplete;
                                autocomplete.setComponentRestrictions({ country: "pk"});
                             }}
                             onPlaceChanged={handlePlaceSelect}
                            >
                            <input 
                            type="text"
                            name='location'
                            value={form.location}
                            onChange={handleChange}
                            placeholder='Search locations in Pakistan...'
                            />
                            </Autocomplete>
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
                        </LoadScript>
                        <div className={styles.map}>
                        <GoogleMaps 
                                    selectedLocation={
                                        form.latitude && form.longitude 
                                            ? { lat: parseFloat(form.latitude), lng: parseFloat(form.longitude) }
                                            : null
                                    }
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
