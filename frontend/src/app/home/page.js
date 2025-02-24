"use client"

import Header from '@/components/header/Header'
import Navbar from '@/components/navbar/Navbar'
import Show_results from '@/components/show_results/Show_results'
import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'
import styles from './home.module.css'
import GoogleMaps from '@/components/google_map/GoogleMap'

function Page() {
    return (
        <> 
            <div className={styles.page}>
                    {/* Header */}
                <Header />

                    {/* Main */}
                <GoogleMaps />
                
                    {/* Sidebar */}
                <Sidebar />

                    {/* Navbar */}
                <Navbar />

                    {/* show_results */}
                <Show_results />

            </div>

        </>
    )
}

export default Page