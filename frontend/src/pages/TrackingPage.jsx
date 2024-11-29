import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig"; // Import the config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const TrackingPage = () => {
  const mapRef = useRef(null);
  const [positions, setPositions] = useState([]); // To store all guard positions
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0); // Track current position index
  const guardMarkerRef = useRef(null); // Ref to keep track of the single marker

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      const map = L.map("map").setView([21.15108, 79.14771], 20);
      mapRef.current = map;

      // Set up the tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      // Create a single marker for the guard's position
      guardMarkerRef.current = L.marker([21.15108, 79.14771]).addTo(map);

      // Set up Firebase real-time listener for location data
      const locationDataRef = ref(database, "locationData");

      // Real-time listener to get the location data
      onValue(locationDataRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Sort the positions based on the timestamp (from earliest to latest)
          const sortedPositions = Object.values(data).sort((a, b) => {
            const aDate = new Date(`${a.date} ${a.time}`);
            const bDate = new Date(`${b.date} ${b.time}`);
            return aDate - bDate;
          });

          setPositions(sortedPositions); // Store the sorted positions
        } else {
          console.log("No data available");
        }
      });

      return () => {
        map.remove();
        mapRef.current = null;
      };
    }
  }, []);

  // Function to update the marker position and animate movement
  useEffect(() => {
    if (positions.length > 0 && currentPositionIndex < positions.length - 1) {
      const currentPosition = positions[currentPositionIndex];
      const nextPosition = positions[currentPositionIndex + 1];

      const currentDate = new Date(`${currentPosition.date} ${currentPosition.time}`);
      const nextDate = new Date(`${nextPosition.date} ${nextPosition.time}`);

      // Calculate the time difference (in milliseconds)
      const timeDiff = nextDate - currentDate;

      // Update the position of the existing marker
      guardMarkerRef.current.setLatLng([currentPosition.latitude, currentPosition.longitude]);

      setTimeout(() => {
        guardMarkerRef.current.setLatLng([nextPosition.latitude, nextPosition.longitude]);
        setCurrentPositionIndex((prevIndex) => prevIndex + 1); // Move to next position
      }, timeDiff); // Delay based on time difference

    }
  }, [positions, currentPositionIndex]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-customGrey text-white p-2 ml-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Guard Details</h2>
        {positions.length > 0 ? (
          <div className="p-4 ml-9 font-semibold">
            <p className="mb-1">Name: Guard</p>
            <p className="mb-1">Last Recorded Position:</p>
            <p className="mb-1">Latitude: {positions[currentPositionIndex].latitude}</p>
            <p className="mb-1">Longitude: {positions[currentPositionIndex].longitude}</p>
            <p className="mb-1">Time: {positions[currentPositionIndex].time}</p>
            <p className="mb-1">Date: {positions[currentPositionIndex].date}</p>
          </div>
        ) : (
          <p>Loading guards position...</p>
        )}
      </div>

      {/* Map Section */}
      <div className="w-3/4">
        <div id="map" style={{ height: "100vh", width: "100%" }}></div>
      </div>
    </div>
  );
};
