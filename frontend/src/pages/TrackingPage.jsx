import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTaZbS-O22qAdOsj21aaDNW87M5t_JDb8",
  authDomain: "live-location-tracking-ab4c4.firebaseapp.com",
  databaseURL: "https://live-location-tracking-ab4c4-default-rtdb.firebaseio.com",
  projectId: "live-location-tracking-ab4c4",
  storageBucket: "live-location-tracking-ab4c4.firebasestorage.app",
  messagingSenderId: "765320667689",
  appId: "1:765320667689:web:6771970afc3e1157a73238",
  measurementId: "G-LSVHWXB5NC",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const guards = [
  { id: 1, name: "Jack", objectId: "object1", workingHours: "9 AM - 6 PM", allottedSlot: "A1" },
  { id: 2, name: "Tony", objectId: "object2", workingHours: "10 AM - 7 PM", allottedSlot: "B2" },
  { id: 3, name: "Mathew", objectId: "object3", workingHours: "8 AM - 5 PM", allottedSlot: "C3" },
  { id: 4, name: "Ronny", objectId: "object4", workingHours: "11 AM - 8 PM", allottedSlot: "D4" },
  { id: 5, name: "Louis", objectId: "object5", workingHours: "12 PM - 9 PM", allottedSlot: "E5" },
  { id: 6, name: "Ram", objectId: "object6", workingHours: "9 AM - 5 PM", allottedSlot: "F6" },
  { id: 7, name: "John", objectId: "object7", workingHours: "7 AM - 3 PM", allottedSlot: "G7" },
  { id: 8, name: "Samuel", objectId: "object8", workingHours: "6 PM - 2 AM", allottedSlot: "H8" },
];

export const TrackingPage = () => {
  const mapRef = useRef(null);
  const [selectedGuard, setSelectedGuard] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([21.17663489751668, 79.06155360403324], 20);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      const markers = {};
      guards.forEach((guard) => {
        markers[guard.objectId] = L.marker([21.17663489751668, 79.06155360403324])
          .addTo(map)
          .bindPopup(guard.name);
      });

      const currentIndex = {};
      guards.forEach((guard) => {
        currentIndex[guard.objectId] = 0;
      });

      const updateMarkers = (data) => {
        guards.forEach((guard) => {
          const positions = data[guard.objectId];
          if (positions && positions[currentIndex[guard.objectId]]) {
            const currentPosition = positions[currentIndex[guard.objectId]];
            if (currentPosition && currentPosition.latitude && currentPosition.longitude) {
              markers[guard.objectId]
                .setLatLng([currentPosition.latitude, currentPosition.longitude])
                .bindPopup(`${guard.name} - Position ${currentIndex[guard.objectId]}`);

              currentIndex[guard.objectId]++;
              if (currentIndex[guard.objectId] >= positions.length) {
                currentIndex[guard.objectId] = 0;
              }
            }
          }
        });
      };

      const fetchData = () => {
        const dbRef = ref(database, "gpsData");
        get(dbRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              updateMarkers(data);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      const interval = setInterval(fetchData, 1000);

      return () => {
        map.remove();
        mapRef.current = null;
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    if (selectedGuard && mapRef.current) {
      const { lat, lng } = selectedGuard.position || { lat: 21.17663489751668, lng: 79.06155360403324 };
      mapRef.current.setView([lat, lng], 16);
    }
  }, [selectedGuard]);

  const handleGuardClick = (guard) => {
    setSelectedGuard(guard);

    // Display alert with guard details
    alert(
      `Guard Details:\n\n` +
        `Name: ${guard.name}\n` +
        `Working Hours: ${guard.workingHours}\n` +
        `Allotted Slot: ${guard.allottedSlot}`
    );
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-customGrey text-white p-4">
        {guards.map((guard) => (
          <button
            key={guard.id}
            onClick={() => handleGuardClick(guard)}
            className={`flex items-center mb-2 p-3 rounded ${
              selectedGuard && selectedGuard.id === guard.id
                ? "bg-blue-600"
                : "bg-gray-700"
            } hover:bg-blue-600 w-full text-left`}
          >
            <img
              src="/images/person.png"
              alt="Person Icon"
              width="24"
              height="24"
              className="mr-2"
            />
            {guard.name}
          </button>
        ))}
      
         {/* Additional Text and User Info */}
         <div className="mt-4">
          <p className="text-sm mb-2">Help Us Build</p>
          <p className="text-sm mb-4">{"What's New"}</p>
          <div className="flex items-center">
            <img
              src="/images/person.png"
              alt="Person Icon"
              width="24"
              height="24"
              className="mr-2"
            />
            <div>
              <p className="text-sm">Sample Owner</p>
              <p className="text-sm">username@example.com</p>
            </div>
          </div>
          
        </div>
      </div>
      {/* Map Section */}
      <div className="w-3/4">
        <div id="map" style={{ height: "100vh", width: "100%" }}></div>
      </div>
    </div>
  );
};
