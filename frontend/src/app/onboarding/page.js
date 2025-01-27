"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from "./Style.module.css"
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'

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
  const ref = useRef(null);
  const router = useRouter();

  const isInView = useInView(ref);

  useEffect(() => {
    console.log("useEffect called", isInView);
    
  }, [isInView]);


  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      // setCurrentSlide(0);
      router.push('/signup')
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  }
  return (
    <>
      <section className={styles.section}
      >
          <div className={styles.sub_section}>
            <motion.div 
            className={styles.image_section}
            initial={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            key={currentSlide}
            exit={{ opacity: 0, translateX: 100 }}
            transition={{ duration: 0.5 }}
            >
              <img src={slides[currentSlide].Image} alt={slides[currentSlide].title} />
            </motion.div>
            <AnimatePresence mode='wait'>
            <motion.div 
            className={styles.text_section}>
              <div  className={styles.heading_section}>
              <motion.div className={styles.heading}
              initial={{ opacity: 0, translateX: 100 }}
              animate={{ opacity: 1, translateX: 0 }}
              key={currentSlide}
              exit={{ opacity: 0, translateX: 100 }}
              transition={{ duration: 0.5 }}
              >
              <h1  className={styles.heading_1}>{slides[currentSlide].title}</h1>
              <motion.p className='paragraph_large_medium' >{slides[currentSlide].discription}</motion.p>
              </motion.div>

              <div className={styles.input_section}>
                    {/* // radio */}
                <div className={styles.radio_section}>
                  {slides.map((slide, index) => (
                    <p key={index} className={`${styles.radio} ${index === currentSlide ? styles.radio_active : ""}`}></p>
                  ))}
                </div>
                    {/* // button */}
                <motion.button className={styles.button} 
                onClick={nextSlide}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                key={currentSlide}
                exit={{ opacity: 0}}
                transition={{ duration: 0.5 }}
                >{currentSlide === slides.length - 1 ? "Get Started" : "Continue"}</motion.button>
              </div>
            </div>
            </motion.div>
            </AnimatePresence>
          </div>
      </section>
    </>
  )
}

export default SecondPage