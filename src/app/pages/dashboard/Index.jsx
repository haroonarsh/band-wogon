"use client"
import React from 'react'
import styles from './index.module.css'
import Navbar from '../../../components/navbar/Navbar.jsx';
import Header from '../../../components/header/Header.jsx';
import Sidebar from '../../../components/sidebar/Sidebar.jsx';
import Google_map from '../../../components/google_map/Google_map.jsx';
import Show_results from '../../../components/show_results/Show_results.jsx';


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
      <Google_map />          


              {/* // Show_results */}

      <Show_results />
      
      </container>
    </>
  )
}

export default Index