import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openBlankPage = () => {
    navigate('/blank');
  };

  const closeBlankPage = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#1e1e1e] text-white">
      <div className="w-[280px] bg-[#2c2c2c] flex flex-col items-center pt-5 border-2 border-[#fefefe]">
        <img
          src="/images/profile.png"
          alt="Profile"
          className="w-[100px] h-[100px] rounded-full mb-5"
        />
        <h3 className="text-xl">Dashboard</h3>
      </div>

      {/* <div className="fixed top-0 left-[250px] right-0 flex justify-end bg-[#2c2c2c] p-2.5 z-50">
        <a href="/" className="text-white no-underline ml-5">HOME</a>
        <a href="/" className="text-white no-underline ml-5">ABOUT US</a>
        <a href="/" className="text-white no-underline ml-5">CONTACT US</a>
      </div> */}

      <div className="flex-grow mt-[60px] mx-[150px] p-5">
        <div className="bg-[#333] p-5 rounded-lg text-center">
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <p className="mt-2">
            Your live location tracker is ready to help you monitor and manage
            locations effortlessly. Lets ensure everything is running smoothly
            and securely.
          </p>
        </div>

        <div className="flex justify-between mt-10">
          <div
            className="w-[30%] bg-[#333] p-[60px] rounded-lg text-center cursor-pointer transition duration-300 hover:bg-[#444]"
            onClick={openBlankPage}
          >
            <h3 className="text-xl font-semibold">LIVE TRACKING</h3>
          </div>
          <div
            className="w-[30%] bg-[#333] p-[60px] rounded-lg text-center cursor-pointer transition duration-300 hover:bg-[#444]"
            onClick={openBlankPage}
          >
            <h3 className="text-xl font-semibold">MONTHLY REPORT</h3>
          </div>
          <div
            className="w-[30%] bg-[#333] p-[60px] rounded-lg text-center cursor-pointer transition duration-300 hover:bg-[#444]"
            onClick={openBlankPage}
          >
            <h3 className="text-xl font-semibold">SOS HISTORY</h3>
          </div>
        </div>
      </div>

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
}

export default Home;
