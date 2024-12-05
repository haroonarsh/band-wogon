import React from 'react'
import styles from './firstpage.css'

function FirstPage() {
  return (
    <>
      <section className='section'>
          <div className='sub_section'>
            <div className='image_section'>
              <img src="./images/firstpage.png" alt="" />
            </div>
            <div className='text_section'>
              <div className='heading_section'>
              <h1 className='heading_1_Semibold'>Find Best Musicians All Around your City</h1>
              <p className='paragraph_large_medium'>It is a long estiblished fact that a reader will be distracted by the readable.</p>

              <div className='input_section'>
                    {/* // radio */}
                <div className='radio_section'>
                <p className='radio_active'></p>
                <p className='radio'></p>
                <p className='radio'></p>
                </div>
                    {/* // button */}
                <button className='button'>Continue</button>
              </div>
            </div>
            </div>
          </div>
      </section>
    </>
  )
}

export default FirstPage