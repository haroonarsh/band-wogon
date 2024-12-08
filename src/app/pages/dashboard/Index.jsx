"use client"
import React from 'react'
import styles from './index.module.css'
import { IoMdSearch } from "react-icons/io";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { darkThemeStyles } from '../../../mapTheme/mapTheme.js';
import Navbar from '../../../components/navbar/Navbar.jsx';
import Header from '../../../components/header/Header.jsx';
import Sidebar from '../../../components/sidebar/Sidebar.jsx';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 33.693661514230975, // Example: Latitude of San Francisco
  lng: 73.03031502875508, // Example: Longitude of San Francisco
};

// Dark mode styles
// const darkThemeStyles = [
//     { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
//     { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
//     { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
//     { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
//     { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
//     { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
//     { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
//     { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
//     { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
//     { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
//     { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
//     { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1b1b1b" }] },
//     { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
//     { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
//     { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#373737" }] },
//     { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] },
//     { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#4e4e4e" }] },
//     { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
//     { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
//     { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
//     { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#3d3d3d" }] }
// ];

function Index() {
  return (
    <>
      <container className={styles.container}>
            {/* // header */}
      <Header />

              {/* navbar */}
      <Navbar />

              {/* sidebar */}
      <Sidebar />

              {/* // main section */}
      <section className={styles.hero_section}>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
         <GoogleMap
         mapContainerStyle={containerStyle}
         center={center}
         zoom={10}
         options={{ styles: darkThemeStyles,
          disableDefaultUI: false
         }}
         >
          <Marker position={center} />
         </GoogleMap>
         </LoadScript>
      </section>
      </container>
    </>
  )
}

export default Index