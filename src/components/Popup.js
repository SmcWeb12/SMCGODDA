// Popup.js
import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Sign Up for Free</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <iframe
          src="https://smcgodda-student-signup.netlify.app/"
          width="100%"
          height="500px"
          title="Signup"
          className="mt-4 rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default Popup;
