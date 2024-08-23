import React, { useState } from 'react';
import axios from 'axios';
 
const ChangePassword = (params) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

   const apiKey = "https:/backenddata77720.onrender.com";
  

  //console.log(params.user,"desi")
  const handleChangePassword = async () => {
    if (newPassword.length < 5) {
      return setMessage('New Password must be at least 5 characters');
    }
    if (oldPassword.length === 0) {
      return setMessage('Old Password is required');
    }

    try {
      const token = await localStorage.getItem('token');
      if (token) {
        const response = await axios.post(
          `${apiKey}/api/auth/change`,
          {
            newpassword: newPassword,
            password: oldPassword
          },
          {
            headers: { "authtoken": token }
          }
        );

        if (response.data === "Success! Your password has been updated") {
          setTimeout(() => {
            setIsVisible(false);
          }, 1000);
        }

        setMessage(response.data);
      } else {
        setMessage('No authentication token found');
      }
    } catch (error) {
      setMessage('An error occurred while changing the password');
    }
  };

  return (
    <div className="relative">
 <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 my-4">
      <div className="text-xl font-semibold text-gray-800 mb-4">User Details</div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Name:</span>
          <span className="text-gray-800">{params?.user?.name || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{params?.user?.email || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Phone:</span>
          <span className="text-gray-800">{params?.user?.phone || 'N/A'}</span>
        </div>
      </div>
       <button
        onClick={() => setIsVisible(true)}
        className="px-2 py-1 bg-blue-500 text-white mt-2 rounded hover:bg-blue-600"
      >
        Change Password
      </button>
    </div>

      {/* Popup Modal */}
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
            >
              <div className="mb-4">
                <label htmlFor="oldPassword" className="block text-gray-700">Old Password:</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
                  >
                    {showOldPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700">New Password:</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
                  >
                    {showNewPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Change Password
              </button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default ChangePassword;
