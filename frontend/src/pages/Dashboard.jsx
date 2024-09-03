import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const openBlankPage = () => {
    navigate('/blank');
  };

  const closeBlankPage = () => {
    setModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img 
          src="/images/profile.png" 
          alt="Profile" 
          className="profile-picture"
        />
        <h3>Dashboard</h3>
      </div>

      <div className="navbar">
        <a href="/">HOME</a>
        <a href="/">ABOUT US</a>
        <a href="/">CONTACT US</a>
      </div>

      <div className="content">
        <div className="dashboard-welcome">
          <h2>Welcome back!</h2>
          <p>
            Your live location tracker is ready to help you monitor and manage 
            locations effortlessly. Lets ensure everything is running smoothly 
            and securely.
          </p>
        </div>
        <div className="cards">
          <div className="card" onClick={openBlankPage}>
            <h3>LIVE TRACKING</h3>
          </div>
          <div className="card" onClick={openBlankPage}>
            <h3>MONTHLY REPORT</h3>
          </div>
          <div className="card" onClick={openBlankPage}>
            <h3>SOS HISTORY</h3>
          </div>
        </div>
      </div>

      {/* Modal for blank page */}
      {isModalOpen && (
        <div className="modal" onClick={closeBlankPage}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeBlankPage}>&times;</span>
            <p>This is the blank page content.</p>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Dashboard;
