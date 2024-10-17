import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Optional if you want table support

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

// Constants for geofence and intervals
const GEO_RADIUS_KM = 190; // 190 km radius
const FIXED_INTERVAL_MS = 2000; // 2 seconds in milliseconds

// Helper functions
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
  return R * c; // Distance in kilometers
};

const formatDuration = (totalMilliseconds) => {
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours} hour(s) and ${minutes} minute(s)`;
};

const isInsideGeofence = (lat, lon, geofence) => {
  return calculateDistance(geofence.latitude, geofence.longitude, lat, lon) <= geofence.radius;
};

// Component
export const Monthly_Report = () => {
  const [guardDistances, setGuardDistances] = useState({});
  const [guardTimes, setGuardTimes] = useState({});
  const [geofenceCompliance, setGeofenceCompliance] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedGuard, setSelectedGuard] = useState(null);

  const guardIds = ["object1", "object2", "object3", "object4", "object5"];
  const geofence = { latitude: 21.1770559575682, longitude: 79.06081968643292, radius: GEO_RADIUS_KM };

  useEffect(() => {
    const distances = {};
    const times = {};
    const compliance = {};
    let completedListeners = 0;

    const unsubscribeListeners = guardIds.map((guardId) => {
      const dbRef = ref(database, `gpsData/${guardId}`);
      return onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const points = Object.values(data);
          
          let distance = 0;
          let entries = 0;
          let exits = 0;
          let wasInside = false;

          points.forEach((point, index) => {
            if (index > 0) {
              const { latitude: lat1, longitude: lon1 } = points[index - 1];
              const { latitude: lat2, longitude: lon2 } = point;
              distance += calculateDistance(lat1, lon1, lat2, lon2);
              const insideGeofence = isInsideGeofence(lat2, lon2, geofence);

              if (!wasInside && insideGeofence) {
                entries++;
              } else if (wasInside && !insideGeofence) {
                exits++;
              }

              wasInside = insideGeofence;
            }
          });

          distances[guardId] = distance.toFixed(2);
          times[guardId] = (points.length - 1) * FIXED_INTERVAL_MS;
          compliance[guardId] = { entries, exits };
        } else {
          distances[guardId] = 0;
          times[guardId] = 0;
          compliance[guardId] = { entries: 0, exits: 0 };
        }

        completedListeners++;
        if (completedListeners === guardIds.length) {
          setGuardDistances(distances);
          setGuardTimes(times);
          setGeofenceCompliance(compliance);
          setLoading(false);
        }
      }, (error) => {
        console.error("Error fetching data:", error);
      });
    });

    return () => {
      unsubscribeListeners.forEach((unsubscribe) => unsubscribe());
    };
  }, [guardIds]);

  const handleGuardSelection = (guardId) => {
    setSelectedGuard(guardId);
  };

  const downloadPDF = () => {
    if (selectedGuard) {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text(`Distance Report for ${selectedGuard.replace("object", "Guard ")}`, 10, 10);
      doc.setFontSize(12);
      doc.text(`The total distance travelled by ${selectedGuard.replace("object", "Guard ")} is: ${guardDistances[selectedGuard] || 0} km.`, 10, 20);
      doc.text(`Total time spent on duty: ${formatDuration(guardTimes[selectedGuard] || 0)}`, 10, 30);
      doc.text(`Geofence Compliance: Entries: ${geofenceCompliance[selectedGuard]?.entries || 0}, Exits: ${geofenceCompliance[selectedGuard]?.exits || 0}`, 10, 40);
      doc.save(`${selectedGuard}_report.pdf`);
    } else {
      alert("Please select a guard to download the report");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <aside className="w-72 bg-gray-800 p-6 border-r border-gray-700 flex flex-col items-center">
        <div className="w-full bg-gray-700 py-4 px-6 rounded-lg text-center mb-6">
          <h2 className="text-2xl font-bold font-serif text-white">Guards</h2>
        </div>
        <div className="w-full space-y-4">
          {guardIds.map((guardId) => (
            <button
              key={guardId}
              onClick={() => handleGuardSelection(guardId)}
              className={`w-full py-3 px-4 rounded-md transition-colors ${selectedGuard === guardId ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"} text-white font-semibold focus:outline-none`}
            >
              {guardId.replace("object", "Guard ")}
            </button>
          ))}
        </div>
      </aside>
      <main className="flex-grow p-10">
        <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            {selectedGuard ? `Distance Travelled by ${selectedGuard.replace("object", "Guard ")}` : "Select a Guard to View Report"}
          </h2>
          {loading ? (
            <p className="text-lg text-red-400 text-center">Loading distances...</p>
          ) : (
            selectedGuard && (
              <div className="mt-6">
                <p className="text-xl text-center text-blue-400">The total distance travelled by {selectedGuard.replace("object", "Guard ")} is: <strong>{guardDistances[selectedGuard] || 0} km</strong></p>
                <p className="text-xl text-center text-blue-400">Total time spent on duty: <strong>{formatDuration(guardTimes[selectedGuard] || 0)}</strong></p>
                <p className="text-xl text-center text-green-400">Geofence Compliance: Entries: <strong>{geofenceCompliance[selectedGuard]?.entries || 0}</strong>, Exits: <strong>{geofenceCompliance[selectedGuard]?.exits || 0}</strong></p>
                <div className="mt-6 text-center">
                  <button
                    onClick={downloadPDF}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                  >
                    Download PDF Report
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};
