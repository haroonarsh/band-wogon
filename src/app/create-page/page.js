"use client"

import React, { useState } from 'react'
import styles from './create-page.module.css'
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


function Page() {

    const [createPage, setCreatePage] = useState(false)

    const handleCreatePage = () => {
        setCreatePage(!createPage)
    }

    return (
        <>
            {/* Header */}
            <Header />

            {/* Main */}
        <div className={styles.main}>
            <div className={styles.blank}><div></div></div>
            <div className={styles.main_content}>
                <h1 className={styles.heading}>Create page</h1>

                <div className={`${createPage ? styles.hide : ''}`}>
                    <div className={styles.content}>
                    <div className={styles.dots}>
                    <PiDotsThreeOutlineFill size={20} cursor={'pointer'}  />
                    </div>
                    <div className={styles.artist}>
                        <img src="./images/Image(1).png" alt="" />
                        <h2>BandWagon music</h2>
                    </div>
                    <div className={styles.buttons}>
                        <button>Edit profile</button>
                        <button>Show schedule</button>
                        <button>Past shows</button>
                    </div>
                </div>
                <button className={styles.button} onClick={handleCreatePage}><FaPlus /> Create page</button>
                </div>

                        {/* // create page */}

                {createPage && (
                    <div className={styles.create_page}>
                    <div  className='relative'>   
                        <img src="./images/frame.png" alt="" /> 
                        <BiEditAlt className={styles.edit} />
                    </div>
                    <div className={styles.inputs}>
                        <input type="text" placeholder='Artist name' />
                        <input type="text" placeholder='Location' />
                        <input type="text" placeholder='Bio' />
                    </div>

                    <h1>When did you start performing</h1>

                    <div className={styles.dates}>
                        <h2 className='paragraph_small_medium'>Start date</h2>
                        <div className={styles.date}>
                            <input type="month" placeholder='Septamber '/>
                            <input type="month" placeholder='2023 '/>
                        </div>
                    </div>

                    <h1>How many shows have you performed</h1>
                    <div className={styles.inputs}>
                        <input type="tel" placeholder='Select shows' />
                    </div>

                    <h1 className={styles.genre}>Genre</h1>
                    <p className='paragraph_medium_medium'>Select all that apply</p>

                    <div className={styles.genres}>
                        <button>Blues</button>                        
                        <button>Classical</button>                        
                        <button>Country</button>                        
                        <button>EDM</button>                        
                        <button>Falk</button>                        
                        <button>Funk</button>                        
                        <button>Hip-Hop</button>                        
                        <button>Jazz</button>                        
                        <button>Latin</button>                        
                        <button>Metal</button>                        
                        <button>Pop</button>                        
                        <button>Punk</button>                        
                        <button>Reggae</button>                        
                        <button>R&B</button>                        
                        <button>Rock</button>                        
                        <button>Soul</button>                        
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
                        <img src="./images/Image(1).png" alt="" />
                        <div className={styles.admin_info}>
                            <h2>Andy Warhool <img src="./icons/viral.png" alt="" /></h2>
                            <p className='paragraph_small_regular'>andywarhool234</p>
                        </div>
                        <button className={styles.butto}>Approve</button>
                    </div>

                    <button className={styles.button_2}><FaPlus />Add users</button>

                    <button className={styles.button_3} onClick={handleCreatePage}>Done</button>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default Page
