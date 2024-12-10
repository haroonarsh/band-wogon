import React from 'react'
import styles from './show_results.module.css'
import { RiSendPlaneLine } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiMusicSpell } from "react-icons/gi";

function Show_results() {
    return (
        <>
            <div className={styles.show_results}>
                <div>
                    <RiSendPlaneLine color='#04bd46' size={20} />
                </div>
                <div>
                    <p>4 Results</p>
                </div>
                <div>
                    <MdKeyboardArrowLeft color='#04bd46' size={20} />
                    <div>
                        <img src="./images/Image(1).png" alt="" />
                        <div>
                            <h2></h2>
                            <p><MdOutlineLocationOn color='#04bd46' size={20} /> New York City</p>
                            <p><MdOutlineCalendarMonth color='#04bd46' size={20} /> 29 Oct, Thu 8-10 PM</p>
                            <p><GiMusicSpell color='#04bd46' size={20} /> Pop, Rock, Blues</p>
                        </div>
                    </div>
                    <div>
                        <img src="./images/Image(2).png" alt="" />
                        <div>
                            <h2></h2>
                            <p><MdOutlineLocationOn color='#04bd46' size={20} /> New York City</p>
                            <p><MdOutlineCalendarMonth color='#04bd46' size={20} /> 29 Oct, Thu 8-10 PM</p>
                            <p><GiMusicSpell color='#04bd46' size={20} /> Pop, Rock, Blues</p>
                        </div>
                    </div>
                    <div>
                        <img src="./images/Image(3).png" alt="" />
                        <div>
                            <h2></h2>
                            <p><MdOutlineLocationOn color='#04bd46' size={20} /> New York City</p>
                            <p><MdOutlineCalendarMonth color='#04bd46' size={20} /> 29 Oct, Thu 8-10 PM</p>
                            <p><GiMusicSpell color='#04bd46' size={20} /> Pop, Rock, Blues</p>
                        </div>
                    </div>
                    <MdKeyboardArrowRight color='#04bd46' size={20} />
                </div>
            </div>
        </>
    )
}

export default Show_results
