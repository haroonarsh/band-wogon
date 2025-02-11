"use client";
import React, { useRef, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { darkThemeStyles } from '../../mapTheme/mapTheme.js';
import styles from './google_map.module.css';

const containerStyle = {
    width: '100%',
    minHeight: '90.9vh',
  };
  
  const center = {
    lat: 33.693661514230975, // Example: Latitude of San Francisco
    lng: 73.03031502875508, // Example: Longitude of San Francisco
  };

function GoogleMaps({ selectedLocation }) {

  // const [mapCenter, setMapCenter] = useState(center);
  // const autoCompleteRef = useRef(null);
  const libraries = ["places"];

    return (
        <>
        <section className={styles.googleMap}>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        >
         <GoogleMap
         mapContainerStyle={containerStyle}
         center={selectedLocation || center}
         zoom={selectedLocation ? 15 : 10}
         options={{ styles: darkThemeStyles
         }}
         >
          {selectedLocation && (
            <Marker position={selectedLocation} />
          )}
         </GoogleMap>
         </LoadScript>
      </section>
        </>
    )
}

export default GoogleMaps
