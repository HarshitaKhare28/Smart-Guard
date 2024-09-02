// src/components/TrackingPage.js
import { useState } from "react";

const guards = [
  { id: 1, name: 'Jack', position: { lat: 19.0830, lng: 72.8837 } },
  { id: 2, name: 'Tony', position: { lat: 19.0967, lng: 72.8754 } },
  { id: 3, name: 'Mathew', position: { lat: 19.0728, lng: 72.8826 } },
  { id: 4, name: 'Ronny', position: { lat: 19.0861, lng: 72.9106 } },
  { id: 5, name: 'Louis', position: { lat: 19.0640, lng: 72.8995 } },
  { id: 6, name: 'Ram', position: { lat: 19.0600, lng: 72.8908 } },
  { id: 7, name: 'John', position: { lat: 19.0555, lng: 72.8650 } },
  { id: 8, name: 'Samuel', position: { lat: 19.0500, lng: 72.8785 } },
];

export const TrackingPage = () => {
  const [selectedGuard, setSelectedGuard] = useState(null);

  const handleGuardClick = (guard) => {
    setSelectedGuard(guard);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-customGrey text-white p-4">
        {guards.map((guard) => (
          <button
            key={guard.id}
            onClick={() => handleGuardClick(guard)}
            className={`flex items-center mb-2 p-3 rounded ${selectedGuard && selectedGuard.id === guard.id ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-600 w-80 text-left`}
          >
            {/* <span className="mr-3 text-white">👤 */}
            <span className="mr-2" style={{ fontSize: '1.5rem' }}>
            <img
                src="/images/person.png" 
                alt="Person Icon"
                width="24"
                height="24"
              />
            </span> {guard.name}
          </button>
        ))}
        {/* Additional Text and User Info */}
        <div className="mt-4">
          <p className="text-sm mb-2">Help Us Build</p>
          <p className="text-sm mb-4">{"What's"} New</p>

          <div className="flex items-center">
            <div className="mr-2">
            <img
                src="/images/person.png" 
                alt="Person Icon"
                width="24"
                height="24"
              />
            </div>
            <div>
              <p className="text-sm">Sample Owner</p>
              <p className="text-sm">username@example.com</p>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="24"
              height="24"
              className="mr-2"
            >
              <path d="M14 2v10.586l-3.293-3.293-1.414 1.414L14 15.414l5.707-5.707-1.414-1.414L14 12.586V2h-2zm-6 18v-2h12v2H8zm12-4H8v-2h12v2z"/>
            </svg>
            <button className="text-sm text-red-600">Logout</button>
          </div>
        </div>
      </div>
      

      {/* Map Section */}
      <div className="w-3/4">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.7933128712025!2d73.14384077472471!3d19.247837546556426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7942873077383%3A0x9c09fe77e20babe5!2sBirla%20College%20Campus%20Rd%2C%20Gauripada%2C%20Kalyan%2C%20Maharashtra%20421301!5e0!3m2!1sen!2sin!4v1715772514908!5m2!1sen!2sin"
          width="99%"
          height="99%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
