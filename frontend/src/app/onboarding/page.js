"use client"

import React, { useState } from 'react'
import styles from "./Style.module.css"

const slides = [
  {
    title: "Find Bast Musicains All Around your City",
    discription: "It is a long established fact that a reader will be distracted by the readable.",
    Image: "/images/firstpage.png"
  },
  {
    title: "Listen to your fauvourite Artists",
    discription: "Discover and collaborate with musicians in your area.",
    Image: "/images/secondpage.png"
  },
  {
    title: "Enjoy your Musical Experience",
    discription: "Easily organize and manage your musical events and gigs.",
    Image: "/images/thirdpage.png"
  },
]

function SecondPage() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  }
  return (
    <>
      <section className={styles.section}>
          <div className={styles.sub_section}>
            <div className={styles.image_section}>
              <img src={slides[currentSlide].Image} alt={slides[currentSlide].title} />
            </div>
            <div className={styles.text_section}>
              <div className={styles.heading_section}>
              <h1 className='heading_1_Semibold'>{slides[currentSlide].title}</h1>
              <p className='paragraph_large_medium'>{slides[currentSlide].discription}</p>

              <div className={styles.input_section}>
                    {/* // radio */}
                <div className={styles.radio_section}>
                  {slides.map((slide, index) => (
                    <p key={index} className={`${styles.radio} ${index === currentSlide ? styles.radio_active : ""}`}></p>
                  ))}
                </div>
                    {/* // button */}
                <button className={styles.button} 
                onClick={nextSlide}
                >{currentSlide === slides.length - 1 ? "Get Started" : "Continue"}</button>
              </div>
            </div>
            </div>
          </div>
      </section>
    </>
  )
}

export default SecondPage