import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// Firebase configuration
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const GEO_RADIUS_KM = 190; // Geofence radius in km
const FIXED_INTERVAL_MS = 2000; // Interval in milliseconds

// Calculate distance between two coordinates (Haversine formula)

const calculateDistance = (userLat, userLon, dbLat, dbLon) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((dbLat - userLat) * Math.PI) / 180;
  const dLon = ((dbLon - userLon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((dbLat * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Returns the distance in kilometers
};

// Geofence data
const geofenceData = {
  latitude: 19.0760, // Geofence latitude
  longitude: 72.8777, // Geofence longitude
  radius: 1000, // Geofence radius in meters
};

// Check if the guard is inside the geofence
const isInsideGeofence = (lat, lon, geofence) => {
  const distance = calculateDistance(lat, lon, geofence.latitude, geofence.longitude);
  return distance <= geofence.radius / 1000; // Convert meters to kilometers
};

// Format duration in hours and minutes
const formatDuration = (totalMilliseconds) => {
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours} hour(s) and ${minutes} minute(s)`;
};

// Calculate speed in km/h
const calculateSpeed = (distance, time) => {
  if (time > 0) {
    const timeInHours = time / 1000 / 3600;
    return (distance / timeInHours).toFixed(2); // Speed in km/h
  }
  return 0;
};

// Calculate the guard's performance rating
const calculatePerformanceRating = (guardId, distance, time, compliance, geofence) => {
  let score = 0;

  // Distance traveled evaluation (up to 40 points)
  if (distance >= 5) {
    score += 40;
  } else {
    score += (distance / 5) * 40;
  }

  // Punctuality/Time on Duty (up to 30 points)
  const totalHours = time / (1000 * 60 * 60); // Convert time from milliseconds to hours
  if (totalHours >= 8) {
    score += 30;
  } else {
    score += (totalHours / 8) * 30;
  }

  // Compliance with Geofence (up to 30 points)
  const { entries, exits } = compliance;
  if (entries === 0 && exits === 0) {
    score += 30; // Fully compliant, no entry/exit violations
  } else if (entries === exits) {
    score += 20; // Some compliance violations
  } else {
    score += 10; // Significant non-compliance (too many entries/exits)
  }

  return score.toFixed(2); // Return the final score rounded to two decimal places
};

export const Monthly_Report = () => {
  const [guardDistances, setGuardDistances] = useState({});
  const [guardTimes, setGuardTimes] = useState({});
  const [guardSpeeds, setGuardSpeeds] = useState({});
  const [geofenceCompliance, setGeofenceCompliance] = useState({});
  const [guardRatings, setGuardRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedGuard, setSelectedGuard] = useState(null);

  // List of guard IDs from the database
  const guardIds = ["241047", "256612", "272380", "288052", "303816", "319382", "335051"];
  const geofence = { latitude: 21.1770559575682, longitude: 79.06081968643292, radius: GEO_RADIUS_KM };
  const distances = {};
    const times = {};
    const speeds = {};
    const compliance = {};
    const ratings = {};
    let completedListeners = 0;
  useEffect(() => {
    
    const unsubscribeListeners = guardIds.map((guardId) => {
      const dbRef = ref(database, `locationData/${guardId}`);
      return onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          
          const points = [
            { date: "29/11/2024", latitude: 21.15097, longitude: 79.14779, speed: 0.79636, time: "7:12:42" },
            { date: "29/11/2024", latitude: 21.15097, longitude: 79.14771, speed: 0.5556, time: "7:13:03" },
            { date: "29/11/2024", latitude: 21.15092, longitude: 79.14768, speed: 3.4262, time: "7:13:24" },
            { date: "29/11/2024", latitude: 21.15107, longitude: 79.14774, speed: 5.31524, time: "7:14:27" },
            { date: "29/11/2024", latitude: 21.15113, longitude: 79.14771, speed: 1.96312, time: "7:14:48" },
            { date: "29/11/2024", latitude: 21.15115, longitude: 79.14771, speed: 0.5556, time: "7:15:00" },
            { date: "29/11/2024", latitude: 21.1511, longitude: 79.1477, speed: 2.48168, time: "7:15:09" }
          ];
          
          let distance = 0;
          let entries = 0;
          let exits = 0;
          let wasInside = false; 
          
          // Define geofence boundary (example coordinates)
          const geofence = [
            [21.1509, 79.1477], // Point 1
            [21.1510, 79.1478]  // Point 2
          ];
          
          points.forEach((point, index) => {
            //console.log("Point:", point, "Index:", index);
            if (index > 0 ) {
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
          console.log(distance);
          distances[guardId] = distance.toFixed(2);
          times[guardId] = (points.length - 1) * FIXED_INTERVAL_MS;
          compliance[guardId] = { entries, exits };
          speeds[guardId] = calculateSpeed(distance, times[guardId]);

          // Calculate Performance Rating for the Guard
          ratings[guardId] = calculatePerformanceRating(guardId, distances[guardId], times[guardId], compliance[guardId], geofence);
        } else {
          distances[guardId] = 0;
          times[guardId] = 0;
          speeds[guardId] = 0;
          compliance[guardId] = { entries: 0, exits: 0 };
          ratings[guardId] = 0;
        }

        completedListeners++;
        if (completedListeners === guardIds.length) {
          setGuardDistances(distances);
          setGuardTimes(times);
          setGuardSpeeds(speeds);
          setGeofenceCompliance(compliance);
          setGuardRatings(ratings);
          setLoading(false);
        }
        // console.log(guardDistances);
      }, (error) => {
        console.error("Error fetching data:", error);
      });
    });
    
    return () => {
      unsubscribeListeners.forEach((unsubscribe) => unsubscribe());
    };
  }, [guardIds]);

  const generateChartData = (guardId) => {
    return {
      labels: ['Total Distance', 'Total Time', 'Speed', 'Compliance Entries', 'Compliance Exits', 'Performance Rating'],
      datasets: [
        {
          label: `Guard ${guardId} Data`,
          data: [
            guardDistances[guardId] || 0,
            formatDuration(guardTimes[guardId] || 0), 
            guardSpeeds[guardId] || 0,
            geofenceCompliance[guardId]?.entries || 0,
            geofenceCompliance[guardId]?.exits || 0,
            guardRatings[guardId] || 0,
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };
  
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Guard Report', 20, 20);
    doc.text(`Guard ID: ${selectedGuard}`, 20, 30);
    doc.text(`Total Distance: ${guardDistances[selectedGuard] || 0} km`, 20, 40);
    doc.text(`Total Time: ${formatDuration(guardTimes[selectedGuard] || 0)}`, 20, 50);
    doc.text(`Speed: ${guardSpeeds[selectedGuard] || 0} km/h`, 20, 60);
    doc.text(`Geofence Compliance: Entries - ${geofenceCompliance[selectedGuard]?.entries || 0}, Exits - ${geofenceCompliance[selectedGuard]?.exits || 0}`, 20, 70);
    doc.text(`Performance Rating: ${guardRatings[selectedGuard] || 0}/100`, 20, 80);
    doc.save(`Guard_${selectedGuard}_Report.pdf`);
  };
  
  return (
    
    <div className="min-h-screen flex bg-[#18191B] text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-[#333] p-6 border-r border-[#444] flex flex-col items-center">
        <div className="w-full bg-[#444] py-4 px-6 rounded-lg text-center mb-6">
          <h2 className="text-2xl font-bold font-serif">Guards</h2>
        </div>
        <div className="w-full space-y-4">
          {Object.keys(guardDistances).map((guardId) => (
            <button
            key={guardId}
            onClick={() => setSelectedGuard(guardId)}
            className={`w-full py-3 px-4 rounded-md transition-all ${
              selectedGuard === guardId
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-[#444] hover:bg-[#555]"
            } font-semibold focus:outline-none`}
          >
            Guard {guardId}  
          </button>
          ))}
        </div>
      </aside>
  
      {/* Main Content */}
      <main className="flex-grow p-10">
        <div className="bg-[#333] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            {selectedGuard ? `Distance Travelled by Guard ${selectedGuard}` : "Select a Guard to View Report"}
          </h2>
          
          {/* Loading State */}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : selectedGuard ? (
            <div>
              {/* Guard Details */}
              
              <p>Total Distance: {guardDistances[selectedGuard] || 0} km</p>
              <p>Total Time: {formatDuration(guardTimes[selectedGuard] || 0)}</p>
              <p>Speed: {guardSpeeds[selectedGuard] || 0} km/h</p>
              <p>
                Geofence Compliance: Entries:{" "}
                {geofenceCompliance[selectedGuard]?.entries || 0}, Exits:{" "}
                {geofenceCompliance[selectedGuard]?.exits || 0}
              </p>
              <p>Performance Rating: {guardRatings[selectedGuard] || 0}/100</p>
  
              {/* Visualization Section */}
              <div className="mt-8 bg-[#333] p-8 rounded-lg shadow-lg" style={{ height: "400px", width: "600px" }}>
                <h2 className="text-2xl font-bold text-center mb-4">Guard Data Visualizations</h2>
                <Bar data={generateChartData(selectedGuard)} />
              </div>
  
              {/* Download PDF Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={downloadPDF}
                  className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg text-white font-semibold transition-all"
                >
                  Download PDF Report
                </button>
              </div>
            </div>
          ) : (
            <p>Please select a guard to see the details</p>
          )}
        </div>
      </main>
    </div>
  );
};