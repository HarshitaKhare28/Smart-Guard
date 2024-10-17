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

// Helper function to calculate distance between two coordinates
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

// Helper function to format the total time spent in hours and minutes
const formatDuration = (totalMilliseconds) => {
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours} hour(s) and ${minutes} minute(s)`;
};

export const Monthly_Report = () => {
  const [guardDistances, setGuardDistances] = useState({});
  const [guardTimes, setGuardTimes] = useState({}); // State to track total time spent
  const [loading, setLoading] = useState(true);
  const [selectedGuard, setSelectedGuard] = useState(null); // State to track selected guard

  const guardIds = ["object1", "object2", "object3", "object4", "object5"]; // List of guards
  const fixedInterval = 2 * 1000; // 2 seconds in milliseconds (fixed interval between location updates)

  useEffect(() => {
    const distances = {};
    const times = {};
    let completedListeners = 0;

    // Set up listeners for each guard
    const unsubscribeListeners = guardIds.map((guardId) => {
      const dbRef = ref(database, `gpsData/${guardId}`);
      return onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('Fetched Data for', guardId, ':', data); // Log the fetched data
          const points = Object.values(data);

          let distance = 0;

          // Loop through the points and calculate distances between them
          for (let i = 0; i < points.length - 1; i++) {
            const { latitude: lat1, longitude: lon1 } = points[i];
            const { latitude: lat2, longitude: lon2 } = points[i + 1];

            // Calculate distance between consecutive points
            distance += calculateDistance(lat1, lon1, lat2, lon2);
          }

          distances[guardId] = distance.toFixed(2);
          console.log(`Calculated distance for ${guardId}:`, distances[guardId]);

          // Calculate total time spent based on the number of points (interval of 2 seconds)
          const totalTime = (points.length - 1) * fixedInterval; // (points - 1) intervals of 2 seconds each
          times[guardId] = totalTime; // Store total time in milliseconds
          console.log(`Total time for ${guardId}:`, times[guardId], 'milliseconds');

        } else {
          distances[guardId] = 0;
          times[guardId] = 0;
        }

        completedListeners++;
        if (completedListeners === guardIds.length) {
          setGuardDistances(distances);
          setGuardTimes(times); // Set guard times to state
          setLoading(false);
        }
      });
    });

    // Cleanup listeners when component unmounts
    return () => {
      unsubscribeListeners.forEach((unsubscribe) => unsubscribe());
    };
  }, [guardIds]);

  const handleGuardSelection = (guardId) => {
    setSelectedGuard(guardId); // Set the selected guard when clicked
  };

  // Function to generate and download the PDF report for the selected guard
  const downloadPDF = () => {
    if (selectedGuard) {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text(
        `Distance Report for ${selectedGuard.replace("object", "Guard ")}`,
        10,
        10
      );
      doc.setFontSize(12);
      doc.text(
        `The total distance travelled by ${selectedGuard.replace("object", "Guard ")} is: ${
          guardDistances[selectedGuard] || 0
        } km.`,
        10,
        20
      );

      const totalTime = guardTimes[selectedGuard] || 0;
      doc.text(
        `Total time spent on duty: ${formatDuration(totalTime)}`,
        10,
        30
      );

      doc.save(`${selectedGuard}_report.pdf`);
    } else {
      alert("Please select a guard to download the report");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 p-6 border-r border-gray-700 flex flex-col items-center">
        <div className="w-full bg-gray-700 py-4 px-6 rounded-lg text-center mb-6">
          <h2 className="text-2xl font-bold font-serif text-white">Guards</h2>
        </div>

        {/* List of Guard Buttons */}
        <div className="w-full space-y-4">
          {guardIds.map((guardId) => (
            <button
              key={guardId}
              onClick={() => handleGuardSelection(guardId)}
              className={`w-full py-3 px-4 rounded-md transition-colors ${
                selectedGuard === guardId
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-700 hover:bg-gray-600"
              } text-white font-semibold focus:outline-none`}
            >
              {guardId.replace("object", "Guard ")} {/* Example: Guard 1 */}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10">
        <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            {selectedGuard
              ? `Distance Travelled by ${selectedGuard.replace("object", "Guard ")}`
              : "Select a Guard to View Report"}
          </h2>
          {loading ? (
            <p className="text-lg text-red-400 text-center">Loading distances...</p>
          ) : (
            selectedGuard && (
              <div className="mt-6">
                <p className="text-xl text-center text-blue-400">
                  The total distance travelled by{" "}
                  {selectedGuard.replace("object", "Guard ")} is:{" "}
                  <strong>{guardDistances[selectedGuard] || 0} km</strong>
                </p>
                <p className="text-xl text-center text-blue-400">
                  Total time spent on duty:{" "}
                  <strong>{formatDuration(guardTimes[selectedGuard] || 0)}</strong>
                </p>

                {/* Button to download PDF */}
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
