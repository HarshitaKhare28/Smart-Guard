import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS,  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import jsPDF from "jspdf";
import "jspdf-autotable";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQlXbGH_qky3mytIgOvKw7spA5fIZwZmM",
  authDomain: "smartguarddemo-50a37.firebaseapp.com",
  databaseURL: "https://smartguarddemo-50a37-default-rtdb.firebaseio.com",
  projectId: "smartguarddemo-50a37",
  storageBucket: "smartguarddemo-50a37.appspot.com",
  messagingSenderId: "647374288721",
  appId: "1:647374288721:web:e6ccbd72bac4beeeb98570",
  measurementId: "G-B34E9BHYJ9",
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const GEO_RADIUS_KM = 190; 
const FIXED_INTERVAL_MS = 2000; 

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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

const calculateSpeed = (distance, time) => {
  if (time > 0) {
    return (distance / (time / (100 * 60 * 60))).toFixed(2);
  }
  return 0;
};

// New Function to Calculate Guard's Performance Rating
const calculatePerformanceRating = (guardId, distance, time, compliance) => {
  let score = 0;

  // Distance traveled evaluation (up to 40 points)
  if (distance >= 5) {
    score += 40; 
  } else {
    score += (distance / 5) * 40;
  }

  // Punctuality/Time on Duty (up to 30 points)
  const totalHours = time / (1000 * 60 * 60);
  if (totalHours >= 8) {
    score += 30; 
  } else {
    score += (totalHours / 8) * 30;
  }

  // Compliance with Geofence (up to 30 points)
  const { entries, exits } = compliance;
  if (entries === 0 && exits === 0) {
    score += 30; 
  } else if (entries === exits) {
    score += 20; 
  } else {
    score += 10; 
  }

  return score.toFixed(2);
};

export const Monthly_Report = () => {
  const [guardDistances, setGuardDistances] = useState({});
  const [guardTimes, setGuardTimes] = useState({});
  const [guardSpeeds, setGuardSpeeds] = useState({});
  const [geofenceCompliance, setGeofenceCompliance] = useState({});
  const [guardRatings, setGuardRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedGuard, setSelectedGuard] = useState(null);

  const guardIds = ["object1", "object2", "object3", "object4", "object5"];
  const geofence = { latitude: 21.1770559575682, longitude: 79.06081968643292, radius: GEO_RADIUS_KM };

  useEffect(() => {
    const distances = {};
    const times = {};
    const speeds = {};
    const compliance = {};
    const ratings = {};
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

          speeds[guardId] = calculateSpeed(distance, times[guardId]);

          // Calculate Performance Rating for the Guard
          ratings[guardId] = calculatePerformanceRating(guardId, distances[guardId], times[guardId], compliance[guardId]);
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
      doc.text(`Speed: ${guardSpeeds[selectedGuard] || 0} km/h`, 10, 40);
      doc.text(`Geofence Compliance: Entries: ${geofenceCompliance[selectedGuard]?.entries || 0}, Exits: ${geofenceCompliance[selectedGuard]?.exits || 0}`, 10, 50);
      doc.text(`Performance Rating: ${guardRatings[selectedGuard] || 0}/100`, 10, 60);
      doc.save(`${selectedGuard}_report.pdf`);
    } else {
      alert("Please select a guard to download the report");
    }
  };
  const chartData = {
    labels: guardIds.map(id => id.replace("object", "Guard ")),
    datasets: [
      {
        label: "Distance Traveled (km)",
        data: guardIds.map(id => guardDistances[id] || 0),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
      {
        label: "Time on Duty (hours)",
        data: guardIds.map(id => ((guardTimes[id] || 0) / (1000 * 60 * 60)).toFixed(2)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
      {
        label: "Speed (km/h)",
        data: guardIds.map(id => guardSpeeds[id] || 0),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="min-h-screen flex bg-[#18191B] text-white">
      <aside className="w-72 bg-[#333] p-6 border-r border-[#444] flex flex-col items-center">
        <div className="w-full bg-[#444] py-4 px-6 rounded-lg text-center mb-6">
          <h2 className="text-2xl font-bold font-serif">Guards</h2>
        </div>
        <div className="w-full space-y-4">
          {guardIds.map((guardId) => (
            <button
              key={guardId}
              onClick={() => handleGuardSelection(guardId)}
              className={`w-full py-3 px-4 rounded-md transition-all ${selectedGuard === guardId ? "bg-blue-600 hover:bg-blue-700" : "bg-[#444] hover:bg-[#555]"} font-semibold focus:outline-none`}
            >
              {guardId.replace("object", "Guard ")}
            </button>
          ))}
        </div>
      </aside>
      <main className="flex-grow p-10">
        <div className="bg-[#333] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            {selectedGuard ? `Distance Travelled by ${selectedGuard.replace("object", "Guard ")}` : "Select a Guard to View Report"}
          </h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : selectedGuard ? (
            <div>
              <p>Total Distance: {guardDistances[selectedGuard] || 0} km</p>
              <p>Total Time: {formatDuration(guardTimes[selectedGuard] || 0)}</p>
              <p>Speed: {guardSpeeds[selectedGuard] || 0} km/h</p>
              <p>Geofence Compliance: Entries: {geofenceCompliance[selectedGuard]?.entries || 0}, Exits: {geofenceCompliance[selectedGuard]?.exits || 0}</p>
              <p>Performance Rating: {guardRatings[selectedGuard]}/100</p>
              <div className="mt-8 bg-[#333] p-8 rounded-lg shadow-lg" style={{ height: "400px", width: "600px" }}>
                <h2 className="text-2xl font-bold text-center mb-4">Guard Data Visualizations</h2>
                <Bar data={chartData} />
              </div>
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
        
        {/* <div className="mt-8 text-center">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg text-white font-semibold transition-all"
          >
            Download PDF Report
          </button>
        </div> */}
      </main>
    </div>
  );
};
