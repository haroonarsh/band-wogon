import React from 'react'

function ThirdPage() {
  return (
    <>
      <section className='section'>
          <div className='sub_section'>
            <div className='image_section'>
              <img src="./images/thirdpage.png" alt="" />
            </div>
            <div className='text_section'>
              <div className='heading_section'>
              <h1 className='heading_1_Semibold'>Enjoy your favourite musics</h1>
              <p className='paragraph_large_medium'>It is a long estiblished fact that a reader will be distracted by the readable.</p>

              <div className='input_section'>
                    {/* // radio */}
                <div className='radio_section'>
                <p className='radio'></p>
                <p className='radio'></p>
                <p className='radio_active'></p>
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

export default ThirdPage