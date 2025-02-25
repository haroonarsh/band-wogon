"use client"

import React, { useEffect, useState } from 'react'
import styles from './artist_profile.module.css'
import { MdOutlineLocationOn } from "react-icons/md";
import { GiMusicSpell } from "react-icons/gi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { FaSpotify } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import { FaSoundcloud } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaVimeoV } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useParams, useRouter } from 'next/navigation';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import axios from 'axios';

function Artist_profile() {

  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

          // Fetch artist data
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/get-artist/:?id=${id}`);
        
        if (response.data.data) {
          setArtist(response.data.data);
        }
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    }

    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      /* From Uiverse.io by devAaus */ 
      <div className="flex items-center justify-center h-screen bg-zinc-900">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
              <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
            </div>
          </div>
          </div>
    );
  }

          // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }
  return (
    <>
      <div className={styles.artist_profile}>
        <div className={styles.blank}><div></div></div>
        <div className={styles.artist}>
          <div className={styles.header}>
        <MdOutlineKeyboardArrowLeft className={styles.icon3} onClick={() => router.push('/home')} />
          <h1 className='heading_3_medium'>{artist?.artistName || 'andwarhool234'}</h1>
          </div>
          <div className={styles.artist_details}>
            <img src={artist?.artistImage || "./images/Image(1).png"} alt="" className={styles.artist_image} />
            <div className={styles.artist_info}>
              <div className={styles.artist_name}>
                <h2 className='heading_6_medium'>{artist?.artistName || 'andwarhool234'}</h2>
                <button>Favorite</button>
                <button>Hide artist</button>
              </div>
              <div className={styles.artist_bio}>
                <p className={`neutral5 ${styles.lives}`}><span className='neutral3'>{artist?.showPerformed || '10'}+</span> Lives shows</p>
                <p className='neutral5'><span className='neutral3'>15</span> Years performing</p>
              </div>
              <h2 className={`heading_6_medium ${styles.artist_name2}`}>{artist?.artistName || 'Andy Warhool'} <img src="./icons/viral.png" alt="" /></h2>
              <p className={styles.location}><MdOutlineLocationOn /> {artist?.location || 'New York'}</p>
              <p className={styles.location}><GiMusicSpell /> {artist?.genres && ((artist?.genres).join(', ') ) || 'Rock, Pop, Jazz'}</p>
              <p className={styles.bio}>{artist?.bio || 'It is a long established fact that a reader will be distracted by the eadable content of a page when looking at its layout.'}</p>

              <div className={styles.artist_shows}>
                <p className={styles.next_shows}>Next Shows</p>
                <div className={styles.show_details}>
                  <p><MdOutlineCalendarMonth size={20} /> 29, Oct</p>
                  <p><MdOutlineLocationOn size={20} /> New York</p>
                </div>
                <div className={styles.show_details}>
                  <p><FaRegClock size={20} /> 9-11 PM</p>
                  <p><BiDollarCircle size={20} /> No cover</p>
                  </div>
                <div className={styles.buttons}>
                  <button className={styles.button}>View details</button>
                  <button className={styles.button_2}
                  onClick={handleCheckboxChange}
                  >Check in Live</button>
                </div>
              </div>
              <div className={styles.social_media}>
                <p>Social media</p>
                <div className={styles.social_media_icons}>
                  <span><FaSpotify /></span>
                  <span><GrYoutube /></span>
                  <span><FaSoundcloud /></span>
                  <span><FaFacebook /></span>
                  <span><FaXTwitter /></span>
                </div>
              </div>
              <div className={styles.social_media}>
                <p>Payment accounts</p>
                <div className={styles.social_media_icons}>
                  <span><RiMoneyDollarBoxFill /></span>
                  <span><FaVimeoV /></span>
                </div>
              </div>
              <button className={styles.button_3}
              onClick={() => router.push(`/upcoming/${artist?.userId}`)}
              >View upcoming & past shows</button>
            </div>
          </div>
        </div>
      </div>

                  {/* // Checked in Live */}

      {isChecked && (
        <div className={styles.checked_in_live}>
        <div className={styles.checked_in_live_container}>
          <div className={styles.icon}>         
            <RxCross2 cursor={"pointer"} 
            onClick={handleCheckboxChange}
            />
          </div>
          <div className={styles.icon2}>
          <FaRegCheckCircle />
          </div>
        <h1 className='heading_3_extraBold' style={{color: "#04bd46", display: "flex", alignItems: "center", justifyContent: "center"}}>You're checked in</h1>
        <p className={styles.thanks}>Thanks for supporting your local artist!</p>
        <div className={styles.show}>
          <img src="/images/club.png" alt="" />
          <p>SAT 19 JUNE</p>
          <h2>Night Dance Competition</h2>
        </div>
        </div>
      </div>
      )}
    </>
  )
}

export default Artist_profile