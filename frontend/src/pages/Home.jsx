import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaExclamationCircle, FaSignOutAlt } from 'react-icons/fa'; // Import FaSignOutAlt for logout icon

export const Home = () => {
  const [isEmergencyOpen, setEmergencyOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const navigate = useNavigate();

  // Functions to navigate to different pages
  const openTrackingPage = () => {
    navigate('/home/tracking'); // Live tracking page
  };

  const openMonthlyReportPage = () => {
    navigate('/home/monthly-report'); // Monthly report page
  };

  const openSOSHistoryPage = () => {
    navigate('/home/sos-history'); // SOS history page
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to login page
  };

  const openEmergencyModal = () => {
    setEmergencyOpen(true);
  };

  const closeEmergencyModal = () => {
    setEmergencyOpen(false);
  };

  const openUpdateModal = () => {
    setUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#1A1B1C] text-white">
      <aside className="w-[290px] bg-[#2c2c2c] flex flex-col items-center py-6 border-r border-gray-700">
        <div className="w-[250px] bg-[#3C4350] p-6 rounded-lg shadow-lg text-center">
          <img
            src="/images/profile.png"
            alt="Profile"
            className="w-[110px] h-[110px] rounded-full mb-3 shadow-lg mx-auto"
          />
          <h3 className="text-2xl font-bold mb-1 font-serif">Marnous Troat</h3>
        </div>
        <div className="flex justify-center items-center mb-2">
          <img src="./images/heroicons-solid_status-online.png" alt="Online Status" className="w-6 h-6 mr-2" />
          <p className="text-green-400 text-lg">Online</p>
        </div>
        <div className="w-full mt-8">
          <div className="flex items-center px-5 py-4 hover:bg-[#3a3a3a] cursor-pointer border-b border-gray-600" onClick={openUpdateModal}>
            <FaFileAlt className="mr-3 text-xl" />
            <span className="text-lg">Updates</span>
          </div>
          <div className="flex items-center px-5 py-4 hover:bg-[#3a3a3a] cursor-pointer " onClick={openEmergencyModal}>
            <FaExclamationCircle className="mr-3 text-xl" />
            <span className="text-lg">Emergency</span>
          </div>
          {/* Logout button */}
          <div className="flex items-center px-5 py-4 hover:bg-[#3a3a3a] cursor-pointer mt-1 border-t border-gray-600" onClick={handleLogout}>
            <FaSignOutAlt className="mr-3 text-xl" />
            <span className="text-lg">Logout</span>
          </div>
        </div>
      </aside>

      <main className="flex-grow p-10">
        {/* Welcome message */}
        <div className="bg-[#18191B] border border-white p-6 rounded-lg mt-6 flex items-center">
          <img src="/images/Vector.png" alt="Welcome Icon" className="w-10 h-10 mr-3" />
          <div>
            <h2 className="text-3xl font-bold">Welcome back!</h2>
            <p className="mt-2 text-lg">
              Your live location tracker is ready to help you monitor and manage
              locations effortlessly. {"Let's"} ensure everything is running smoothly
              and securely.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div
            className="bg-[#333] p-6 rounded-lg text-center cursor-pointer hover:bg-[#444] transition duration-300"
            onClick={openTrackingPage}
          >
            <img src="/images/Frame 2051.png" alt="Live Tracking" className="w-20 h-20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">LIVE TRACKING</h3>
          </div>
          <div
            className="bg-[#333] p-6 rounded-lg text-center cursor-pointer hover:bg-[#444] transition duration-300"
            onClick={openMonthlyReportPage}
          >
            <img src="/images/Frame 2050.png" alt="Monthly Report" className="w-20 h-20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">MONTHLY REPORT</h3>
          </div>
          <div
            className="bg-[#333] p-6 rounded-lg text-center cursor-pointer hover:bg-[#444] transition duration-300"
            onClick={openSOSHistoryPage}
          >
            <img src="/images/Frame 2052.png" alt="SOS History" className="w-20 h-20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">SOS HISTORY</h3>
          </div>
        </div>
      </main>

      {/* Emergency Modal */}
      {isEmergencyOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          onClick={closeEmergencyModal}
        >
          <div
            className="bg-[#2c2c2c] p-6 border border-[#444] w-[80%] max-w-[600px] rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 text-2xl font-bold cursor-pointer hover:text-white"
              onClick={closeEmergencyModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-red-600 mb-4">Emergency Notification</h3>
            <p>
              ⚠️ **Urgent Alert** ⚠️  
              A critical event has occurred in your area. Please stay alert and follow safety protocols. 
              You are advised to stay inside and keep your phone charged for emergencies. 
              Further updates will follow as soon as possible.
            </p>
            <button
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              onClick={closeEmergencyModal}
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

      {/* Updates Modal */}
      {isUpdateOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          onClick={closeUpdateModal}
        >
          <div
            className="bg-[#2c2c2c] p-6 border border-[#444] w-[80%] max-w-[600px] rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 text-2xl font-bold cursor-pointer hover:text-white"
              onClick={closeUpdateModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Recent Updates</h3>
            <ul className="list-disc pl-5 text-white">
              <li>🚀 **New Feature**: Real-time live tracking added to your dashboard!</li>
              <li>🐞 **Bug Fixes**: Resolved performance issues with the map interface.</li>
              <li>⚙️ **Scheduled Maintenance**: Maintenance planned for December 5th, 2024 from 2:00 AM to 4:00 AM (UTC).</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
