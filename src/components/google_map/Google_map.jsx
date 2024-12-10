import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { darkThemeStyles } from '../../mapTheme/mapTheme.js';
// import styles from './google_map.module.css'

const containerStyle = {
    width: '100%',
    height: '100vh'
  };
  
  const center = {
    lat: 33.693661514230975, // Example: Latitude of San Francisco
    lng: 73.03031502875508, // Example: Longitude of San Francisco
  };

function Google_map() {
    return (
        <>
        <section>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
         <GoogleMap
         mapContainerStyle={containerStyle}
         center={center}
         zoom={10}
         options={{ styles: darkThemeStyles
         }}
         >
          <Marker position={center} />
         </GoogleMap>
         </LoadScript>
      </section>
        </>
    )
}

export default Google_map
