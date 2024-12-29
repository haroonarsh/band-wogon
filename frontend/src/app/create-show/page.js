"use client"

import React, { useState } from 'react'
import styles from './create-show.module.css'
import Header from '@/components/header/Header'
import { BiEditAlt } from "react-icons/bi";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Google_map from '@/components/google_map/GoogleMap';
import { useRouter } from 'next/navigation';

function Page() {

    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();

    const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
    return (
        <>
                   {/* Header */}
            <Header />

                    {/* Main */}    
            <div className={styles.main}>
                <div className={styles.blank}><div></div></div>
                <div className={styles.main_content}>
                    <h1 className={styles.heading}>Create shows</h1>
                    <div className={styles.artist}>
                        <div className={styles.uploader}>
                            <label htmlFor="file-input" className={styles.uploadBox}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="" />
                                ) : (
                                    <div className={styles.placeholder}>
                                        <BiEditAlt className={styles.icon} />
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
                            <h2>Andy Warhol</h2>
                            <hr/>
                        </div>
                        <div className={styles.artist_bio}>
                            <p>Bio</p>
                            <h3>It is a long established fact that a reader will be distracted by the eadable content of a page when looking at its layout.</h3>
                            <hr/>
                        </div>
                        <div className={styles.location}>
                            <p>Location</p>
                            <h2>California, 23453</h2>
                            <hr/>
                        </div>
                        <div className={styles.map}>
                            <Google_map />
                        </div>
                        <button className={styles.button}
                        onClick={() => router.push('/home')}
                        >Create show</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
