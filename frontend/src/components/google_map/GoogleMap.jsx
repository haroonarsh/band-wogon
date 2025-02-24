"use client";
import React, { useEffect, useRef, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { darkThemeStyles } from '../../mapTheme/mapTheme.js';
import styles from './google_map.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation.js';

// Custom marker SVG in data URL format 
const markerIcon = (image, isHovered) => `data:image/svg+xml;utf-8,${encodeURIComponent(`
  <svg width="40" height="42" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0C8.954 0 0 8.954 0 20C0 35 20 52 20 52C20 52 40 35 40 20C40 8.954 31.046 0 20 0Z" 
          fill="${isHovered ? '#1ed760' : '#04bd46'}"/>
    <path d="M20 25C23.3137 25 26 22.3137 26 19C26 15.6863 23.3137 13 20 13C16.6863 13 14 15.6863 14 19C14 22.3137 16.6863 25 20 25Z" 
          fill="white"/>
    <path d="M20 28C13.3726 28 8 23.0751 8 17C8 10.9249 13.3726 6 20 6C26.6274 6 32 10.9249 32 17C32 23.0751 26.6274 28 20 28Z" 
          fill="white" fill-opacity="0.2"/>
  </svg>
`)}`;

const containerStyle = {
    width: '100%',
    minHeight: '90.9vh',
  };
  
const center = {
  lat: 33.693661514230975, // Example: Latitude of San Francisco
  lng: 73.03031502875508, // Example: Longitude of San Francisco
};

const userLocationIcon = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" fill="#4285F4" fill-opacity="0.2"/>
    <circle cx="12" cy="12" r="5" fill="#4285F4" fill-opacity="0.2"/>
    <circle cx="12" cy="12" r="2" fill="#4285F4"/>
    <circle cx="12" cy="12" r="1.5" fill="white"/>
    <circle cx="12" cy="12" r="9" stroke="#4285F4" stroke-width="1" fill="none"/>
  </svg>
`)}`;
function GoogleMaps({ selectedLocation }) {


  const [mapCenter, setMapCenter] = useState(center);
  const [shows, setShows] = useState([]);
  const [hoveredShow, setHoveredShow] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const libraries = ["places"];
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const watchIdRef = useRef(null);
  const mapInstanceRef = useRef(null);
  

  // console.log("shows", shows);
  // console.log("Artist Profile", shows[6]?.artist?.profile);
  
  // Geolocation cleanup
  const stopLocationTracking = () => {
    if (watchIdRef.current && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
  };

  // // Map instance cleanup
  const clearMapInstance = () => {
    if (mapInstanceRef.current) {
      google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      mapInstanceRef.current = null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Fetch shows
    const fetchShows = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/users-with-shows');
        const allShows = response.data.data.flatMap(user => 
          user.shows.map(show => ({
            ...show,
            artist: {
              _id: user._id,
              name: user.username,
              profileImage: user.profileImage,
              profile: user.artistProfile[0] // Take first artist profile
            }
          }))
        ).filter(show => show.latitude && show.longitude && show.image);

        setShows(allShows);
        getUserLocation();
        // Set map center to first show's location or default
        if (allShows.length > 0) {
          setMapCenter({
            lat: allShows[0].latitude,
            lng: allShows[0].longitude,
          });
        }
      } catch (error) {
        console.error('Error fetching shows:', error);
      } finally {
        setLoading(false);
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (!mapInstanceRef.current) {
          fetchShows();
          getUserLocation();
        }
      }
      else {
        stopLocationTracking();
        clearMapInstance();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // initial setup
    fetchShows();

    return () => {
      isMounted = false;
      stopLocationTracking();
      clearMapInstance();
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Additional cleanup for mapRef
    if (mapRef.current) {
      mapRef.current = null;
    }
    }
  }, []);

  // Get user's current location
  const getUserLocation = () => {
    stopLocationTracking();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        setUserLocation(newPos);
        setMapCenter(newPos);
      },
      (error) => {
        console.error('Error getting user location:', error);
        stopLocationTracking();
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  };

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
    )
    
  }

  const handleArtistClick = (artistId) => {
    router.push(`/artist_profile/${artistId}`);
  }
  
    return (
        <>
        <section className={styles.googleMap}>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        // className={`${pathname === '/home' || pathname === 'create-show' ? }`}
        // stopLocationTracking={stopLocationTracking}
        >
         <GoogleMap
         mapContainerStyle={containerStyle}
         center={mapCenter}
         zoom={selectedLocation ? 10 : 6}
         options={{ styles: darkThemeStyles
         }}
        //  onUnmount={() => {
        //   clearMapInstance();
        //   stopLocationTracking();
        //  }}
         >
          {/* User Location */}
          {userLocation && (
            <Marker
            position={userLocation}
            icon={{
              url: userLocationIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            zIndex={999}
            />
          )}

          {/* Show Marker */}
          {shows.map((show) => (
            <Marker
              key={show._id}
              position={{ lat: show.latitude, lng: show.longitude }}
              icon={{
                url:`${markerIcon(show.image, hoveredShow?._id === show._id)}`,
                  // scaledSize: new window.google.maps.Size(40, 40),
                  
              }}
              onClick={() => setHoveredShow(show)}
            >
              {hoveredShow?._id === show._id && (
                <InfoWindow
                position={{ lat: show.latitude, lng: show.longitude }}
                options={{
                  boxStyle: {
                    maxWidth: "200px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    curser: "pointer"
                  }
                }}
                >
                  <div className={styles.tooltip}>
                  <div className={styles.artistInfo} onClick={() => handleArtistClick()}>
                    <img 
                      src={show.image || show.artist.profileImage} 
                      alt={show.artist.name}
                      className={styles.tooltipImage}
                    />
                  </div>
                    <div className={styles.tooltipContent}>
                      <h3>{show.name}</h3>
                      <div className={styles.meta}>
                        <span className={styles.date}>
                          {new Date(show.date).toLocaleDateString()}
                        </span>
                        <span className={styles.location}>
                          {show.location.split(',')[0]}
                        </span>
                      </div>
                      <div onClick={() => handleArtistClick(show.artist.profile._id)} className={styles.viewProfile}>
                        View Artist Profile →
                      </div>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
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
