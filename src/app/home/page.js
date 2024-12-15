"use client"

import Google_map from '@/components/google_map/Google_map'
import Header from '@/components/header/Header'
import Navbar from '@/components/navbar/Navbar'
import Show_results from '@/components/show_results/Show_results'
import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'
import styles from './home.module.css'

function Page() {
    return (
        <> 
            <div className={styles.page}>
                    {/* Header */}
            <Header />

                    {/* Main */}
            <Google_map />
                
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