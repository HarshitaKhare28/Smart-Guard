import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaExclamationCircle, FaCog } from 'react-icons/fa';

export const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
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

  const closeBlankPage = () => {
    setModalOpen(false);
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
          <h3 className="text-2xl font-bold mb-1 font-serif">Maenous Troat</h3>
        </div>
        <div className="flex justify-center items-center mb-2">
     <img src="./images/heroicons-solid_status-online.png" alt="Online Status" className="w-6 h-6 mr-2" />
     <p className="text-green-400 text-lg">Online</p>
   </div>
      <div className="w-full mt-8">
        <div className="flex items-center px-5 py-4 hover:bg-[#3a3a3a] cursor-pointer border-b border-gray-600">
          <FaFileAlt className="mr-3 text-xl" />
          <span className="text-lg">Updates</span>
        </div>
        <div className="flex items-center px-5 py-4 hover:bg-[#3a3a3a] cursor-pointer border-b border-gray-600">
          <FaExclamationCircle className="mr-3 text-xl" />
          <span className="text-lg">Emergency</span>
        </div>
        <div className="flex items-center px-5 py-4 hover:bg-[#3a3a3a] cursor-pointer">
          <FaCog className="mr-3 text-xl" />
          <span className="text-lg">Settings</span>
       </div>
      </div>
      <div className="mt-auto w-full px-5">
           <div className="text-sm text-gray-400 mb-2">About Us</div>
           <div className="text-sm text-gray-400 mb-2">{"What's"} New</div>
           <div className="text-sm text-gray-400 mb-4">Olivia Rhye</div>
          <div className="text-sm text-gray-400 mb-4">olivia@untitledui.com</div>
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

      {/* Modal for blank page */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          onClick={closeBlankPage}
        >
          <div
            className="bg-white p-5 border border-gray-400 w-[80%] max-w-[600px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 text-2xl font-bold cursor-pointer hover:text-black"
              onClick={closeBlankPage}
            >
              &times;
            </button>
            <p>This is the blank page content.</p>
          </div>
        </div>
      )}
    </div>
  );
};
