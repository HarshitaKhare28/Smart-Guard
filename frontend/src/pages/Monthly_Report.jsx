import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTaZbS-O22qAdOsj21aaDNW87M5t_JDb8",
  authDomain: "live-location-tracking-ab4c4.firebaseapp.com",
  projectId: "live-location-tracking-ab4c4",
  storageBucket: "live-location-tracking-ab4c4.appspot.com",
  messagingSenderId: "765320667689",
  appId: "1:765320667689:web:6771970afc3e1157a73238",
  measurementId: "G-LSVHWXB5NC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Helper function to calculate the distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

export const Monthly_Report = () => {
  const [guardDistances, setGuardDistances] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const guardIds = ["object1", "object2", "object3", "object4", "object5"];
    const distances = {};
    let completedListeners = 0;

    const unsubscribeListeners = guardIds.map((guardId) => {
      const dbRef = ref(database, `gpsData/${guardId}`);
      console.log(`Setting up listener for ${guardId}`);

      return onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(`Data fetched for ${guardId}:`, data);
          const points = Object.values(data);
          console.log(`Points for ${guardId}:`, points);

          let distance = 0;

          for (let i = 0; i < points.length - 1; i++) {
            const { latitude: lat1, longitude: lon1 } = points[i];
            const { latitude: lat2, longitude: lon2 } = points[i + 1];
            distance += calculateDistance(lat1, lon1, lat2, lon2);
          }

          distances[guardId] = distance.toFixed(2);
          console.log(`Total distance for ${guardId}: ${distances[guardId]} km`);
        } else {
          console.log(`No data available for ${guardId}`);
          distances[guardId] = 0;
        }

        completedListeners++;
        if (completedListeners === guardIds.length) {
          setGuardDistances(distances);
          setLoading(false);
        }
      });
    });

    return () => {
      unsubscribeListeners.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-[#1A1B1C] text-white">
      <aside className="w-[290px] bg-[#2c2c2c] flex flex-col items-center py-6 border-r border-gray-700">
        <div className="w-[250px] bg-[#3C4350] p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 font-serif">Monthly Reports</h2>
        </div>
      </aside>

      <main className="flex-grow p-10">
        {/* Monthly Report Section */}
        <div className="bg-[#18191B] border border-white p-6 rounded-lg mt-6">
          <h2 className="text-3xl font-bold text-center">Distance Travelled by Guards</h2>
          {loading ? (
            <p className="text-lg text-red-600 text-center mt-4">Loading distances...</p>
          ) : (
            <div className="mt-4">
              {Object.entries(guardDistances).map(([guardId, distance]) => (
                <p key={guardId} className="text-lg text-blue-600 text-center mt-2">
                  The total distance travelled by {guardId} is:{" "}
                  <strong>{distance} km</strong>
                </p>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
