import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => setShowPopup(false);

  const handleSignup = () => {
    window.location.href = 'https://www-student-signup-com.netlify.app/';
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-96">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClose}>
          <AiOutlineClose size={20} />
        </button>

        {/* Content */}
        <div className="text-center">
          <FiAlertCircle className="text-yellow-500 mx-auto mb-4" size={50} />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Limited Time Offer!</h2>
          <p className="text-gray-600 mb-4">Get exclusive access and resources by signing up today. Don’t miss out!</p>

          <p className="text-red-500 font-semibold mb-4">
            Only a few spots left! <span className="text-sm">(Hurry, join before it’s too late!)</span>
          </p>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-600 transition duration-300"
          >
            Sign Up Now
          </button>

          {/* Social Proof */}
          <p className="text-gray-500 mt-4 text-sm">
            Already 100+ students joined!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
