import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { firebaseConfig } from "./firebaseConfig"; 

// Register the components you need for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const Monthly_Report = () => {
  const [guardData, setGuardData] = useState({
    distance: 0,
    time: "0 hour(s)",
    speed: 0,
    entries: 0,
    exits: 0,
    rating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(database, "locationData");
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Fetched data: ", data);

        const guardData = [];
        Object.keys(data).forEach((key) => {
          console.log(`Data at ${key}: `, data[key]);
          const point = data[key];
          if (point && point.latitude && point.longitude && point.time) {
            guardData.push(point);
          } else {
            console.log(`Invalid data at ${key}:`, point);
          }
        });

        let distance = 0;
        let entries = 0;
        let exits = 0;
        let wasInside = false;
        let totalTime = 0;

        if (guardData.length > 0) {
          const firstPointTime = guardData[0].time;
          const lastPointTime = guardData[guardData.length - 1].time;

          const firstTimeParts = firstPointTime.split(":");
          const lastTimeParts = lastPointTime.split(":");

          const firstTimeInMilliseconds =
            parseInt(firstTimeParts[0]) * 3600000 +
            parseInt(firstTimeParts[1]) * 60000 +
            parseInt(firstTimeParts[2]) * 1000;

          const lastTimeInMilliseconds =
            parseInt(lastTimeParts[0]) * 3600000 +
            parseInt(lastTimeParts[1]) * 60000 +
            parseInt(lastTimeParts[2]) * 1000;

          totalTime = lastTimeInMilliseconds - firstTimeInMilliseconds;

          guardData.forEach((point, index) => {
            if (index > 0) {
              const { latitude: lat1, longitude: lon1 } = guardData[index - 1];
              const { latitude: lat2, longitude: lon2 } = point;
              distance += calculateDistance(lat1, lon1, lat2, lon2);

              const insideGeofence = isInsideGeofence(lat2, lon2);
              if (!wasInside && insideGeofence) {
                entries++;
              } else if (wasInside && !insideGeofence) {
                exits++;
              }
              wasInside = insideGeofence;
            }
          });
        }

        const speed = calculateSpeed(distance, totalTime);
        const rating = calculatePerformanceRating(distance, totalTime, { entries, exits });

        setGuardData({
          distance: distance.toFixed(2),
          time: formatDuration(totalTime),
          speed: speed,
          entries: entries,
          exits: exits,
          rating: rating,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const generateChartData = () => {
    return {
      labels: ['Total Distance', 'Total Time', 'Speed', 'Compliance Entries', 'Compliance Exits', 'Performance Rating'],
      datasets: [
        {
          label: "Guard 1 Data",
          data: [
            guardData.distance || 0,
            guardData.time || "0 hour(s)",
            guardData.speed || 0,
            guardData.entries || 0,
            guardData.exits || 0,
            guardData.rating || 0,
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Guard Report', 20, 20);
    doc.text(`Total Distance: ${guardData.distance || 0} km`, 20, 30);
    doc.text(`Total Time: ${guardData.time || "0 hour(s)"}`, 20, 40);
    doc.text(`Speed: ${guardData.speed || 0} km/h`, 20, 50);
    doc.text(`Entries: ${guardData.entries || 0}`, 20, 60);
    doc.text(`Exits: ${guardData.exits || 0}`, 20, 70);
    doc.text(`Performance Rating: ${guardData.rating || 0}`, 20, 80);
    doc.save('guard-report.pdf');
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateSpeed = (distance, time) => {
    if (time === 0) return 0;
    return (distance / (time / 3600000)).toFixed(2);
  };

  const calculatePerformanceRating = (distance, time, { entries, exits }) => {
    const speed = calculateSpeed(distance, time);
    if (entries === 0 || exits === 0) {
      return "Low Compliance";
    }
    if (speed >= 5 && entries >= 3 && exits >= 3) {
      return "Excellent Performance";
    }
    return "Average Performance";
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)`;
  };

  const isInsideGeofence = (lat, lon) => {
    const geofence = { lat: 21.151, lon: 79.147 }; 
    const distance = calculateDistance(lat, lon, geofence.lat, geofence.lon);
    return distance <= 100; 
  };

  return (
    <div className="flex flex-col items-center p-6 bg-[#333] rounded-lg shadow-2xl w-full max-w-4xl mx-auto">
      {loading ? (
        <div className="text-2xl font-semibold text-orange-500">Loading...</div>
      ) : (
        <>
          <div className="text-3xl font-bold text-white mb-8">Monthly Guard Report</div>
          <div className="flex flex-col gap-4 mb-8 text-white">
            <span className="text-xl">Total Distance: {guardData.distance || 0} km</span>
            <span className="text-xl">Total Time: {guardData.time || "0 hour(s)"}</span>
            <span className="text-xl">Speed: {guardData.speed || 0} km/h</span>
            <span className="text-xl">Entries: {guardData.entries || 0}</span>
            <span className="text-xl">Exits: {guardData.exits || 0}</span>
            <span className="text-xl">Performance Rating: {guardData.rating || 0}</span>
          </div>
          <button
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-all mb-8"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
          <div className="w-full">
            {/* <Bar data={generateChartData()} options={{ responsive: true }} /> */}
            <Bar
              data={generateChartData()}
              options={{
                responsive: true,
                scales: {
                  x: {
                    grid: {
                      borderColor: 'white', 
                      color: 'rgba(255, 255, 255, 0.3)'
                    },
                    ticks: {
                      color: 'white', // White tick marks on the x-axis
                    },
                  },
                  y: {
                    grid: {
                      borderColor: 'white', 
                      color: 'rgba(255, 255, 255, 0.3)'
                    },
                    ticks: {
                      color: 'white', // White tick marks on the y-axis
                    },
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
